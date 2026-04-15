from pydantic import BaseModel
from datetime import datetime

class ProjectBase(BaseModel):
    title: str

class ProjectUpdate(BaseModel):
    status: str
    submission_link: str | None = None

class ProjectResponse(ProjectBase):
    id: int
    phase_id: int
    status: str
    submission_link: str | None
    created_at: datetime

    class Config:
        from_attributes = True