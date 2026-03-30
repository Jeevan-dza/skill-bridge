"""Skill gap analysis router — mock endpoint with Firebase integration."""

from fastapi import APIRouter
from models.schemas import SkillGapRequest, SkillGapResponse
from core.firebase import get_db
from firebase_admin import firestore

router = APIRouter(tags=["Skill Gap"])

ROLE_REQUIREMENTS = {
    "Data Analyst": [
        "Python", "SQL", "Excel", "Power BI", "Tableau",
        "Statistics", "Data Cleaning", "Pandas", "NumPy",
        "Data Visualization", "A/B Testing", "Predictive Modeling",
    ]
}

@router.post("/api/skill-gap", response_model=SkillGapResponse)
async def analyze_skill_gap(request: SkillGapRequest):
    """Compare user skills against target role requirements and save to Firestore."""
    role = request.targetRole
    user_skills_lower = {s.lower() for s in request.userSkills}

    required = ROLE_REQUIREMENTS.get("Data Analyst")
    required_lower = {s.lower(): s for s in required}

    strengths = [required_lower[s] for s in required_lower if s in user_skills_lower]
    gaps = [required_lower[s] for s in required_lower if s not in user_skills_lower]

    response_data = SkillGapResponse(gaps=gaps, strengths=strengths)
    
    # Save to Firestore
    db = get_db()
    if db is not None:
        try:
            doc_ref = db.collection("skillProfiles").document(request.userId)
            doc_ref.set({
                "targetRole": request.targetRole,
                "strengths": response_data.strengths,
                "gaps": response_data.gaps,
                "lastAnalysis": firestore.SERVER_TIMESTAMP
            }, merge=True)
        except Exception as e:
            print(f"Firebase save error: {e}")

    return response_data
