"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const goToSignUp = window.confirm(
        "This account does not exist yet. Would you like to create one?"
      );
      if (goToSignUp) {
        router.push("/signup");
      }
    }, 800);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue your practice</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="auth-switch">
          No account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
