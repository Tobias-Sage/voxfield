import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // 1. 获取签名头
    const signatureHeader = request.headers.get("x-signature") || "";
    if (!signatureHeader) {
      console.error("Missing x-signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // 2. 去掉 "sha256=" 前缀
    let hmac = signatureHeader;
    if (signatureHeader.startsWith("sha256=")) {
      hmac = signatureHeader.substring(7);
    }

    // 3. 验证签名
    const expectedHmac = crypto
      .createHmac("sha256", process.env.WALLETPLUG_CLIENT_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (hmac.toLowerCase() !== expectedHmac.toLowerCase()) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    console.log("✅ Webhook verified");

    const payload = JSON.parse(rawBody);
    const { status, data } = payload;

    // 仅处理一次性支付完成事件
    if (status === "completed") {
      console.log(`✅ Payment completed: ${data.ref_trx}`);

      // --- 发送 Postback 回传（如果不需要，可以注释掉下面这段） ---
      const refTrx = data.ref_trx || "";
      let clickId = "";
      if (refTrx.startsWith("VOX-")) {
        const parts = refTrx.split("-");
        if (parts.length >= 3) {
          const secondPart = parts[1];
          if (!/^\d+$/.test(secondPart)) {
            clickId = secondPart;
          }
        }
      }

      const postbackUrl = `http://newmobi.fuse-cloud.com/pb?tid=${clickId || "unknown"}&s1=${data.amount || 0}`;
      console.log(`📤 Sending postback: ${postbackUrl}`);

      // 异步发送，不阻塞响应
      fetch(postbackUrl, { method: "GET" })
        .then(async (res) => {
          const text = await res.text();
          console.log(`✅ Postback response status: ${res.status}`);
          if (text) console.log(`📦 Postback response body: ${text}`);
        })
        .catch((err) => console.error(`❌ Postback fetch error: ${err}`));

      // TODO: 更新数据库、发送确认邮件、开通权限等
    } else if (status === "failed") {
      console.log(`❌ Payment failed: ${data.ref_trx}`);
    } else if (status === "cancelled") {
      console.log(`⏹️ Payment cancelled: ${data.ref_trx}`);
    } else {
      // 其他事件（如订阅相关）只记录日志，不做任何处理
      console.log(`ℹ️ Webhook received other event: ${status || payload.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Processing error" }, { status: 200 });
  }
}
