from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.phase import Phase
from app.models.skill import Skill
from app.models.project import Project
from app.models.progress import UserProgress
from app.services.badge_service import create_and_assign_badge


# ✅ CHECK & COMPLETE PHASE
def check_and_complete_phase(db: Session, phase_id: int):

    phase = db.query(Phase).filter_by(id=phase_id).first()
    if not phase:
        return

    projects = db.query(Project).filter_by(phase_id=phase_id).all()

    all_approved = all(p.status == "approved" for p in projects)

    if all_approved and phase.status != "completed":
        phase.status = "completed"
        db.commit()

        # 🔥 auto-create badge and assign to user
        create_and_assign_badge(db, phase_id)


# 🔓 UNLOCK NEXT PHASE
def unlock_next_phase(db: Session, current_phase: Phase):

    try:
        next_phase = db.query(Phase).filter_by(
            career_path_id=current_phase.career_path_id,
            phase_number=current_phase.phase_number + 1
        ).first()

        if next_phase and next_phase.status == "locked":
            next_phase.status = "active"
            db.commit()

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Unlock phase error: {str(e)}")


# 📊 CALCULATE PROGRESS %
def calculate_progress(db: Session, career_id: int):

    phases = db.query(Phase).filter_by(
        career_path_id=career_id
    ).all()

    if not phases:
        return 0

    total = len(phases)
    completed = sum(1 for p in phases if p.status == "completed")

    return (completed / total) * 100


# 🔄 UPDATE USER PROGRESS TABLE
def update_user_progress(db: Session, user_id: int, career_id: int):

    try:
        progress_value = calculate_progress(db, career_id)

        progress = db.query(UserProgress).filter_by(
            user_id=user_id,
            career_path_id=career_id
        ).first()

        if not progress:
            progress = UserProgress(
                user_id=user_id,
                career_path_id=career_id,
                progress_percentage=progress_value
            )
            db.add(progress)
        else:
            progress.progress_percentage = progress_value

        db.commit()

        return progress

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Progress update error: {str(e)}")


# 📄 GET USER PROGRESS
def get_user_progress(db: Session, user_id: int, career_id: int):

    progress = db.query(UserProgress).filter_by(
        user_id=user_id,
        career_path_id=career_id
    ).first()

    if not progress:
        return {
            "progress_percentage": 0
        }

    return {
        "progress_percentage": progress.progress_percentage
    }