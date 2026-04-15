from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.badge_service import get_user_badges

router = APIRouter(prefix="/badges", tags=["Badges"])


# 📄 GET USER BADGES
@router.get("/{user_id}")
def fetch_badges(user_id: int, db: Session = Depends(get_db)):

    badges = get_user_badges(db, user_id)

    return [
        {
            "badge_id": b.badge_id
        }
        for b in badges
    ]