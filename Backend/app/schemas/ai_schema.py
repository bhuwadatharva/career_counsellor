from pydantic import BaseModel
from typing import List

class Resource(BaseModel):
    title: str
    url: str
    estimated_hours: int
    difficulty: str

class Milestone(BaseModel):
    phase: int
    title: str
    skills_to_gain: List[str]
    projects: List[str]
    resources: List[Resource]

class AIResponseSchema(BaseModel):
    recommended_domain: str
    career_goal: str
    confidence_score: float
    summary: str
    monthly_milestones: List[Milestone]