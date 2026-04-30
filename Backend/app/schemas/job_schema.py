from pydantic import BaseModel


# ─── Response: single job with match info ───────────────────────────────────
class JobMatchResult(BaseModel):
    job_id          : int
    company_name    : str
    role            : str
    url             : str | None
    job_skills      : list[str]
    matched_skills  : list[str]
    missing_skills  : list[str]
    confidence      : float        # 0.0 – 1.0
    confidence_pct  : str          # "72.5%"

    class Config:
        from_attributes = True


# ─── Response: full match response for a user ───────────────────────────────
class JobMatchResponse(BaseModel):
    user_id         : int
    total_matches   : int
    jobs            : list[JobMatchResult]