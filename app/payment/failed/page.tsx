// app/payment/failed/page.tsx
"use client";

import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <main className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <h1>❌ Payment Failed</h1>
        <p>We couldn't process your payment. Please try again.</p>
        <Link href="/pricing" className="button button-outline-dark" style={{ marginTop: "1rem", display: "inline-block" }}>
          Back to Pricing
        </Link>
      </div>
    </main>
  );
}
