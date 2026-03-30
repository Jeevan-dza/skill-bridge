"""Job readiness score router — mock endpoint with Firebase integration."""

from fastapi import APIRouter, Query
from models.schemas import ReadinessScoreResponse
from core.firebase import get_db
from firebase_admin import firestore

router = APIRouter(tags=["Readiness"])

@router.get("/api/readiness-score", response_model=ReadinessScoreResponse)
async def get_readiness_score(
    userId: str = Query(...),
    targetRole: str = Query(...),
):
    """Calculate job readiness score based on user progress and save to Firestore."""
    score = 72
    feedback = (
        f"Great progress! You're on track for your target role of {targetRole}. "
        "Focus on closing your remaining skill gaps in Tableau and "
        "Predictive Modeling to push past 80%."
    )
    breakdown = {
        "Technical Skills": 75,
        "Soft Skills": 85,
        "Experience": 55,
        "Education": 80,
        "Projects": 60,
    }

    response_data = ReadinessScoreResponse(
        score=score,
        feedback=feedback,
        breakdown=breakdown,
    )

    db = get_db()
    if db is not None:
        try:
            doc_ref = db.collection("progressTracking").document(userId)
            doc_ref.set({
                "readinessScore": score,
                "readinessFeedback": feedback,
                "lastCalculated": firestore.SERVER_TIMESTAMP,
            }, merge=True)
            
            # also create the main user record
            db.collection("users").document(userId).set({
                "jobReadiness": score
            }, merge=True)
        except Exception as e:
            print(f"Firebase save error: {e}")

    return response_data
