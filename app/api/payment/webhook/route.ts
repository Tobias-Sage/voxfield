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

    // 1. 获取签名头（从日志中确认是 x-signature）
    const signatureHeader = request.headers.get("x-signature") || "";
    if (!signatureHeader) {
      console.error("Missing x-signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // 2. 去掉 "sha256=" 前缀，提取实际的 HMAC 值
    let hmac = signatureHeader;
    if (signatureHeader.startsWith("sha256=")) {
      hmac = signatureHeader.substring(7); // 移除 "sha256="
    }

    // 3. 计算期望的签名（对 rawBody 进行 HMAC-SHA256）
    const expectedHmac = crypto
      .createHmac("sha256", process.env.WALLETPLUG_CLIENT_SECRET!)
      .update(rawBody)
      .digest("hex");

    // 4. 比较签名（忽略大小写）
    if (hmac.toLowerCase() !== expectedHmac.toLowerCase()) {
      console.error("Invalid webhook signature");
      console.error(`Expected: ${expectedHmac}`);
      console.error(`Received: ${hmac}`);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    console.log("✅ Webhook signature verified successfully");

    // 5. 解析 payload
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
