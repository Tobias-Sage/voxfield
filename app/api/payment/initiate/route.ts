import { NextRequest, NextResponse } from "next/server";

// ===== 读取支付开关环境变量（后端防护） =====
const PAYMENT_ENABLED = process.env.NEXT_PUBLIC_PAYMENT_ENABLED !== "false";

const WALLETPLUG_API_URL = "https://walletplug.com/api/v1/initiate-payment";

export async function POST(request: NextRequest) {
  // ===== 支付开关检查 =====
  if (!PAYMENT_ENABLED) {
    return NextResponse.json(
      { error: "Payment is temporarily disabled" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { planName, isAnnual, amount, currency, userEmail, clickId } = body;

    // 生成唯一订单号
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const refTrx = clickId ? `VOX-${clickId}-${timestamp}-${random}` : `VOX-${timestamp}-${random}`;

    const payload = {
      payment_amount: amount,
      currency_code: currency || "USD",
      ref_trx: refTrx,
      description: `${planName}${isAnnual ? " (Annual)" : " (Monthly)"}`,
      success_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      cancel_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/webhook`,
      customer_email: userEmail || "",
      allow_payment_methods: ["card", "mobile_money", "bank_transfer"],
    };

    const response = await fetch(WALLETPLUG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Environment": process.env.WALLETPLUG_ENVIRONMENT || "sandbox",
        "X-Merchant-Key": process.env.WALLETPLUG_MERCHANT_KEY!,
        "X-API-Key": process.env.WALLETPLUG_API_KEY!,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("WalletPlug API Error:", data);
      return NextResponse.json(
        { error: data.message || "Payment initiation failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      paymentUrl: data.payment_url,
      refTrx: refTrx,
    });
  } catch (error) {
    console.error("Initiate payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
