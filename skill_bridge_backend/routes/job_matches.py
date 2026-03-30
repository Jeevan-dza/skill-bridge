"""Job matching router — mock endpoint with Firebase integration."""

from fastapi import APIRouter, Query
from models.schemas import JobMatchesResponse, JobMatch
from core.firebase import get_db
from firebase_admin import firestore

router = APIRouter(tags=["Job Matches"])

MOCK_JOBS = [
    JobMatch(title="Data Analyst Intern", company="FinTechX", score=92, location="Bangalore", type="Internship"),
    JobMatch(title="Junior Data Analyst", company="Accenture", score=88, location="Mumbai", type="Full-time"),
    JobMatch(title="Business Intelligence Analyst", company="Infosys", score=85, location="Hyderabad", type="Full-time"),
]

@router.get("/api/job-matches", response_model=JobMatchesResponse)
async def get_job_matches(
    userId: str = Query(...),
    targetRole: str = Query(...),
):
    """Fetch matched jobs and save metrics to Firestore."""
    response_data = JobMatchesResponse(matches=MOCK_JOBS)
    
    db = get_db()
    if db is not None:
        try:
            doc_ref = db.collection("jobMatches").document(userId)
            jobs_dict = [j.model_dump() for j in MOCK_JOBS]
            doc_ref.set({
                "matches": jobs_dict,
                "targetRole": targetRole,
                "lastRefreshed": firestore.SERVER_TIMESTAMP
            }, merge=True)
        except Exception as e:
            print(f"Firebase save error: {e}")

    return response_data
