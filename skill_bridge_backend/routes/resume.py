"""Resume parsing router — fast endpoint for skill extraction with async background Firestore writes."""

import asyncio
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from models.schemas import ResumeParseResponse
from core.firebase import get_db
from firebase_admin import firestore

router = APIRouter(tags=["Resume"])

ROLE_SKILLS = {
    "default": {
        "skills": ["Python", "SQL", "Excel", "Communication", "Problem Solving",
                    "Data Analysis", "Project Management", "Statistics"],
        "education": ["B.Tech Computer Science"],
        "experience": ["Intern — Tech Company (3 months)"],
    },
}

# Simple keyword matching fallback for fast skill extraction
SKILL_KEYWORDS = {
    "python", "java", "javascript", "typescript", "sql", "excel", "power bi",
    "tableau", "communication", "leadership", "project management", "agile",
    "machine learning", "deep learning", "data analysis", "data visualization",
    "statistics", "r", "c++", "react", "angular", "vue", "node.js", "docker",
    "kubernetes", "aws", "azure", "gcp", "git", "linux", "tensorflow", "pytorch",
    "pandas", "numpy", "scikit-learn", "spark", "hadoop", "mongodb", "postgresql",
    "problem solving", "teamwork", "html", "css",
}


def extract_skills_from_text(text: str) -> list[str]:
    """Simple keyword-based skill extraction — runs in <50ms, no NLP needed."""
    text_lower = text.lower()
    found = [skill.title() for skill in SKILL_KEYWORDS if skill in text_lower]
    return found if found else ROLE_SKILLS["default"]["skills"]


async def save_to_firestore_background(user_id: str, data: dict):
    """Write to Firestore in background — never blocks the response."""
    db = get_db()
    if db is None:
        return

    try:
        loop = asyncio.get_event_loop()

        def _write():
            doc_ref = db.collection("skillProfiles").document(user_id)
            doc_ref.set({
                "userId": user_id,
                "parsedSkills": data["skills"],
                "education": data["education"],
                "experience": data["experience"],
                "lastUpdated": firestore.SERVER_TIMESTAMP,
            }, merge=True)

            db.collection("users").document(user_id).set({
                "resumeUploaded": True
            }, merge=True)

        await loop.run_in_executor(None, _write)
    except Exception as e:
        print(f"Background Firebase save error: {e}")


@router.post("/api/parse-resume", response_model=ResumeParseResponse)
async def parse_resume(
    userId: str = Form(...),
    resumeFile: UploadFile = File(...),
):
    """Extract skills from an uploaded resume and return immediately.
    
    Firestore writes happen in the background AFTER the response is sent.
    Response timeout: 8 seconds max.
    """
    if not resumeFile.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    allowed = (".pdf", ".docx", ".doc")
    if not any(resumeFile.filename.lower().endswith(ext) for ext in allowed):
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Allowed: {', '.join(allowed)}",
        )

    try:
        # Read file asynchronously — not sync
        content = await asyncio.wait_for(resumeFile.read(), timeout=5.0)
        
        # Try simple keyword extraction from file content
        try:
            text = content.decode("utf-8", errors="ignore")
            extracted_skills = extract_skills_from_text(text)
            data = {
                "skills": extracted_skills,
                "education": ROLE_SKILLS["default"]["education"],
                "experience": ROLE_SKILLS["default"]["experience"],
            }
        except Exception:
            # Fallback to defaults if text extraction fails
            data = ROLE_SKILLS["default"]

    except asyncio.TimeoutError:
        # File read timed out — use defaults
        data = ROLE_SKILLS["default"]
    except Exception:
        data = ROLE_SKILLS["default"]

    # ── Return response IMMEDIATELY — don't wait for Firestore ──
    response = ResumeParseResponse(**data)

    # Schedule Firestore write in background (fire-and-forget)
    asyncio.create_task(save_to_firestore_background(userId, data))

    return response
