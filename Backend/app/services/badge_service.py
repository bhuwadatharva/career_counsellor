from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.badge import Badge, UserBadge
from app.models.phase import Phase
from app.models.career import CareerPath


# 🏆 ASSIGN BADGE AFTER PHASE COMPLETION
def assign_badge(db: Session, phase_id: int):

    try:
        # get phase
        phase = db.query(Phase).filter_by(id=phase_id).first()
        if not phase:
            return None

        # get badge for this phase
        badge = db.query(Badge).filter_by(phase_id=phase_id).first()
        if not badge:
            return None

        # get user
        career = db.query(CareerPath).filter_by(
            id=phase.career_path_id
        ).first()

        user_id = career.user_id

        # check already assigned
        existing = db.query(UserBadge).filter_by(
            user_id=user_id,
            badge_id=badge.id
        ).first()

        if existing:
            return existing

        # assign badge
        user_badge = UserBadge(
            user_id=user_id,
            badge_id=badge.id
        )

        db.add(user_badge)
        db.commit()

        return user_badge

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Badge assignment error: {str(e)}")


# 📄 GET USER BADGES
def get_user_badges(db: Session, user_id: int):

    badges = db.query(UserBadge).filter_by(user_id=user_id).all()

    return badges