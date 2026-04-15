from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.progress_servce import (
    get_user_progress,
    update_user_progress
)
from app.services.career_service import get_career_by_user

router = APIRouter(prefix="/progress", tags=["Progress"])


# 📊 GET USER PROGRESS %
@router.get("/{user_id}")
def fetch_progress(user_id: int, db: Session = Depends(get_db)):

    career = get_career_by_user(db, user_id)

    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    progress = get_user_progress(db, user_id, career.id)

    return progress


# 🔄 FORCE UPDATE PROGRESS (optional)
@router.put("/update/{user_id}")
def update_progress(user_id: int, db: Session = Depends(get_db)):

    career = get_career_by_user(db, user_id)

    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    progress = update_user_progress(db, user_id, career.id)

    return {
        "message": "Progress updated",
        "progress_percentage": progress.progress_percentage
    }