from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.project_service import (
    get_projects_by_phase,
    submit_project,
    approve_project
)

router = APIRouter(prefix="/projects", tags=["Projects"])


# 📄 GET PROJECTS OF A PHASE
@router.get("/phase/{phase_id}")
def fetch_projects(phase_id: int, db: Session = Depends(get_db)):

    projects = get_projects_by_phase(db, phase_id)

    if not projects:
        raise HTTPException(status_code=404, detail="No projects found")

    return [
        {
            "id": p.id,
            "title": p.title,
            "status": p.status,
            "submission_link": p.submission_link
        }
        for p in projects
    ]


# 🚀 SUBMIT PROJECT
@router.put("/submit/{project_id}")
def submit(project_id: int, link: str, db: Session = Depends(get_db)):

    project = submit_project(db, project_id, link)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return {
        "message": "Project submitted successfully",
        "project_id": project.id,
        "status": project.status
    }


# ✅ APPROVE PROJECT
@router.put("/approve/{project_id}")
def approve(project_id: int, db: Session = Depends(get_db)):

    project = approve_project(db, project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return {
        "message": "Project approved",
        "project_id": project.id,
        "status": project.status
    }