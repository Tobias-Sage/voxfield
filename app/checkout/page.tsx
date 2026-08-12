"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 固定金额和描述（可后续从 URL 参数获取）
  const AMOUNT = 19.99;
  const DESCRIPTION = "Essential Speaker (Monthly)";

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await fetch("/api/payment/initiate-embed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: AMOUNT,
            currency: "USD",
            description: DESCRIPTION,
          }),
        });

        const result = await response.json();

        if (result.success && result.cardUrl) {
          setCardUrl(result.cardUrl);
        } else {
          setError(result.error || "Failed to initiate payment");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initiatePayment();
  }, []);

  return (
    <main style={{ 
      minHeight: "100vh", 
      background: "#f8f7f4", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: "560px", width: "100%" }}>
        {/* 简洁顶部 */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "2rem"
        }}>
          <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1a1a1a" }}>
            VOXFIELD
          </span>
          <Link 
            href="/" 
            style={{ 
              color: "#666", 
              textDecoration: "none",
              fontSize: "0.85rem"
            }}
          >
            ← Back to site
          </Link>
        </div>

        {loading && (
          <div style={{ 
            background: "white", 
            padding: "3rem 2rem", 
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
          }}>
            <div style={{ 
              width: "36px", 
              height: "36px", 
              border: "3px solid #e0e0e0",
              borderTop: "3px solid #1a1a1a",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1rem"
            }} />
            <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Loading secure checkout...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {!loading && error && (
          <div style={{ 
            background: "white", 
            padding: "2rem", 
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Unable to load payment</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>{error}</p>
            <Link 
              href="/checkout" 
              style={{
                padding: "0.6rem 1.5rem",
                background: "#1a1a1a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                fontSize: "0.9rem",
                display: "inline-block"
              }}
            >
              Try Again
            </Link>
          </div>
        )}

        {!loading && !error && cardUrl && (
          <div style={{ 
            background: "white", 
            padding: "1.75rem 1.75rem 1.5rem", 
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
          }}>
            <div style={{ marginBottom: "0.25rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "600", margin: 0 }}>
                Complete your payment
              </h2>
            </div>
            <p style={{ color: "#555", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
              {DESCRIPTION} · <strong>${AMOUNT.toFixed(2)} USD</strong>
            </p>
            <iframe
              src={cardUrl}
              style={{
                width: "100%",
                minHeight: "480px",
                border: "none",
                borderRadius: "12px",
                background: "#fafafa",
              }}
              allow="payment"
              title="Secure card payment"
            />
            <p style={{ 
              marginTop: "1rem", 
              fontSize: "0.7rem", 
              color: "#aaa",
              textAlign: "center"
            }}>
              🔒 256-bit SSL encrypted · PCI DSS compliant · Cards processed securely by WalletPlug
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
