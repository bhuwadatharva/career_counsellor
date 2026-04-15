from sqlalchemy.orm import Session
from app.models.phase import Phase
from app.models.skill import Skill
from app.models.project import Project
from app.models.career import CareerPath


# 📄 GET ALL PHASES (for roadmap page)
def get_phases_by_user(db: Session, user_id: int):

    career = db.query(CareerPath).filter_by(user_id=user_id).first()

    if not career:
        return []

    phases = db.query(Phase).filter_by(
        career_path_id=career.id
    ).order_by(Phase.phase_number).all()

    return phases


# 📦 GET PHASE DETAILS (skills + projects + resources)
def get_phase_details(db: Session, phase_id: int):

    phase = db.query(Phase).filter_by(id=phase_id).first()

    if not phase:
        return None

    # ✅ fetch skills & projects
    skills = db.query(Skill).filter_by(phase_id=phase_id).all()
    projects = db.query(Project).filter_by(phase_id=phase_id).all()

    # 🔥 fetch resources from AI JSON
    career = db.query(CareerPath).filter_by(
        id=phase.career_path_id
    ).first()

    resources = []

    if career and career.ai_json:
        milestones = career.ai_json.get("monthly_milestones", [])

        for m in milestones:
            if m.get("phase") == phase.phase_number:
                resources = m.get("resources", [])
                break

    return {
        "phase": {
            "id": phase.id,
            "phase_number": phase.phase_number,
            "title": phase.title,
            "status": phase.status
        },
        "skills": [
            {
                "id": s.id,
                "name": s.name,
                "status": s.status
            } for s in skills
        ],
        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "status": p.status,
                "submission_link": p.submission_link
            } for p in projects
        ],
        "resources": resources   # 🔥 YouTube videos
    }