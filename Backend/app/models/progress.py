from sqlalchemy import Column, Integer, Float, ForeignKey, TIMESTAMP
from datetime import datetime
from app.database.db import Base

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    career_path_id = Column(Integer, ForeignKey("career_paths.id", ondelete="CASCADE"))

    current_phase = Column(Integer, default=1)
    progress_percentage = Column(Float, default=0)

    last_updated = Column(TIMESTAMP, default=datetime.utcnow)