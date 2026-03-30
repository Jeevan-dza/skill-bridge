# 🚀 SkillBridge AI

**SkillBridge AI** is an intelligent career development platform designed to bridge the gap between candidate skills and industry requirements. By leveraging AI, it analyzes resumes, identifies skill gaps for target roles, and generates personalized learning paths to improve job readiness.

---

## 🌟 Key Features

* 📄 **Resume Analysis**
  Extracts and evaluates user skills from uploaded resumes.

* 🎯 **Skill Gap Identification**
  Compares current skills with target job requirements.

* 🧠 **AI-Powered Learning Paths**
  Generates personalized learning roadmaps to bridge gaps.

* 📊 **Job Readiness Scoring**
  Provides a measurable score to track career progress.

* 🔐 **Authentication & Data Management**
  Secure user authentication and real-time data storage.

---

## 🛠 Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* Tailwind CSS
* TypeScript

### Backend

* FastAPI (Python)
* Uvicorn

### Database & Services

* Firebase Authentication
* Firestore Database
* Firebase Storage
* Realtime Database

---

## 📁 Project Structure

```
skill_bridge/
├── frontend/                # Next.js Application
│   ├── app/                 # Pages (Dashboard, Auth, Onboarding)
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Firebase & API configs
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # FastAPI Application
│   ├── core/                # Config & Firebase Admin setup
│   ├── routes/              # API endpoints
│   ├── models/              # Pydantic schemas
│   ├── main.py              # Entry point
│   └── requirements.txt
```

---

## ⚙️ Environment Setup

### 🔹 Prerequisites

* Node.js (v18+ recommended)
* Python (v3.9+)
* Firebase Project

---

### 🔹 Frontend Setup

```bash
cd frontend
cp .env.example .env.local
```

Update `.env.local` with your Firebase web credentials.

---

### 🔹 Backend Setup

```bash
cd backend
cp .env.example .env
```

Add your Firebase Admin SDK credentials.

---

⚠️ **Security Note:**
Never commit `.env` files or service account keys. Ensure they are included in `.gitignore`.

---

## 🚀 Running the Application

Run backend and frontend in separate terminals.

---

### ▶️ Start Backend

```bash
cd backend
python -m venv venv

# Activate environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend URL:
👉 http://localhost:8000

---

### ▶️ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:
👉 http://localhost:3000

---

## 📡 API Overview

| Endpoint     | Description               |
| ------------ | ------------------------- |
| `/resume`    | Resume parsing & analysis |
| `/skill-gap` | Identify missing skills   |
| `/readiness` | Job readiness scoring     |

---

## 🧩 Future Enhancements

* 🤖 Advanced AI career recommendations
* 📚 Integrated learning platform APIs
* 📈 Analytics dashboard for progress tracking
* 🌐 Deployment (Vercel + Cloud Run/AWS)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for details.

---

## 👨‍💻 Author

**Jeevan Bevan Dsouza**
AI/ML Engineering Student

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
