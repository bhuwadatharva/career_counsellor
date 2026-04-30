from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from app.database.db import Base


class Job(Base):
    __tablename__ = "jobs"

    id          = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255))
    role        = Column(String(255))
    skills      = Column(ARRAY(String))   # TEXT[] in Postgres
    url         = Column(String)