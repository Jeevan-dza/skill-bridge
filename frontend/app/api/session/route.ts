import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function POST(request: Request) {
  let body: { idToken?: string };

  try {
    body = (await request.json()) as { idToken?: string };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Malformed JSON body." }, { status: 400 });
    }

    console.error("Failed to parse session request body", error);
    return NextResponse.json({ error: "Malformed JSON body." }, { status: 400 });
  }

  try {
    const { idToken } = body;

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json({ error: "Missing idToken." }, { status: 400 });
    }

    // By only verifying the Token instead of creating a full session cookie via adminAuth,
    // we bypass the hard dependency on `FIREBASE_ADMIN_PRIVATE_KEY` for local development.
    // The `AuthSync` ensures it refreshes cleanly.
    await adminAuth.verifyIdToken(idToken);
    
    // Use the ID token directly as the session identifier.
    const cookieStore = await cookies();
    cookieStore.set("session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE_MS / 1000,
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("🔥 Failed to create session cookie:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Could not create session.", details: errorMessage }, { status: 401 });
  }
}
