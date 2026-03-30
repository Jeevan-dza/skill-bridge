"""Pydantic schemas for all FastAPI request/response models."""

from pydantic import BaseModel, Field
from typing import Optional


# ─── Resume Parsing ─────────────────────────────────────────────
class ResumeParseRequest(BaseModel):
    userId: str


class ResumeParseResponse(BaseModel):
    skills: list[str]
    education: list[str]
    experience: list[str]


# ─── Skill Gap Analysis ─────────────────────────────────────────
class SkillGapRequest(BaseModel):
    userId: str
    targetRole: str
    userSkills: list[str]


class SkillGapResponse(BaseModel):
    gaps: list[str]
    strengths: list[str]


# ─── Learning Path ──────────────────────────────────────────────
class LearningModule(BaseModel):
    title: str
    status: str  # "Completed", "In Progress", "Pending", "Locked"
    progress: int = Field(ge=0, le=100)
    duration: str = ""
    resources: list[str] = []


class LearningPathRequest(BaseModel):
    userId: str
    gaps: list[str]
    targetRole: str


class LearningPathResponse(BaseModel):
    modules: list[LearningModule]


# ─── Readiness Score ────────────────────────────────────────────
class ReadinessScoreResponse(BaseModel):
    score: int = Field(ge=0, le=100)
    feedback: str
    breakdown: dict[str, int] = {}


# ─── Job Matches ────────────────────────────────────────────────
class JobMatch(BaseModel):
    title: str
    company: str
    score: int = Field(ge=0, le=100)
    location: str = ""
    type: str = ""  # "Full-time", "Internship", "Part-time"


class JobMatchesResponse(BaseModel):
    matches: list[JobMatch]


# ─── Progress Update ────────────────────────────────────────────
class ProgressUpdateRequest(BaseModel):
    userId: str
    moduleId: str
    progress: int = Field(ge=0, le=100)


class ProgressUpdateResponse(BaseModel):
    success: bool
