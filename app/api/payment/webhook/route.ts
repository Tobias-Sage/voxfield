import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // 1. 获取签名头（正确格式为 X-WalletPlug-Signature）
    const signatureHeader = request.headers.get("X-WalletPlug-Signature") || "";
    if (!signatureHeader) {
      console.error("Missing X-WalletPlug-Signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // 2. 解析 t={timestamp},v1={hmac}
    const parts = signatureHeader.split(",");
    let timestamp = "";
    let hmac = "";
    for (const part of parts) {
      const [key, value] = part.split("=");
      if (key === "t") timestamp = value;
      else if (key === "v1") hmac = value;
    }
    if (!timestamp || !hmac) {
      console.error("Invalid signature header format");
      return NextResponse.json({ error: "Invalid signature format" }, { status: 401 });
    }

    // 3. 计算期望的签名（对 timestamp + "." + rawBody 进行 HMAC-SHA256）
    const expectedHmac = crypto
      .createHmac("sha256", process.env.WALLETPLUG_CLIENT_SECRET!)
      .update(`${timestamp}.${rawBody}`)
      .digest("hex");

    // 4. 比较签名
    if (hmac !== expectedHmac) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 5. （可选）检查时间戳，防止重放攻击（5分钟窗口）
    const now = Math.floor(Date.now() / 1000);
    const ts = parseInt(timestamp, 10);
    if (Math.abs(now - ts) > 300) {
      console.error("Webhook timestamp too old or in future");
      return NextResponse.json({ error: "Stale timestamp" }, { status: 401 });
    }

    // 6. 解析 payload
    const payload = JSON.parse(rawBody);
    const { status, data } = payload;

    console.log("Webhook received:", { status, refTrx: data?.ref_trx });

    if (status === "completed") {
      console.log(`✅ Payment completed for order: ${data.ref_trx}`);

      // --- 发送 Postback 回传 ---
      const refTrx = data.ref_trx || "";
      let clickId = "";
      if (refTrx.startsWith("VOX-")) {
        const parts = refTrx.split("-");
        if (parts.length >= 3) {
          const secondPart = parts[1];
          // 如果第二部分不是纯数字，则认为是 clickId
          if (!/^\d+$/.test(secondPart)) {
            clickId = secondPart;
          }
        }
      }

      const postbackUrl = `http://newmobi.fuse-cloud.com/pb?tid=${clickId || "unknown"}&s1=${data.amount || 0}`;
      console.log(`📤 Sending postback: ${postbackUrl}`);

      // 异步发送回传，不阻塞响应
      fetch(postbackUrl, { method: "GET" })
        .then((res) =>
          console.log(`✅ Postback sent (status: ${res.status}) for click_id: ${clickId}`)
        )
        .catch((err) => console.error(`❌ Postback failed: ${err}`));

      // TODO: 更新数据库、发送确认邮件、开通课程权限等
    } else if (status === "failed") {
      console.log(`❌ Payment failed for order: ${data.ref_trx}`);
    } else if (status === "cancelled") {
      console.log(`⏹️ Payment cancelled for order: ${data.ref_trx}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // 即使出错也返回 200，避免 WalletPlug 无限重试
    return NextResponse.json({ error: "Processing error" }, { status: 200 });
  }
}
