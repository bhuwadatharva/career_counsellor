from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.job_service import get_matched_jobs

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/match/{user_id}")
def match_jobs_for_user(
    user_id: int,
    min_confidence: float = Query(default=0.0, ge=0.0, le=1.0, description="Minimum confidence score (0.0–1.0)"),
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """
    Match jobs to a user based on their completed skills.

    - **user_id**: The user to match for
    - **min_confidence**: Filter out jobs below this score (e.g. 0.3 = 30%)
    - **limit**: Max number of results to return
    """
    matched = get_matched_jobs(db, user_id, min_confidence=min_confidence, limit=limit)

    if not matched:
        raise HTTPException(
            status_code=404,
            detail="No matching jobs found. Complete more skills to unlock matches."
        )

    return {
        "user_id": user_id,
        "total_matches": len(matched),
        "jobs": matched,
    }