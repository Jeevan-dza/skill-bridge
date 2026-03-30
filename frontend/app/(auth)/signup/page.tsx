"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ── INSTANT REDIRECT: If user is already logged in, skip signup page ──
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const getErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error ? error.message : fallback;

  const createUserDocument = async (user: User, displayName: string) => {
    const userRef = doc(db, "users", user.uid);
    const resolvedDisplayName = displayName || user.displayName || "User";

    await runTransaction(db, async (transaction) => {
      const userSnapshot = await transaction.get(userRef);

      if (!userSnapshot.exists()) {
        transaction.set(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: resolvedDisplayName,
          photoURL: user.photoURL || null,
          createdAt: serverTimestamp(),
          onboardingComplete: false,
        });
        return;
      }

      transaction.update(userRef, {
        email: user.email,
        displayName: resolvedDisplayName,
        photoURL: user.photoURL || null,
      });
    });
  };

  const createSession = useCallback(async (idToken: string) => {
    const response = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!response.ok) throw new Error("Failed to create a secure session.");
  }, []);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Run profile update + user doc creation + session in parallel where possible
      const [, idToken] = await Promise.all([
        updateProfile(userCredential.user, { displayName: name }),
        userCredential.user.getIdToken(true),
      ]);

      // Session + user doc in parallel
      await Promise.all([
        createSession(idToken),
        createUserDocument(userCredential.user, name),
      ]);

      router.push("/onboarding");
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Failed to create account."));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");
    try {
      // Use module-level provider — never create GoogleAuthProvider inside function
      const userCredential = await signInWithPopup(auth, googleProvider);

      // Run session + user doc creation in parallel
      const idToken = await userCredential.user.getIdToken(true);
      await Promise.all([
        createSession(idToken),
        createUserDocument(userCredential.user, userCredential.user.displayName || ""),
      ]);

      router.push("/onboarding");
    } catch (error: unknown) {
      setError("Failed to sign up with Google.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Show nothing while checking auth
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
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h2>
        <p className="text-slate-500 text-sm">Start bridging your skill gap today.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3.5 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {/* Google Auth */}
      <button
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-5 py-3 border border-slate-200 bg-white text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all duration-200 active:scale-[0.99] shadow-sm disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        <span>{loading ? "Creating account..." : "Sign up with Google"}</span>
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
      <form onSubmit={handleEmailSignUp} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700" htmlFor="name">Full Name</label>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400"
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <input
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 text-sm placeholder:text-slate-400"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 text-sm"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors" href="/login">Sign in</Link>
      </p>

      {/* Legal */}
      <div className="text-center">
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
