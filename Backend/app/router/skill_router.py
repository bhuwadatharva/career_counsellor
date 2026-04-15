from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.skill_service import (
    complete_skill,
    get_skills_by_phase
)

router = APIRouter(prefix="/skills", tags=["Skills"])


# 📄 GET SKILLS OF A PHASE
@router.get("/phase/{phase_id}")
def fetch_skills(phase_id: int, db: Session = Depends(get_db)):

    skills = get_skills_by_phase(db, phase_id)

    if not skills:
        raise HTTPException(status_code=404, detail="No skills found")

    return [
        {
            "id": s.id,
            "name": s.name,
            "status": s.status
        }
        for s in skills
    ]


# ✅ COMPLETE SKILL
@router.put("/complete/{skill_id}")
def complete(skill_id: int, db: Session = Depends(get_db)):

    skill = complete_skill(db, skill_id)

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    return {
        "message": "Skill completed successfully",
        "skill_id": skill.id,
        "status": skill.status
    }