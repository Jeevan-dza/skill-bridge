# SkillBridge FastAPI Backend API Specification

---

## POST /api/parse-resume

- **Purpose:** NLP skill extraction from uploaded resume
- **Request Body:**
  ```json
  {
    "userId": "string",
    "resumeFile": "(binary PDF/DOCX)"
  }
  ```
- **Response:**
  ```json
  {
    "skills": ["Python", "SQL", ...],
    "education": ["B.Tech Computer Science"],
    "experience": ["Intern, Data Analyst"]
  }
  ```
- **Error Codes:** 400 (bad file), 500 (parse error)

---

## POST /api/skill-gap

- **Purpose:** Analyze skill gaps for a target role
- **Request Body:**
  ```json
  {
    "userId": "string",
    "targetRole": "string",
    "userSkills": ["Python", "SQL", ...]
  }
  ```
- **Response:**
  ```json
  {
    "gaps": ["Tableau", "Statistics"],
    "strengths": ["Python", "SQL"]
  }
  ```
- **Error Codes:** 400 (missing data), 500 (AI error)

---

## POST /api/learning-path

- **Purpose:** Generate personalized learning roadmap
- **Request Body:**
  ```json
  {
    "userId": "string",
    "gaps": ["Tableau", "Statistics"],
    "targetRole": "string"
  }
  ```
- **Response:**
  ```json
  {
    "modules": [
      { "title": "SQL Basics", "status": "Completed" },
      { "title": "Tableau Fundamentals", "status": "Pending" }
    ]
  }
  ```
- **Error Codes:** 400 (missing data), 500 (AI error)

---

## GET /api/readiness-score

- **Purpose:** Calculate job readiness score
- **Query Params:** `userId`, `targetRole`
- **Response:**
  ```json
  {
    "score": 72,
    "feedback": "Good progress. Focus on Tableau."
  }
  ```
- **Error Codes:** 404 (user not found), 500 (ML error)

---

## GET /api/job-matches

- **Purpose:** Fetch matched jobs/internships
- **Query Params:** `userId`, `targetRole`
- **Response:**
  ```json
  {
    "matches": [
      { "title": "Data Analyst Intern", "company": "FinTechX", "score": 85 },
      { "title": "Business Analyst", "company": "BizCorp", "score": 78 }
    ]
  }
  ```
- **Error Codes:** 404 (no matches), 500 (API error)

---

## POST /api/progress

- **Purpose:** Update user progress
- **Request Body:**
  ```json
  {
    "userId": "string",
    "moduleId": "string",
    "progress": 80
  }
  ```
- **Response:**
  ```json
  { "success": true }
  ```
- **Error Codes:** 400 (bad data), 500 (db error)
