from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from datetime import datetime
from app.database.db import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    phase_id = Column(Integer, ForeignKey("phases.id", ondelete="CASCADE"))

    title = Column(String(200))
    status = Column(String(50), default="not_started")  # not_started, submitted, approved

    submission_link = Column(String)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)