from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.badge import Badge, UserBadge
from app.models.phase import Phase
from app.models.career import CareerPath


# 🏆 CREATE BADGE FOR PHASE (if not exists) + ASSIGN TO USER
def create_and_assign_badge(db: Session, phase_id: int):

    try:
        # get phase
        phase = db.query(Phase).filter_by(id=phase_id).first()
        if not phase:
            return None

        # get user via career
        career = db.query(CareerPath).filter_by(id=phase.career_path_id).first()
        if not career:
            return None

        user_id = career.user_id

        # ✅ auto-create badge named after phase title if it doesn't exist
        badge = db.query(Badge).filter_by(phase_id=phase_id).first()
        if not badge:
            badge = Badge(
                name=phase.title,                          # 🔥 phase title as badge name
                description=f"Completed phase: {phase.title}",
                phase_id=phase_id
            )
            db.add(badge)
            db.flush()  # get badge.id without full commit

        # check if already assigned
        existing = db.query(UserBadge).filter_by(
            user_id=user_id,
            badge_id=badge.id
        ).first()

        if existing:
            return existing

        # assign badge to user
        user_badge = UserBadge(
            user_id=user_id,
            badge_id=badge.id
        )

        db.add(user_badge)
        db.commit()

        return user_badge

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Badge creation/assignment error: {str(e)}")


# 📄 GET USER BADGES
def get_user_badges(db: Session, user_id: int):
    return db.query(UserBadge).filter_by(user_id=user_id).all()