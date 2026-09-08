import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.dialects.postgresql import JSONB, ARRAY
from sqlalchemy.types import ARRAY as SQL_ARRAY
from fastapi.testclient import TestClient

from app.database.db import Base, get_db
import app.models  # Ensure all SQLAlchemy models are registered
from app.main import app
from app.models.user import User

# Handle PostgreSQL JSONB and ARRAY compilation in SQLite test database
@compiles(JSONB, "sqlite")
def compile_jsonb_sqlite(type_, compiler, **kw):
    return "JSON"

@compiles(ARRAY, "sqlite")
@compiles(SQL_ARRAY, "sqlite")
def compile_array_sqlite(type_, compiler, **kw):
    return "JSON"

# SQLite in-memory engine shared across single test thread
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Provides a clean in-memory database session for each test function."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """FastAPI TestClient with overridden get_db dependency."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sample_ai_response():
    """Standard mocked response from AI recommendation service matching AIResponseSchema."""
    return {
        "recommended_domain": "Full Stack Web Development",
        "career_goal": "Become a Full Stack Developer",
        "confidence_score": 0.92,
        "summary": "Great match for full stack development based on strong problem-solving and interest in web technologies.",
        "monthly_milestones": [
            {
                "phase": 1,
                "title": "Frontend Fundamentals",
                "skills_to_gain": ["HTML5", "CSS3", "Modern JavaScript"],
                "projects": ["Portfolio Website", "Interactive Dashboard"],
                "resources": [
                    {
                        "title": "JavaScript Masterclass",
                        "url": "https://example.com/js",
                        "estimated_hours": 20,
                        "difficulty": "Beginner"
                    }
                ]
            },
            {
                "phase": 2,
                "title": "Backend & API Development",
                "skills_to_gain": ["Python", "FastAPI", "SQL"],
                "projects": ["REST API Backend"],
                "resources": [
                    {
                        "title": "FastAPI Crash Course",
                        "url": "https://example.com/fastapi",
                        "estimated_hours": 15,
                        "difficulty": "Intermediate"
                    }
                ]
            }
        ]
    }


@pytest.fixture
def sample_questionnaire_payload():
    """Mock user input payload submitted to career recommendation endpoint."""
    return {
        "interest": "Web Development",
        "experience_level": "Beginner",
        "learning_pace": "Moderate",
        "preferred_languages": ["Python", "JavaScript"],
        "goals": "Build full stack scalable web apps"
    }


@pytest.fixture
def test_user(db_session):
    """Creates and returns a test user in the database."""
    user = User(
        name="Test User",
        email="testuser@example.com",
        password="hashed_secure_password"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user
