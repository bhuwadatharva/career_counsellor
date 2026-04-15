from pydantic import BaseModel

class SkillBase(BaseModel):
    name: str

class SkillResponse(SkillBase):
    id: int
    phase_id: int
    status: str

    class Config:
        from_attributes = True