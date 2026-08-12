import { NextRequest, NextResponse } from "next/server";

const WALLETPLUG_API_URL = "https://walletplug.com/api/v1/initiate-payment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, description } = body;

    const refTrx = `EMBED-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const payload = {
      payment_amount: amount || 19.99,
      currency_code: currency || "USD",
      ref_trx: refTrx,
      description: description || "VOXFIELD Subscription",
      success_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      cancel_redirect: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/webhook`,
      allow_payment_methods: ["card"],
      embed_style: "minimal",
      embed_pay_label: "Pay Now",
    };

    const response = await fetch(WALLETPLUG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Environment": "production", // 强制生产环境
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
      cardUrl: data.card_url || data.payment_url,
      refTrx: refTrx,
    });
  } catch (error) {
    console.error("Initiate embed error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
