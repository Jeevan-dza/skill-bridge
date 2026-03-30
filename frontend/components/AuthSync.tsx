"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onIdTokenChanged, type User } from "firebase/auth";

export function AuthSync() {
  useEffect(() => {
    // This constantly ensures that the Firebase Client SDK state
    // perfectly mirrors the Next.js `session` cookie. 
    // It runs on login, logout, and token refresh (every ~1hr).
    const unsubscribe = onIdTokenChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          // Get the fresh token. Firebase automatically buffers/refreshes the token under the hood.
          const token = await user.getIdToken();
          await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          });
        } catch (error) {
          console.error("AuthSync: Error updating session token", error);
        }
      } else {
        // Fully signed out, clear the Next.js session cookie
        try {
          await fetch("/api/logout", { method: "POST" });
        } catch (error) {
          console.error("AuthSync: Error clearing session token", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
