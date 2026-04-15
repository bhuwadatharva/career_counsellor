from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.skill import Skill
from app.models.phase import Phase
from app.models.career import CareerPath

from app.services.progress_servce import (
    check_and_complete_phase,
    update_user_progress
)


# 📄 GET SKILLS BY PHASE
def get_skills_by_phase(db: Session, phase_id: int):

    return db.query(Skill).filter_by(phase_id=phase_id).all()


# ✅ COMPLETE SKILL
def complete_skill(db: Session, skill_id: int):

    try:
        skill = db.query(Skill).filter_by(id=skill_id).first()

        if not skill:
            return None

        # already completed
        if skill.status == "completed":
            return skill

        skill.status = "completed"
        db.commit()

        # 🔥 check phase completion
        check_and_complete_phase(db, skill.phase_id)

        # 🔥 update progress
        phase = db.query(Phase).filter_by(id=skill.phase_id).first()
        career_id = phase.career_path_id

        # ⚠️ assuming single user per career
        career = db.query(CareerPath).filter_by(id=career_id).first()
        user_id = career.user_id

        update_user_progress(db, user_id, career_id)

        return skill

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Skill completion error: {str(e)}")