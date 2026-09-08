import pytest
from pydantic import ValidationError
from app.schemas.ai_schema import AIResponseSchema, Milestone, Resource
from app.schemas.user_schema import UserCreate


class TestSchemas:
    def test_valid_ai_response_schema(self, sample_ai_response):
        """Test AIResponseSchema parses and validates valid dictionary."""
        validated = AIResponseSchema(**sample_ai_response)
        assert validated.recommended_domain == "Full Stack Web Development"
        assert validated.confidence_score == 0.92
        assert len(validated.monthly_milestones) == 2
        assert validated.monthly_milestones[0].phase == 1
        assert len(validated.monthly_milestones[0].resources) == 1

    def test_invalid_ai_response_schema_missing_field(self):
        """Test AIResponseSchema raises ValidationError when required field is missing."""
        invalid_data = {
            "recommended_domain": "Backend Dev",
            # missing career_goal, confidence_score, etc.
        }
        with pytest.raises(ValidationError):
            AIResponseSchema(**invalid_data)

    def test_valid_user_create_schema(self):
        """Test UserCreate schema validation."""
        valid_user = UserCreate(
            name="Alice",
            email="alice@example.com",
            password="securepassword"
        )
        assert valid_user.name == "Alice"
        assert valid_user.email == "alice@example.com"

    def test_invalid_user_create_schema(self):
        """Test UserCreate schema fails on invalid email format."""
        with pytest.raises(ValidationError):
            UserCreate(
                name="Alice",
                email="not-an-email",
                password="password"
            )
