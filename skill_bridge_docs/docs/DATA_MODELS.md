# SkillBridge Firebase Firestore Data Models

---

## users (Collection)

- **Fields:**
  - `uid`: string (Firebase Auth ID)
  - `email`: string
  - `displayName`: string
  - `photoURL`: string
  - `createdAt`: timestamp
  - `onboardingComplete`: boolean
- **Example:**
  ```json
  {
    "uid": "abc123",
    "email": "priya@gmail.com",
    "displayName": "Priya Sharma",
    "photoURL": "...",
    "createdAt": "2024-03-28T10:00:00Z",
    "onboardingComplete": true
  }
  ```

---

## skillProfiles (Collection)

- **Fields:**
  - `userId`: string (ref: users.uid)
  - `skills`: array of string
  - `education`: array of string
  - `experience`: array of string
  - `lastUpdated`: timestamp
- **Example:**
  ```json
  {
    "userId": "abc123",
    "skills": ["Python", "SQL", "Excel"],
    "education": ["B.Tech"],
    "experience": ["Intern, Data Analyst"],
    "lastUpdated": "2024-03-28T10:00:00Z"
  }
  ```

---

## learningPaths (Collection)

- **Fields:**
  - `userId`: string (ref: users.uid)
  - `modules`: array of objects { title, status, progress }
  - `createdAt`: timestamp
- **Example:**
  ```json
  {
    "userId": "abc123",
    "modules": [
      { "title": "SQL Basics", "status": "Completed", "progress": 100 },
      { "title": "Tableau", "status": "Pending", "progress": 0 }
    ],
    "createdAt": "2024-03-28T10:00:00Z"
  }
  ```

---

## progressTracking (Collection)

- **Fields:**
  - `userId`: string (ref: users.uid)
  - `moduleId`: string
  - `progress`: number (0-100)
  - `streak`: number
  - `lastActive`: timestamp
- **Example:**
  ```json
  {
    "userId": "abc123",
    "moduleId": "Tableau",
    "progress": 80,
    "streak": 5,
    "lastActive": "2024-03-28T10:00:00Z"
  }
  ```

---

## jobMatches (Collection)

- **Fields:**
  - `userId`: string (ref: users.uid)
  - `matches`: array of objects { title, company, score }
  - `lastFetched`: timestamp
- **Example:**
  ```json
  {
    "userId": "abc123",
    "matches": [
      { "title": "Data Analyst Intern", "company": "FinTechX", "score": 85 }
    ],
    "lastFetched": "2024-03-28T10:00:00Z"
  }
  ```

---

## onboardingData (Collection)

- **Fields:**
  - `userId`: string (ref: users.uid)
  - `careerGoal`: string
  - `selfAssessment`: array of objects { skill, rating }
  - `resumeUploaded`: boolean
  - `createdAt`: timestamp
- **Example:**
  ```json
  {
    "userId": "abc123",
    "careerGoal": "Data Analyst",
    "selfAssessment": [
      { "skill": "Python", "rating": 3 },
      { "skill": "SQL", "rating": 4 }
    ],
    "resumeUploaded": true,
    "createdAt": "2024-03-28T10:00:00Z"
  }
  ```

---

## Relationships

- `users.uid` → `skillProfiles.userId`, `learningPaths.userId`, `progressTracking.userId`, `jobMatches.userId`, `onboardingData.userId`
- Each user has one skill profile, one learning path, multiple progress records, one job match record, and one onboarding data record.
