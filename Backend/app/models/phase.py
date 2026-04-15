from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base

class Phase(Base):
    __tablename__ = "phases"

    id = Column(Integer, primary_key=True, index=True)
    career_path_id = Column(Integer, ForeignKey("career_paths.id", ondelete="CASCADE"))

    phase_number = Column(Integer)
    title = Column(String(200))

    status = Column(String(50), default="locked")  # locked, active, completed