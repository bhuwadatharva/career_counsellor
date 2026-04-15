from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.ai_service import get_ai_career_path
from app.services.career_service import (
    create_career_path,
    get_career_by_user,
    get_roadmap,
    get_summary,
    delete_career_path,
    regenerate_career_path
)

router = APIRouter(prefix="/career", tags=["Career"])


# 🚀 GENERATE CAREER (MAIN API)
@router.post("/generate/{user_id}")
def generate_career(user_id: int, payload: dict, db: Session = Depends(get_db)):
    try:
        # 🤖 Step 1: Call AI service
        ai_json = get_ai_career_path(payload)

        # 💾 Step 2: Store in DB
        career = create_career_path(db, user_id, ai_json)

        return {
            "message": "Career path generated successfully",
            "career_id": career.id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔄 REGENERATE CAREER (optional but powerful)
@router.post("/regenerate/{user_id}")
def regenerate_career(user_id: int, payload: dict, db: Session = Depends(get_db)):
    try:
        ai_json = get_ai_career_path(payload)

        career = regenerate_career_path(db, user_id, ai_json)

        return {
            "message": "Career path regenerated successfully",
            "career_id": career.id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 📄 GET FULL CAREER DATA
@router.get("/{user_id}")
def get_career(user_id: int, db: Session = Depends(get_db)):

    career = get_career_by_user(db, user_id)

    if not career:
        raise HTTPException(status_code=404, detail="Career path not found")

    return career


# 🗺️ GET ROADMAP (FOR FRONTEND UI)
@router.get("/roadmap/{user_id}")
def fetch_roadmap(user_id: int, db: Session = Depends(get_db)):

    roadmap = get_roadmap(db, user_id)

    if not roadmap:
        raise HTTPException(status_code=404, detail="Career path not found")

    return roadmap


# 📊 GET SUMMARY (LIGHTWEIGHT API)
@router.get("/summary/{user_id}")
def fetch_summary(user_id: int, db: Session = Depends(get_db)):

    summary = get_summary(db, user_id)

    if not summary:
        raise HTTPException(status_code=404, detail="Career path not found")

    return summary


# 🧹 DELETE CAREER
@router.delete("/{user_id}")
def delete_career(user_id: int, db: Session = Depends(get_db)):

    success = delete_career_path(db, user_id)

    if not success:
        raise HTTPException(status_code=404, detail="Career path not found")

    return {
        "message": "Career path deleted successfully"
    }