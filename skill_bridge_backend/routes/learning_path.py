"""Learning path generation router — mock endpoint with Firebase integration."""

from fastapi import APIRouter
from models.schemas import LearningPathRequest, LearningPathResponse, LearningModule
from core.firebase import get_db
from firebase_admin import firestore
import uuid

router = APIRouter(tags=["Learning Path"])

@router.post("/api/learning-path", response_model=LearningPathResponse)
async def generate_learning_path(request: LearningPathRequest):
    """Generate a personalized learning path and save to Firestore."""
    
    # Mock generation logic
    modules = []
    status_flow = ["Completed", "In Progress", "Locked"]
    
    for i, gap in enumerate(request.gaps[:3]):
        status = status_flow[i] if i < len(status_flow) else "Locked"
        progress = 100 if status == "Completed" else (60 if status == "In Progress" else 0)
        
        modules.append(LearningModule(
            title=f"Mastering {gap}",
            status=status,
            progress=progress,
            duration=f"{i+2}h 30m",
            resources=["Video Tutorial", "Interactive Exercise", "Quiz"]
        ))
        
    # Append capstone project
    modules.append(LearningModule(
        title=f"Capstone: {request.targetRole} Project",
        status="Locked",
        progress=0,
        duration="10h",
        resources=["Project Brief", "Dataset", "Rubric"]
    ))

    response_data = LearningPathResponse(modules=modules)
    
    # Save to Firestore
    db = get_db()
    if db is not None:
        try:
            path_id = str(uuid.uuid4())
            doc_ref = db.collection("learningPaths").document(request.userId)
            
            modules_dict = [m.model_dump() for m in response_data.modules]
            
            doc_ref.set({
                "userId": request.userId,
                "targetRole": request.targetRole,
                "pathId": path_id,
                "modules": modules_dict,
                "createdAt": firestore.SERVER_TIMESTAMP,
                "progress": 25 # mock overall progress
            }, merge=True)
        except Exception as e:
            print(f"Firebase save error: {e}")

    return response_data
