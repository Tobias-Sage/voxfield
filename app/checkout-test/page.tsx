"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutTestPage() {
  const [loading, setLoading] = useState(true);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 固定金额和描述
  const AMOUNT = 19.99;
  const DESCRIPTION = "Essential Speaker (Monthly)";

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await fetch("/api/payment/test-initiate", {
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
      background: "#f5f5f5", 
      padding: "2rem 1rem",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* 顶部导航 */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "2rem"
        }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
            💳 Checkout
          </h1>
          <Link 
            href="/" 
            style={{ 
              color: "#666", 
              textDecoration: "none",
              fontSize: "0.9rem"
            }}
          >
            ← Back to Site
          </Link>
        </div>

        {/* 提示信息 */}
        <div style={{ 
          background: "#e3f2fd", 
          padding: "0.75rem 1rem", 
          borderRadius: "8px",
          marginBottom: "1.5rem",
          fontSize: "0.9rem",
          color: "#0d47a1"
        }}>
          ⚡ 沙箱测试环境 · 固定金额 $19.99 · 不会产生真实扣费
        </div>

        {/* 加载状态 */}
        {loading && (
          <div style={{ 
            background: "white", 
            padding: "3rem 2rem", 
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <div style={{ 
              width: "40px", 
              height: "40px", 
              border: "3px solid #e0e0e0",
              borderTop: "3px solid #1a1a1a",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1rem"
            }} />
            <p style={{ color: "#666", margin: 0 }}>Loading secure checkout...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* 错误状态 */}
        {!loading && error && (
          <div style={{ 
            background: "white", 
            padding: "2rem", 
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>❌</div>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Something went wrong</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>{error}</p>
            <Link 
              href="/checkout-test" 
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

        {/* 支付表单（iframe） */}
        {!loading && !error && cardUrl && (
          <div style={{ 
            background: "white", 
            padding: "1.5rem", 
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "0.5rem"
            }}>
              <h2 style={{ fontSize: "1.1rem", margin: 0 }}>
                Complete Payment
              </h2>
            </div>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              {DESCRIPTION} · <strong>${AMOUNT.toFixed(2)} USD</strong>
            </p>
            <iframe
              src={cardUrl}
              style={{
                width: "100%",
                minHeight: "520px",
                border: "none",
                borderRadius: "8px",
                background: "#fafafa",
              }}
              allow="payment"
              title="Secure card payment"
            />
            <p style={{ 
              marginTop: "1rem", 
              fontSize: "0.75rem", 
              color: "#aaa",
              textAlign: "center"
            }}>
              🔒 256-bit SSL 加密 · PCI DSS 合规 · 卡片信息由 WalletPlug 安全托管
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
