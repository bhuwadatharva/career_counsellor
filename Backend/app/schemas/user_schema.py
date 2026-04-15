from pydantic import BaseModel, EmailStr
from datetime import datetime

# Request
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# Response
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True