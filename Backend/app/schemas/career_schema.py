from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime

# Request (AI JSON input)
class CareerCreate(BaseModel):
    ai_json: Dict[str, Any]

# Response
class CareerResponse(BaseModel):
    id: int
    user_id: int
    domain: str | None
    goal: str | None
    confidence_score: float | None
    summary: str | None
    ai_json: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True