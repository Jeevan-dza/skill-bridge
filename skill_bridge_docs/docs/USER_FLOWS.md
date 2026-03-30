# SkillBridge User Flows

---

## 1. New User Registration & Onboarding

### Steps

1. User lands on `/login` and signs up with Google
2. Redirected to `/onboarding`
3. Step 1: Select career goal
4. Step 2: Self-assess skills
5. Step 3: Upload resume
6. Resume parsed, skills extracted
7. User profile created in Firestore
8. Redirect to `/dashboard`

```mermaid
flowchart TD
  A[Login/Signup] --> B[Onboarding Step 1: Goal]
  B --> C[Step 2: Skill Assessment]
  C --> D[Step 3: Resume Upload]
  D --> E[AI Skill Extraction]
  E --> F[Create User Profile]
  F --> G[Dashboard]
```

---

## 2. Skill Gap Analysis Flow

### Steps

1. User navigates to `/skill-gap`
2. Selects/inputs target job role
3. Platform fetches required skills for role
4. Compares with user’s extracted skills
5. Visualizes gaps and strengths
6. Stores gap data in Firestore

```mermaid
flowchart TD
  A[Skill Gap Page] --> B[Select Target Role]
  B --> C[Fetch Role Skills]
  C --> D[Compare with User Skills]
  D --> E[Show Gaps/Strengths]
  E --> F[Save Gap Data]
```

---

## 3. Learning Path Generation & Progress

### Steps

1. User visits `/learning-path`
2. Platform generates personalized modules
3. User views modules, resources, mentor tips
4. Completes modules, marks progress
5. Progress tracked, streaks updated
6. Completion unlocks new modules/jobs

```mermaid
flowchart TD
  A[Learning Path Page] --> B[Generate Modules]
  B --> C[Show Resources]
  C --> D[User Completes Modules]
  D --> E[Track Progress]
  E --> F[Unlock Next Steps]
```

---

## 4. Job Readiness Score Calculation

### Steps

1. User visits `/readiness-score`
2. Platform fetches user profile, skills, progress
3. ML model calculates readiness score
4. Score visualized (circular meter, feedback)
5. User sees actionable tips

```mermaid
flowchart TD
  A[Readiness Score Page] --> B[Fetch User Data]
  B --> C[ML Model: Calculate Score]
  C --> D[Show Score Meter]
  D --> E[Show Feedback]
```

---

## 5. Job Matching Flow

### Steps

1. User visits `/dashboard` or `/job-matches`
2. Platform fetches readiness score, skills
3. Calls job matching API
4. Shows matched jobs/internships
5. User applies or saves jobs

```mermaid
flowchart TD
  A[Dashboard/Job Matches] --> B[Fetch Score/Skills]
  B --> C[Call Job Matching API]
  C --> D[Show Matched Jobs]
  D --> E[User Applies/Saves]
```
