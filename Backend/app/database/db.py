from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# 🔐 Use ENV variable (recommended)
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:atharvbhuwad@db.weufmyheyhatcfzzztyu.supabase.co:5432/postgres"
)

# 🚀 Engine with SSL + stability configs
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,   # avoids stale connections
    pool_size=5,
    max_overflow=10,
    connect_args={
        "sslmode": "require"   # 🔥 REQUIRED for Supabase
    }
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# 📦 Dependency (FastAPI style)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()