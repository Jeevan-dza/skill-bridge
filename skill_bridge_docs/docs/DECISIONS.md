# SkillBridge Architecture Decision Records (ADR)

---

## 1. Next.js over Plain React

- **Context:** Need for SSR, SEO, routing, and scalability
- **Options:** React, Next.js, Gatsby
- **Chosen:** Next.js
- **Reason:** File-based routing, SSR/SSG, Vercel deploy, best for SaaS

## 2. Firebase over Custom Backend

- **Context:** Need for fast auth, real-time DB, hosting
- **Options:** Firebase, AWS Amplify, custom Node.js backend
- **Chosen:** Firebase
- **Reason:** Google Auth, Firestore, easy integration, rapid MVP

## 3. FastAPI over Node.js for AI

- **Context:** AI/ML backend for NLP, scoring, recommendations
- **Options:** FastAPI (Python), Express (Node.js), Flask
- **Chosen:** FastAPI
- **Reason:** Python AI ecosystem, async, type hints, performance

## 4. Tailwind over CSS Modules

- **Context:** Need for scalable, consistent, utility-first styling
- **Options:** Tailwind CSS, CSS Modules, Styled Components
- **Chosen:** Tailwind CSS
- **Reason:** Design tokens, rapid prototyping, atomic classes

## 5. Google OAuth Only

- **Context:** Auth simplicity, user trust, onboarding speed
- **Options:** Google, email/password, social logins
- **Chosen:** Google OAuth
- **Reason:** Fastest onboarding, no password management

## 6. Firestore over SQL

- **Context:** Flexible, schema-less, real-time data
- **Options:** Firestore, PostgreSQL, MongoDB
- **Chosen:** Firestore
- **Reason:** NoSQL, easy integration, scales with users

## 7. Flat 2D Vector Illustration Style

- **Context:** Modern SaaS look, Figma/Google Stitch assets
- **Options:** 2D vector, 3D, stock photos
- **Chosen:** Flat 2D vector
- **Reason:** Clean, fast load, brand consistency

## 8. 7-Page App Structure

- **Context:** Each feature mapped to a clear page
- **Options:** Fewer pages, single-page app, multi-page
- **Chosen:** 7 pages (Landing, Login, Onboarding, Dashboard, Skill Gap, Learning Path, Readiness Score)
- **Reason:** Clear navigation, modular code, user journey clarity
