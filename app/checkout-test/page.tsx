"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutTestPage() {
  const [loading, setLoading] = useState(false);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("19.99");
  const [description, setDescription] = useState("Test Embed Payment");

  const handleInitiatePayment = async () => {
    setLoading(true);
    setError(null);
    setCardUrl(null);

    try {
      const response = await fetch("/api/payment/test-initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: "USD",
          description: description,
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
            🧪 Checkout Test
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
          ⚡ 独立测试页面 · 不影响现有支付功能 · 使用沙箱环境测试
        </div>

        {/* 如果还没有 cardUrl，显示初始化表单 */}
        {!cardUrl && (
          <div style={{ 
            background: "white", 
            padding: "2rem", 
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              Start a Test Payment
            </h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              输入金额后点击按钮，将加载嵌入式支付表单。
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                Amount (USD)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="1"
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>

            {error && (
              <div style={{ 
                background: "#fde8e8", 
                color: "#c0392b", 
                padding: "0.75rem", 
                borderRadius: "8px",
                marginBottom: "1rem",
                fontSize: "0.9rem"
              }}>
                ❌ {error}
              </div>
            )}

            <button
              onClick={handleInitiatePayment}
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "#1a1a1a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Initializing..." : "💳 Load Embedded Checkout"}
            </button>

            <p style={{ 
              marginTop: "1rem", 
              fontSize: "0.8rem", 
              color: "#999",
              textAlign: "center"
            }}>
              🔒 支付表单由 WalletPlug 安全托管 · 不存储卡片信息
            </p>
          </div>
        )}

        {/* 如果已有 cardUrl，显示嵌入式 iframe */}
        {cardUrl && (
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
              marginBottom: "1rem"
            }}>
              <h2 style={{ fontSize: "1.1rem", margin: 0 }}>
                💳 Complete Payment
              </h2>
              <button
                onClick={() => setCardUrl(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  textDecoration: "underline"
                }}
              >
                ← Back
              </button>
            </div>
            <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {description} · ${amount} USD
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
              🔒 256-bit SSL 加密 · PCI DSS 合规 · 卡片信息由 WalletPlug 安全处理
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
