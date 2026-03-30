import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!getApps().length && (!clientEmail || !privateKey)) {
  console.warn("⚠️ FIREBASE_ADMIN_PRIVATE_KEY or CLIENT_EMAIL missing in .env.local. Falling back to Application Default Credentials.");
}

const adminApp =
  getApps()[0] ||
  initializeApp(
    clientEmail && privateKey && projectId
      ? {
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        }
      : { projectId }
  );

export const adminAuth = getAuth(adminApp);

