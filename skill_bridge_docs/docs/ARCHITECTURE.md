# SkillBridge System Architecture

## High-Level Architecture Diagram

```mermaid
graph TD
  A[Next.js Frontend (React, Tailwind)] --API Calls--> B[FastAPI Backend (Python, AI/ML)]
  B --Firestore SDK--> C[Firebase Firestore]
  A --Firebase Auth SDK--> D[Firebase Auth]
  A --Firestore SDK--> C
  B --Job APIs--> E[External Job Boards]
```

## Frontend Architecture

- **Framework:** Next.js (React, Tailwind CSS)
- **Pages:** `/`, `/login`, `/onboarding`, `/dashboard`, `/skill-gap`, `/learning-path`, `/readiness-score`
- **Routing:** File-based, dynamic for user-specific data
- **State:** React Context, SWR/React Query for API data
- **Auth:** Firebase Auth (Google OAuth)
- **Component Library:** See `/docs/COMPONENTS.md`

## Backend Architecture

- **Framework:** FastAPI (Python)
- **Endpoints:** See `/docs/API_SPEC.md`
- **AI/ML:** spaCy/HuggingFace for NLP, scikit-learn for scoring, custom recommender
- **Security:** Auth token validation (Firebase)

## Firebase Data Flow

- User signs in via Firebase Auth
- User data, progress, and learning paths stored in Firestore
- FastAPI reads/writes via Firestore SDK

## AI/ML Pipeline

1. Resume Parsing (PDF/DOCX → text)
2. NLP Skill Extraction (spaCy/HuggingFace)
3. Skill Gap Analysis (compare to job role)
4. Readiness Scoring (ML model)
5. Learning Path Recommendation (custom logic)

## API Communication Flow

- Next.js → FastAPI: All AI/ML features (resume, gap, path, score, jobs)
- FastAPI → Firebase: User data, progress, learning paths
- Next.js → Firebase: Auth, profile, progress

## Deployment Strategy

- **Frontend:** Vercel (Next.js), Firebase Hosting (fallback)
- **Backend:** Render.com, Railway, or GCP (FastAPI)
- **Firebase:** Cloud Firestore, Auth, Storage
- **CI/CD:** GitHub Actions for build/test/deploy
