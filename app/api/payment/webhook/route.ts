// app/api/payment/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("X-Signature") || "";

    const expectedSignature = crypto
      .createHmac("sha256", process.env.WALLETPLUG_CLIENT_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { status, data } = payload;

    console.log("Webhook received:", { status, refTrx: data?.ref_trx });

    if (status === "completed") {
      console.log(`✅ Payment completed for order: ${data.ref_trx}`);

      // --- 发送 Postback 回传 ---
      // 从 ref_trx 中提取 click_id
      const refTrx = data.ref_trx || "";
      let clickId = "";
      if (refTrx.startsWith("VOX-")) {
        const parts = refTrx.split("-");
        // 格式: VOX-{clickId}-{timestamp}-{random} 或 VOX-{timestamp}-{random}
        if (parts.length >= 3) {
          const secondPart = parts[1];
          // 如果第二部分不是纯数字，则认为是 clickId
          if (!/^\d+$/.test(secondPart)) {
            clickId = secondPart;
          }
        }
      }

      // 构建 Postback URL
      const postbackUrl = `http://newmobi.fuse-cloud.com/pb?tid=${clickId || "unknown"}&s1=${data.amount || 0}`;
      console.log(`📤 Sending postback: ${postbackUrl}`);

      // 发送回传（不阻塞响应，异步执行）
      fetch(postbackUrl, { method: 'GET' })
        .then(res => console.log(`✅ Postback sent (status: ${res.status}) for click_id: ${clickId}`))
        .catch(err => console.error(`❌ Postback failed: ${err}`));

      // TODO: 更新数据库、发送确认邮件、开通课程权限等
    } else if (status === "failed") {
      console.log(`❌ Payment failed for order: ${data.ref_trx}`);
    } else if (status === "cancelled") {
      console.log(`⏹️ Payment cancelled for order: ${data.ref_trx}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Processing error" }, { status: 200 });
  }
}
