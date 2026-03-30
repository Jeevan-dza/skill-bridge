"use client";

import { auth, db, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Re-export the module-level provider for external use if needed
export { googleProvider };

/**
 * Sign in with Google OAuth popup, then create a server-side session cookie.
 * Returns the Firebase User on success.
 * Uses the module-level googleProvider — never creates a new one.
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);

  // Get token and create session in parallel-safe manner
  const idToken = await result.user.getIdToken();

  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    throw new Error("Failed to create session.");
  }

  return result.user;
}

/**
 * Sign the user out of Firebase and clear the session cookie.
 */
export async function signOutUser(): Promise<void> {
  await fetch("/api/logout", { method: "POST" });
  await signOut(auth);
}

/**
 * Get the current user (null if not signed in).
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Subscribe to auth state changes.
 * Returns an unsubscribe function.
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Check if the user has completed onboarding.
 */
export async function hasCompletedOnboarding(uid: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return !!userDoc.data().onboardingComplete;
    }
    return false;
  } catch {
    return false;
  }
}
