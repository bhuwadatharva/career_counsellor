from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.phase_service import (
    get_phases_by_user,
    get_phase_details
)

router = APIRouter(prefix="/phases", tags=["Phases"])


# 📄 GET ALL PHASES (ROADMAP PAGE)
@router.get("/{user_id}")
def fetch_phases(user_id: int, db: Session = Depends(get_db)):

    phases = get_phases_by_user(db, user_id)

    if not phases:
        raise HTTPException(status_code=404, detail="No phases found")

    return [
        {
            "id": p.id,
            "phase_number": p.phase_number,
            "title": p.title,
            "status": p.status   # locked / active / completed
        }
        for p in phases
    ]


# 📦 GET PHASE DETAILS (CLICK PHASE)
@router.get("/details/{phase_id}")
def fetch_phase_details(phase_id: int, db: Session = Depends(get_db)):

    data = get_phase_details(db, phase_id)

    if not data:
        raise HTTPException(status_code=404, detail="Phase not found")

    return data