# SkillBridge Product Requirements Document (PRD)

## Executive Summary

SkillBridge is an AI-powered platform designed to bridge the skill gap for students and job seekers by assessing current skills, identifying gaps, generating personalized learning paths, tracking progress, and matching users with jobs and internships. The platform leverages advanced AI/ML, a modern SaaS UI, and seamless integration with Firebase and FastAPI.

## Problem Statement

Millions of students and young professionals face a disconnect between their current skills and the requirements of the modern workforce. Traditional education and job boards do not provide personalized, actionable guidance to close these gaps, resulting in underemployment and missed opportunities.

## Solution Overview

SkillBridge offers a unified platform that:

- Extracts skills from resumes using NLP
- Analyzes skill gaps for target roles
- Generates personalized learning paths
- Tracks progress and milestones
- Calculates job readiness scores
- Matches users with relevant jobs/internships

## Target Users

- University students (final year, pre-final year)
- Recent graduates
- Early-career job seekers
- Career switchers

## Core Features

1. **Resume Upload + NLP Skill Extraction**
   - Users upload resumes; AI extracts skills using spaCy/HuggingFace.
   - Output: Structured skill profile.
2. **Skill Gap Analysis**
   - Compares user skills to target job requirements.
   - Visualizes gaps and strengths.
3. **Personalized Learning Path Generation**
   - AI recommends courses, projects, and resources.
   - Dynamic, milestone-based roadmap.
4. **Job Readiness Score**
   - ML model predicts readiness for target roles.
   - Visual score meter and actionable feedback.
5. **Job and Internship Matching**
   - Matches users to jobs/internships based on skills and readiness.
   - Integrates with job boards/APIs.
6. **Progress Tracking**
   - Tracks learning milestones, streaks, and achievements.
   - Visual dashboards and reminders.

## Success Metrics

- User activation rate (onboarding completion)
- % of users closing skill gaps
- Learning path completion rate
- Job/internship match rate
- User NPS and satisfaction

## Out of Scope

- Non-student/early-career audiences
- Manual job application management
- Non-AI-based resume parsing
- Offline/desktop app

## Future Enhancements

- AI-powered mock interviews
- Mentor/instructor integration
- Live project recommendations
- Company-specific preparation modules
- Mobile app (iOS/Android)
