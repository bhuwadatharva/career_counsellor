import pytest
from unittest.mock import patch, MagicMock
import requests
from app.services.ai_service import get_ai_career_path, get_questions


class TestAIService:
    @patch("app.services.ai_service.requests.post")
    def test_get_ai_career_path_success(self, mock_post, sample_ai_response, sample_questionnaire_payload):
        """Test get_ai_career_path successfully validates and returns parsed AI response."""
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = sample_ai_response
        mock_post.return_value = mock_resp

        result = get_ai_career_path(sample_questionnaire_payload)

        mock_post.assert_called_once_with(
            "http://127.0.0.1:8001/recommend",
            json=sample_questionnaire_payload,
            timeout=30
        )
        assert result["recommended_domain"] == "Full Stack Web Development"
        assert result["career_goal"] == "Become a Full Stack Developer"
        assert result["confidence_score"] == 0.92
        assert len(result["monthly_milestones"]) == 2

    @patch("app.services.ai_service.requests.post")
    def test_get_ai_career_path_invalid_schema(self, mock_post, sample_questionnaire_payload):
        """Test get_ai_career_path raises Exception when external service returns invalid schema."""
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        # Missing required fields like recommended_domain, monthly_milestones
        mock_resp.json.return_value = {"invalid_key": "some_value"}
        mock_post.return_value = mock_resp

        with pytest.raises(Exception) as exc_info:
            get_ai_career_path(sample_questionnaire_payload)
        
        assert "AI Service Error" in str(exc_info.value)

    @patch("app.services.ai_service.requests.post")
    def test_get_ai_career_path_http_error(self, mock_post, sample_questionnaire_payload):
        """Test get_ai_career_path raises Exception when external service returns non-200 status."""
        mock_resp = MagicMock()
        mock_resp.status_code = 500
        mock_resp.text = "Internal Model Error"
        mock_post.return_value = mock_resp

        with pytest.raises(Exception) as exc_info:
            get_ai_career_path(sample_questionnaire_payload)

        assert "AI Error: Internal Model Error" in str(exc_info.value)

    @patch("app.services.ai_service.requests.post")
    def test_get_ai_career_path_connection_timeout(self, mock_post, sample_questionnaire_payload):
        """Test get_ai_career_path handles network timeout gracefully."""
        mock_post.side_effect = requests.exceptions.Timeout("Connection timed out")

        with pytest.raises(Exception) as exc_info:
            get_ai_career_path(sample_questionnaire_payload)

        assert "Connection timed out" in str(exc_info.value)

    @patch("app.services.ai_service.requests.get")
    def test_get_questions_success(self, mock_get):
        """Test get_questions retrieves questionnaire successfully."""
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = [
            {"id": 1, "question": "What is your interest?", "options": ["Web", "AI", "Mobile"]}
        ]
        mock_get.return_value = mock_resp

        questions = get_questions()

        mock_get.assert_called_once_with("http://127.0.0.1:8001/questions", timeout=30)
        assert len(questions) == 1
        assert questions[0]["id"] == 1

    @patch("app.services.ai_service.requests.get")
    def test_get_questions_failure(self, mock_get):
        """Test get_questions raises exception when external service fails."""
        mock_resp = MagicMock()
        mock_resp.status_code = 502
        mock_get.return_value = mock_resp

        with pytest.raises(Exception) as exc_info:
            get_questions()

        assert "Questions API Error" in str(exc_info.value)
