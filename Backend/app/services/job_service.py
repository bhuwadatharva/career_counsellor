from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models.skill import Skill
from app.models.phase import Phase
from app.models.career import CareerPath


# ─────────────────────────────────────────
# HELPER: Get all completed skill names for a user
# ─────────────────────────────────────────
def get_user_completed_skills(db: Session, user_id: int) -> list[str]:
    """
    Walk: user_id → CareerPath → Phase → Skill (completed)
    Returns a list of lowercase skill names.
    """
    careers = db.query(CareerPath).filter_by(user_id=user_id).all()
    career_ids = [c.id for c in careers]

    if not career_ids:
        return []

    phases = db.query(Phase).filter(Phase.career_path_id.in_(career_ids)).all()
    phase_ids = [p.id for p in phases]

    if not phase_ids:
        return []

    skills = (
        db.query(Skill)
        .filter(Skill.phase_id.in_(phase_ids), Skill.status == "completed")
        .all()
    )

    return [s.name.strip().lower() for s in skills]


# ─────────────────────────────────────────
# HELPER: Compute confidence score
# ─────────────────────────────────────────
def compute_confidence(user_skills: list[str], job_skills: list[str]) -> float:
    """
    Confidence = matched skills / total job skills (0.0 → 1.0)
    Uses case-insensitive exact match.
    """
    if not job_skills:
        return 0.0

    job_skills_lower = [s.strip().lower() for s in job_skills]
    user_skill_set = set(user_skills)

    matched = sum(1 for s in job_skills_lower if s in user_skill_set)
    return round(matched / len(job_skills_lower), 4)


# ─────────────────────────────────────────
# MAIN: Match user skills with jobs
# ─────────────────────────────────────────
def get_matched_jobs(
    db: Session,
    user_id: int,
    min_confidence: float = 0.0,   # filter: e.g. 0.3 = at least 30% match
    limit: int = 20,
) -> list[dict]:
    """
    Returns jobs sorted by confidence score (descending).

    Each result:
    {
        "job_id": int,
        "company_name": str,
        "role": str,
        "url": str,
        "job_skills": [...],
        "matched_skills": [...],
        "missing_skills": [...],
        "confidence": float,          # 0.0 – 1.0
        "confidence_pct": str,        # "72.5%"
    }
    """
    user_skills = get_user_completed_skills(db, user_id)

    if not user_skills:
        return []

    # Fetch all jobs from Postgres
    rows = db.execute(text("SELECT id, company_name, role, skills, url FROM jobs")).fetchall()

    results = []

    for row in rows:
        job_id, company_name, role, job_skills, url = row

        # job_skills is a TEXT[] → comes back as a Python list from psycopg2
        if not job_skills:
            continue

        confidence = compute_confidence(user_skills, job_skills)

        if confidence < min_confidence:
            continue

        job_skills_lower = [s.strip().lower() for s in job_skills]
        user_skill_set = set(user_skills)

        matched = [s for s in job_skills_lower if s in user_skill_set]
        missing = [s for s in job_skills_lower if s not in user_skill_set]

        results.append({
            "job_id": job_id,
            "company_name": company_name,
            "role": role,
            "url": url,
            "job_skills": job_skills_lower,
            "matched_skills": matched,
            "missing_skills": missing,
            "confidence": confidence,
            "confidence_pct": f"{confidence * 100:.1f}%",
        })

    # Sort by confidence descending
    results.sort(key=lambda x: x["confidence"], reverse=True)

    return results[:limit]