from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.project import Project
from app.models.phase import Phase
from app.models.career import CareerPath

from app.services.progress_servce import (
    check_and_complete_phase,
    update_user_progress
)


# 📄 GET PROJECTS BY PHASE
def get_projects_by_phase(db: Session, phase_id: int):

    return db.query(Project).filter_by(phase_id=phase_id).all()


# 🚀 SUBMIT PROJECT (USER)
def submit_project(db: Session, project_id: int, link: str):

    try:
        project = db.query(Project).filter_by(id=project_id).first()

        if not project:
            return None

        # already submitted
        if project.status == "submitted":
            return project

        project.status = "submitted"
        project.submission_link = link

        db.commit()

        return project

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Project submission error: {str(e)}")


# ✅ APPROVE PROJECT (ADMIN / AUTO)
def approve_project(db: Session, project_id: int):

    try:
        project = db.query(Project).filter_by(id=project_id).first()

        if not project:
            return None

        project.status = "approved"
        db.commit()

        # 🔥 Phase completion check
        check_and_complete_phase(db, project.phase_id)

        # 🔥 Update progress
        phase = db.query(Phase).filter_by(id=project.phase_id).first()
        career_id = phase.career_path_id

        career = db.query(CareerPath).filter_by(id=career_id).first()
        user_id = career.user_id

        update_user_progress(db, user_id, career_id)

        return project

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Project approval error: {str(e)}")