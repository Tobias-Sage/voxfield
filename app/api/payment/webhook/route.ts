import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  // ========== 临时调试：打印所有请求头 ==========
  console.log("=== All Headers ===");
  const headersObj: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headersObj[key] = value;
  });
  console.log(JSON.stringify(headersObj, null, 2));
  console.log("=== End Headers ===");
  // ============================================

  try {
    const rawBody = await request.text();

    // 1. 获取签名头（尝试多个可能的名称）
    let signatureHeader = request.headers.get("X-WalletPlug-Signature") || 
                          request.headers.get("x-signature") ||
                          request.headers.get("X-Signature") ||
                          request.headers.get("signature") || "";
    if (!signatureHeader) {
      console.error("Missing signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // 2. 解析签名
    // 如果格式为 t=xxx,v1=yyy
    let timestamp = "";
    let hmac = "";
    if (signatureHeader.includes("t=") && signatureHeader.includes("v1=")) {
      const parts = signatureHeader.split(",");
      for (const part of parts) {
        const [key, value] = part.split("=");
        if (key === "t") timestamp = value;
        else if (key === "v1") hmac = value;
      }
    } else {
      // 可能只是单纯的 HMAC 值（如 sha256=...）
      hmac = signatureHeader.replace(/^sha256=/, "");
      timestamp = String(Math.floor(Date.now() / 1000));
    }

    if (!hmac) {
      console.error("Invalid signature header format");
      return NextResponse.json({ error: "Invalid signature format" }, { status: 401 });
    }

    // 3. 计算期望的签名
    const expectedHmac = crypto
      .createHmac("sha256", process.env.WALLETPLUG_CLIENT_SECRET!)
      .update(`${timestamp}.${rawBody}`)
      .digest("hex");

    // 4. 比较签名（忽略大小写）
    if (hmac.toLowerCase() !== expectedHmac.toLowerCase()) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 5. （可选）检查时间戳，防止重放攻击（5分钟窗口）
    const now = Math.floor(Date.now() / 1000);
    const ts = parseInt(timestamp, 10);
    if (Math.abs(now - ts) > 300) {
      console.warn("Webhook timestamp too old or in future");
      // 为了测试可以放宽，正式启用时建议返回 401
      // return NextResponse.json({ error: "Stale timestamp" }, { status: 401 });
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
          if (!/^\d+$/.test(secondPart)) {
            clickId = secondPart;
          }
        }
      }

      const postbackUrl = `http://newmobi.fuse-cloud.com/pb?tid=${clickId || "unknown"}&s1=${data.amount || 0}`;
      console.log(`📤 Sending postback: ${postbackUrl}`);

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
    return NextResponse.json({ error: "Processing error" }, { status: 200 });
  }
}
