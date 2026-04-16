from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.badge_service import get_user_badges
from app.models.badge import Badge

router = APIRouter(prefix="/badges", tags=["Badges"])


# 📄 GET USER BADGES
@router.get("/{user_id}")
def fetch_badges(user_id: int, db: Session = Depends(get_db)):

    badges = get_user_badges(db, user_id)
    
    results = []
    for b in badges:
        badge_info = db.query(Badge).filter_by(id=b.badge_id).first()
        if badge_info:
            results.append({
                "badge_id": badge_info.id,
                "name": badge_info.name,
                "description": badge_info.description,
                "earned_at": b.earned_at
            })

    return results