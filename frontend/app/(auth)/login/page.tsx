"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ── INSTANT REDIRECT: If user is already logged in, skip auth page entirely ──
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Already authenticated — redirect immediately, never show login page
        router.replace("/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const createSession = useCallback(async (idToken: string) => {
    const response = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!response.ok) throw new Error("Failed to create a secure session.");
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(true);
      await createSession(idToken);
      router.push("/dashboard");
    } catch (error: unknown) {
      setError("Failed to sign in. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Instant visual feedback — set loading under 50ms
    setLoading(true);
    setError("");
    try {
      // Use module-level provider — never create GoogleAuthProvider inside function
      const userCredential = await signInWithPopup(auth, googleProvider);

      const idToken = await userCredential.user.getIdToken(true);
      await createSession(idToken);

      router.push("/dashboard");
    } catch (error: unknown) {
      setError("Failed to sign in with Google.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Show nothing while checking auth — prevents flash of login page for logged-in users
  if (checkingAuth) {
    return (
      <div className="w-full max-w-md flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
        <p className="text-slate-500 text-sm">Sign in to continue your career journey.</p>
      </div>

      {error && (
        <div role="alert" className="bg-red-50 text-red-600 p-3.5 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {/* Google Auth */}
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-5 py-3 border border-slate-200 bg-white text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all duration-200 active:scale-[0.99] shadow-sm disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <span>{loading ? "Signing in..." : "Continue with Google"}</span>
      </button>

      {/* Divider */}
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-slate-400 text-xs font-medium">or continue with email</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleEmailSignIn} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700" htmlFor="email">Email Address</label>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400"
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
              <Link className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors" href="/forgot-password">Forgot password?</Link>
            </div>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 text-sm"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors" href="/signup">Sign up</Link>
      </p>

      {/* Legal */}
      <div className="pt-4 text-center">
        <div className="inline-flex items-center gap-3 text-xs text-slate-400">
          <Link className="hover:text-slate-600 transition-colors" href="/privacy">Privacy</Link>
          <span className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
          <Link className="hover:text-slate-600 transition-colors" href="/terms">Terms</Link>
          <span className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
          <Link className="hover:text-slate-600 transition-colors" href="/support">Support</Link>
        </div>
      </div>
    </div>
  );
}
