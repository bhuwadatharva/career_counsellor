from pydantic import BaseModel
from datetime import datetime

class BadgeResponse(BaseModel):
    id: int
    name: str
    description: str
    phase_id: int

    class Config:
        from_attributes = True


class UserBadgeResponse(BaseModel):
    id: int
    user_id: int
    badge_id: int
    earned_at: datetime

    class Config:
        from_attributes = True