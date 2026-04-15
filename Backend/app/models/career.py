from sqlalchemy import Column, Integer, String, Float, ForeignKey, TIMESTAMP
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime
from app.database.db import Base

class CareerPath(Base):
    __tablename__ = "career_paths"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    domain = Column(String(150))
    goal = Column(String)
    confidence_score = Column(Float)
    summary = Column(String)

    ai_json = Column(JSONB)  # FULL AI RESPONSE

    created_at = Column(TIMESTAMP, default=datetime.utcnow)