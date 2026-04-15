from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from datetime import datetime
from app.database.db import Base

class DSAProgress(Base):
    __tablename__ = "dsa_progress"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    question_id = Column(String(100))
    platform = Column(String(50))  # leetcode, gfg

    status = Column(String(50), default="unsolved")  # solved, unsolved
    solved_at = Column(TIMESTAMP, nullable=True)