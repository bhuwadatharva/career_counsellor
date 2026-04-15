from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    phase_id = Column(Integer, ForeignKey("phases.id", ondelete="CASCADE"))

    name = Column(String(150))
    status = Column(String(50), default="pending")  # pending, completed