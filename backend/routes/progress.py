"""Progress update router — mock endpoint with Firebase integration."""

from fastapi import APIRouter
from models.schemas import ProgressUpdateRequest, ProgressUpdateResponse
from core.firebase import get_db
from firebase_admin import firestore

router = APIRouter(tags=["Progress"])

@router.post("/api/progress", response_model=ProgressUpdateResponse)
async def update_progress(request: ProgressUpdateRequest):
    """Update user progress for a learning module and save to Firestore."""
    
    db = get_db()
    if db is not None:
        try:
            # We would normally update the specific module inside the learning path array
            # For simplicity in this mock, we just record a progress event
            doc_ref = db.collection("progressTracking").document(request.userId).collection("events").document()
            doc_ref.set({
                "moduleId": request.moduleId,
                "progress": request.progress,
                "timestamp": firestore.SERVER_TIMESTAMP
            })
            
            # Update the main progress record timestamp
            db.collection("progressTracking").document(request.userId).set({
                "lastActive": firestore.SERVER_TIMESTAMP
            }, merge=True)
            
        except Exception as e:
            print(f"Firebase save error: {e}")
            return ProgressUpdateResponse(success=False)

    return ProgressUpdateResponse(success=True)
