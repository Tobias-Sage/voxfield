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
    const { type, status, data } = payload;

    // ----- 判断是否需要发送 postback -----
    let shouldSendPostback = false;
    let refTrx = "";
    let amount = 0;

    // 场景1：一次性支付完成（年度套餐）
    if (status === "completed" && data?.ref_trx) {
      shouldSendPostback = true;
      refTrx = data.ref_trx;
      amount = data.amount || 0;
      console.log(`✅ One-time payment completed: ${refTrx}`);
    }

    // 场景2：订阅首次激活（月度套餐首次订阅成功）
    if (type === "subscription.activated" && data?.subscription?.ref_trx) {
      shouldSendPostback = true;
      refTrx = data.subscription.ref_trx;
      amount = data.subscription.amount || 0;
      console.log(`✅ Subscription activated (first payment): ${refTrx}`);
    }

    // 如果是续费成功（invoice.paid），不发送 postback，只记录日志
    if (type === "invoice.paid" && data?.invoice) {
      console.log(`ℹ️ Subscription renewal (no postback): ${data.invoice.id}`);
    }

    // ----- 发送 postback -----
    if (shouldSendPostback && refTrx) {
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

      const postbackUrl = `http://newmobi.fuse-cloud.com/pb?tid=${clickId || "unknown"}&s1=${amount}`;
      console.log(`📤 Sending postback: ${postbackUrl}`);

      // 异步发送，不阻塞响应
      fetch(postbackUrl, { method: "GET" })
        .then(async (res) => {
          const text = await res.text();
          console.log(`✅ Postback response status: ${res.status}`);
          if (text) console.log(`📦 Postback response body: ${text}`);
        })
        .catch((err) => console.error(`❌ Postback fetch error: ${err}`));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Processing error" }, { status: 200 });
  }
}
