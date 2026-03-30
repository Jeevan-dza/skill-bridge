<div align="center">
  
# 🚀 SkillBridge AI

**AI-Powered Career Development & Skill Gap Analysis Platform**
---

**SkillBridge AI** is an intelligent career development platform designed to bridge the gap between candidate skills and industry requirements. By leveraging AI, it analyzes resumes, identifies skill gaps for target roles, and generates personalized learning paths to improve job readiness.

## 🌟 Key Features

* **📄 Intelligent Resume Analysis**  
  Extracts and evaluates user skills, experience, and education from uploaded resumes using AI.

* **🎯 Dynamic Skill Gap Identification**  
  Compares current skills against real-world target job requirements and highlights missing competencies.

* **🧠 AI-Powered Learning Paths**  
  Generates personalized, step-by-step learning roadmaps tailored to bridge identified skill gaps.

* **📊 Job Readiness Scoring**  
  Provides a measurable readiness score to track career progress and interview preparedness.

* **🔐 Secure Authentication & Session Management**  
  Robust JWT-based session management using Firebase Authentication and Edge Middleware.

* **⚡ Real-time Progress Tracking**  
  Interactive dashboards to visualize skill acquisition and track learning milestones.

---

## 🛠 Tech Stack

### Frontend Architecture
* **Framework:** Next.js 15 (App Router with Turbopack & React Compiler)
* **Library:** React 19
* **Styling:** Tailwind CSS v4, `tailwindcss-animate`, `clsx`, `tailwind-merge`
* **Language:** TypeScript 5
* **State & Forms:** React Hook Form, Zod (Schema Validation)
* **Icons & UI:** Lucide React icons
* **Auth:** Firebase SDK, `jose` for Edge JWT validation

### Backend Architecture
* **Framework:** FastAPI (Python)
* **Server:** Uvicorn (ASGI)
* **Performance:** Async I/O, 8-second global response timeout middleware, optimized CORS handling
* **Routing:** Modular prefix-based routing system

### Database & Services
* **Authentication:** Firebase Auth & Firebase Admin SDK
* **Database:** Firestore (Real-time NoSQL state management)
* **Storage:** Firebase Storage (Resume uploads)

---

## 📁 System Architecture

```text
skill_bridge_app/
├── frontend/                # Next.js 15 Client
│   ├── app/                 # App Router (Dashboard, Onboarding, Auth)
│   ├── components/          # Reusable UI architecture (Forms, Layout, UI)
│   ├── lib/                 # Firebase config & utilities
│   ├── public/              # Static & brand assets
│   ├── middleware.ts        # Edge JWT session verification
│   └── package.json         # Node dependencies
│
├── backend/                 # FastAPI Service
│   ├── core/                # Config & centralized Firebase Admin init
│   ├── routes/              # API endpoints (resume, skill-gap, path, etc.)
│   ├── models/              # Pydantic data validation schemas
│   ├── services/            # Business logic & AI integrations
│   ├── main.py              # Application entry point & middleware
│   └── requirements.txt     # Python dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
* **Node.js**: v18+ (v20+ recommended)
* **Python**: v3.9+ 
* **Firebase Project**: Set up via Firebase Console

---

### 1️⃣ Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Configure environment variables:
```bash
cp .env.example .env.local
```
*Update `.env.local` with your Firebase Web configuration and Next.js settings.*

Start the Next.js development server (uses Turbopack):
```bash
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

### 2️⃣ Backend Setup

Navigate to the backend directory and set up a virtual environment:

```bash
cd backend
python -m venv venv

# Activate environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Configure backend environment variables:
```bash
cp .env.example .env
```
*Add your Firebase Admin SDK service account credentials to the environment configuration.*

Start the FastAPI server:
```bash
uvicorn main:app --reload --port 8000
```
*Backend runs on `http://localhost:8000` with interactive API docs at `http://localhost:8000/docs`*

---

⚠️ **Security Note:**
Never commit `.env`, `.env.local`, or Firebase service account JSON keys. Ensure they are excluded via `.gitignore`.

---

## 📡 API Reference

The FastAPI backend exposes the following core RESTful endpoints:

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| **`/api/parse-resume`** | `POST` | Parses uploaded resume documents and extracts key skills |
| **`/api/skill-gap`** | `POST` | Calculates gap between user profile and target role |
| **`/api/learning-path`**| `POST` | Generates a custom step-by-step roadmap |
| **`/api/readiness-score`**| `GET` | Computes aggregate job readiness metrics |
| **`/api/job-matches`** | `GET` | Recommends aligned job opportunities |
| **`/api/progress`** | `POST` | Updates and syncs learning progress state |

*For complete API documentation, input schemas, and interactive testing, visit the Swagger UI at `http://127.0.0.1:8000/docs` while the backend is running.*

---

## 🤝 Contributing

Contributions are always welcome! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. Check the `LICENSE` file for details.

---

<div align="center">

Made with ❤️ by **Jeevan Bevan Dsouza**  
*AI/ML Engineering Student*

If you found this project helpful or interesting, please consider giving it a ⭐ on GitHub!

</div>
