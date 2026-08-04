// app/api/payment/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    // 1. 获取原始请求体（必须用 text，不能用 json）
    const rawBody = await request.text();
    const signature = request.headers.get("X-Signature") || "";

    // 2. 验证签名
    const expectedSignature = crypto
      .createHmac("sha256", process.env.WALLETPLUG_CLIENT_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 3. 解析数据
    const payload = JSON.parse(rawBody);
    const { status, data } = payload;

    console.log("Webhook received:", { status, refTrx: data?.ref_trx });

    // 4. 根据状态处理订单
    if (status === "completed") {
      // ✅ 支付成功 → 这里写你开通权限的逻辑
      console.log(`✅ Payment completed for order: ${data.ref_trx}`);
      // TODO: 更新数据库、发送确认邮件、开通课程权限等
    } else if (status === "failed") {
      console.log(`❌ Payment failed for order: ${data.ref_trx}`);
    } else if (status === "cancelled") {
      console.log(`⏹️ Payment cancelled for order: ${data.ref_trx}`);
    }

    // 5. 必须返回 200，否则 WalletPlug 会重试
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Processing error" }, { status: 200 });
  }
}
