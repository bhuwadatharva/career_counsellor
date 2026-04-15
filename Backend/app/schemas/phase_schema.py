from pydantic import BaseModel

class PhaseBase(BaseModel):
    phase_number: int
    title: str

class PhaseResponse(PhaseBase):
    id: int
    career_path_id: int
    status: str

    class Config:
        from_attributes = True