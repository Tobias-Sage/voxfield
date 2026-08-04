// app/api/payment/initiate/route.ts
import { NextRequest, NextResponse } from "next/server";

const WALLETPLUG_API_URL = "https://walletplug.com/api/v1/initiate-payment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planName, isAnnual, amount, currency, userEmail } = body;

    // 生成唯一订单号
    const refTrx = `VOX-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // 构建请求参数
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

    // 调用 WalletPlug API
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
