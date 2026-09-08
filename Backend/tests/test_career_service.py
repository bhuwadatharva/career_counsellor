import pytest
from app.services.career_service import (
    create_career_path,
    get_career_by_user,
    get_roadmap,
    get_summary,
    delete_career_path,
    regenerate_career_path
)
from app.models.career import CareerPath
from app.models.phase import Phase
from app.models.skill import Skill
from app.models.project import Project


class TestCareerService:
    def test_create_career_path(self, db_session, test_user, sample_ai_response):
        """Test creating a career path and cascading phases, skills, and projects."""
        career = create_career_path(db_session, test_user.id, sample_ai_response)

        assert career.id is not None
        assert career.user_id == test_user.id
        assert career.domain == sample_ai_response["recommended_domain"]
        assert career.goal == sample_ai_response["career_goal"]
        assert career.confidence_score == sample_ai_response["confidence_score"]
        assert career.summary == sample_ai_response["summary"]

        # Verify phases created
        phases = db_session.query(Phase).filter_by(career_path_id=career.id).order_by(Phase.phase_number).all()
        assert len(phases) == 2

        # First phase must be active, second locked
        assert phases[0].phase_number == 1
        assert phases[0].status == "active"
        assert phases[1].phase_number == 2
        assert phases[1].status == "locked"

        # Verify skills created for phase 1
        phase1_skills = db_session.query(Skill).filter_by(phase_id=phases[0].id).all()
        assert len(phase1_skills) == 3
        assert {s.name for s in phase1_skills} == {"HTML5", "CSS3", "Modern JavaScript"}
        assert all(s.status == "pending" for s in phase1_skills)

        # Verify projects created for phase 1
        phase1_projects = db_session.query(Project).filter_by(phase_id=phases[0].id).all()
        assert len(phase1_projects) == 2
        assert {p.title for p in phase1_projects} == {"Portfolio Website", "Interactive Dashboard"}
        assert all(p.status == "not_started" for p in phase1_projects)

    def test_create_career_path_idempotent(self, db_session, test_user, sample_ai_response):
        """Test create_career_path returns existing record if already created for the user."""
        career1 = create_career_path(db_session, test_user.id, sample_ai_response)
        career2 = create_career_path(db_session, test_user.id, sample_ai_response)

        assert career1.id == career2.id
        # Confirm no duplicate phases created
        phases = db_session.query(Phase).filter_by(career_path_id=career1.id).all()
        assert len(phases) == 2

    def test_get_career_by_user(self, db_session, test_user, sample_ai_response):
        """Test retrieving career path by user ID."""
        assert get_career_by_user(db_session, test_user.id) is None

        created = create_career_path(db_session, test_user.id, sample_ai_response)
        fetched = get_career_by_user(db_session, test_user.id)

        assert fetched is not None
        assert fetched.id == created.id
        assert fetched.domain == "Full Stack Web Development"

    def test_get_roadmap(self, db_session, test_user, sample_ai_response):
        """Test get_roadmap format and milestones."""
        assert get_roadmap(db_session, test_user.id) is None

        create_career_path(db_session, test_user.id, sample_ai_response)
        roadmap = get_roadmap(db_session, test_user.id)

        assert roadmap is not None
        assert roadmap["domain"] == "Full Stack Web Development"
        assert roadmap["goal"] == "Become a Full Stack Developer"
        assert len(roadmap["roadmap"]) == 2
        assert roadmap["roadmap"][0]["phase"] == 1

    def test_get_summary(self, db_session, test_user, sample_ai_response):
        """Test get_summary lightweight endpoint."""
        assert get_summary(db_session, test_user.id) is None

        create_career_path(db_session, test_user.id, sample_ai_response)
        summary = get_summary(db_session, test_user.id)

        assert summary is not None
        assert summary["domain"] == "Full Stack Web Development"
        assert summary["confidence_score"] == 0.92
        assert "Great match" in summary["summary"]

    def test_delete_career_path(self, db_session, test_user, sample_ai_response):
        """Test deleting career path successfully deletes record."""
        # Non-existent returns False
        assert delete_career_path(db_session, 9999) is False

        career = create_career_path(db_session, test_user.id, sample_ai_response)
        career_id = career.id

        result = delete_career_path(db_session, test_user.id)
        assert result is True

        # Verify career is deleted from DB
        assert db_session.query(CareerPath).filter_by(id=career_id).first() is None

    def test_regenerate_career_path(self, db_session, test_user, sample_ai_response):
        """Test regenerating career path replaces previous career data."""
        career1 = create_career_path(db_session, test_user.id, sample_ai_response)
        old_id = career1.id

        new_ai_response = sample_ai_response.copy()
        new_ai_response["recommended_domain"] = "AI / ML Engineer"
        new_ai_response["career_goal"] = "Become an AI Engineer"

        career2 = regenerate_career_path(db_session, test_user.id, new_ai_response)

        assert career2.domain == "AI / ML Engineer"
        assert career2.goal == "Become an AI Engineer"

        # Confirm user has only 1 updated career record in DB
        careers = db_session.query(CareerPath).filter_by(user_id=test_user.id).all()
        assert len(careers) == 1
        assert careers[0].domain == "AI / ML Engineer"
