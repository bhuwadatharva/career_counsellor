from pydantic import BaseModel
from datetime import datetime

class ProgressCreate(BaseModel):
    user_id: int
    career_path_id: int

class ProgressResponse(BaseModel):
    id: int
    user_id: int
    career_path_id: int
    current_phase: int
    progress_percentage: float
    last_updated: datetime

    class Config:
        from_attributes = True