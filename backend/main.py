"""SkillBridge FastAPI Backend — Main entry point.

Run with: uvicorn main:app --reload --port 8000

Performance optimizations:
- Response timeout middleware (8s max per request)
- Async-ready for non-blocking I/O
"""

import asyncio
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routes import resume, skill_gap, learning_path, readiness, job_matches, progress

app = FastAPI(
    title="SkillBridge AI API",
    description="AI-powered career development backend for resume parsing, skill gap analysis, learning path generation, and job readiness scoring.",
    version="0.1.0",
)

# CORS — allow the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Global 8-second response timeout middleware ──
@app.middleware("http")
async def timeout_middleware(request: Request, call_next):
    """Ensure no endpoint takes longer than 8 seconds."""
    try:
        response = await asyncio.wait_for(call_next(request), timeout=8.0)
        return response
    except asyncio.TimeoutError:
        return JSONResponse(
            status_code=504,
            content={"detail": "Request timed out. Please try again."},
        )


# Mount all routers
app.include_router(resume.router)
app.include_router(skill_gap.router)
app.include_router(learning_path.router)
app.include_router(readiness.router)
app.include_router(job_matches.router)
app.include_router(progress.router)


@app.get("/")
async def root():
    return {
        "name": "SkillBridge AI API",
        "version": "0.1.0",
        "status": "running",
        "endpoints": [
            "POST /api/parse-resume",
            "POST /api/skill-gap",
            "POST /api/learning-path",
            "GET  /api/readiness-score",
            "GET  /api/job-matches",
            "POST /api/progress",
        ],
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
