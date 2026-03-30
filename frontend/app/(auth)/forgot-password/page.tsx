"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("If an account with that email exists, we sent a password reset link.");
      setEmail("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Failed to send reset email.");
      } else {
        setError("Failed to send reset email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="lg:hidden flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">S</span>
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">SkillBridge</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reset your password</h2>
        <p className="text-slate-500 text-sm">Enter your email and we&apos;ll send you a reset link.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3.5 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-lg text-sm font-medium border border-emerald-100">
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleReset} className="space-y-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700" htmlFor="email">Email Address</label>
          <input
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400"
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 text-sm"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-slate-500">
        Remember your password?{" "}
        <Link className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors" href="/login">Sign in</Link>
      </p>

      {/* Legal */}
      <div className="pt-8 text-center">
        <div className="inline-flex items-center gap-3 text-xs text-slate-400">
          <Link className="hover:text-slate-600 transition-colors" href="#">Privacy</Link>
          <span className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
          <Link className="hover:text-slate-600 transition-colors" href="#">Support</Link>
        </div>
      </div>
    </div>
  );
}
