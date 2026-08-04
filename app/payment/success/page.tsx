// app/payment/success/page.tsx
"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>🎉 Payment Successful!</h1>
        <p>Thank you for subscribing to VOXFIELD.</p>
        <p>Your access has been activated. You can now start your speaking journey.</p>
        <Link href="/courses" className="button button-amber" style={{ marginTop: "1rem", display: "inline-block" }}>
          Start Learning →
        </Link>
      </div>
    </main>
  );
}
