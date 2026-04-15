from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.career import CareerPath
from app.models.phase import Phase
from app.models.skill import Skill
from app.models.project import Project


# 🚀 CREATE CAREER PATH (MAIN ENTRY)
def create_career_path(db: Session, user_id: int, ai_json: dict):

    try:
        # ❗ check if already exists
        existing = db.query(CareerPath).filter(
            CareerPath.user_id == user_id
        ).first()

        if existing:
            return existing

        # ✅ create career
        career = CareerPath(
            user_id=user_id,
            domain=ai_json.get("recommended_domain"),
            goal=ai_json.get("career_goal"),
            confidence_score=ai_json.get("confidence_score"),
            summary=ai_json.get("summary"),
            ai_json=ai_json
        )

        db.add(career)
        db.flush()  # 🔥 important (no commit yet)

        # 🔥 create roadmap
        create_full_roadmap(db, career.id, ai_json)

        db.commit()
        db.refresh(career)

        return career

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"DB Error: {str(e)}")


# 🧠 CREATE FULL ROADMAP (PHASE + SKILL + PROJECT)
def create_full_roadmap(db: Session, career_id: int, ai_json: dict):

    milestones = ai_json.get("monthly_milestones", [])

    for milestone in milestones:

        # ✅ Create Phase
        phase = Phase(
            career_path_id=career_id,
            phase_number=milestone["phase"],
            title=milestone["title"],
            status="active" if milestone["phase"] == 1 else "locked"
        )

        db.add(phase)
        db.flush()  # get phase.id without commit

        # ✅ Insert Skills
        skills = [
            Skill(
                phase_id=phase.id,
                name=skill,
                status="pending"
            )
            for skill in milestone.get("skills_to_gain", [])
        ]

        # ✅ Insert Projects
        projects = [
            Project(
                phase_id=phase.id,
                title=project,
                status="not_started"
            )
            for project in milestone.get("projects", [])
        ]

        db.add_all(skills)
        db.add_all(projects)


# 📄 GET CAREER BY USER
def get_career_by_user(db: Session, user_id: int):

    return db.query(CareerPath).filter(
        CareerPath.user_id == user_id
    ).first()


# 🗺️ GET ROADMAP ONLY
def get_roadmap(db: Session, user_id: int):

    career = get_career_by_user(db, user_id)

    if not career:
        return None

    return {
        "domain": career.domain,
        "goal": career.goal,
        "roadmap": career.ai_json.get("monthly_milestones", [])
    }


# 📊 GET SUMMARY
def get_summary(db: Session, user_id: int):

    career = get_career_by_user(db, user_id)

    if not career:
        return None

    return {
        "domain": career.domain,
        "goal": career.goal,
        "confidence_score": career.confidence_score,
        "summary": career.summary
    }


# 🧹 DELETE CAREER PATH
def delete_career_path(db: Session, user_id: int):

    try:
        career = get_career_by_user(db, user_id)

        if not career:
            return False

        db.delete(career)
        db.commit()

        return True

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Delete Error: {str(e)}")


# 🔄 OPTIONAL: REGENERATE CAREER (VERY USEFUL)
def regenerate_career_path(db: Session, user_id: int, ai_json: dict):

    try:
        # delete old
        existing = get_career_by_user(db, user_id)

        if existing:
            db.delete(existing)
            db.flush()

        # create new
        return create_career_path(db, user_id, ai_json)

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Regenerate Error: {str(e)}")