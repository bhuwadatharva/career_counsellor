from unittest.mock import patch


class TestCareerAPI:
    @patch("app.router.career_router.get_ai_career_path")
    def test_generate_career_api_success(self, mock_get_ai, client, test_user, sample_ai_response, sample_questionnaire_payload):
        """Test POST /career/generate/{user_id} generates and saves career."""
        mock_get_ai.return_value = sample_ai_response

        response = client.post(f"/career/generate/{test_user.id}", json=sample_questionnaire_payload)

        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Career path generated successfully"
        assert "career_id" in data
        mock_get_ai.assert_called_once_with(sample_questionnaire_payload)

    @patch("app.router.career_router.get_ai_career_path")
    def test_generate_career_api_ai_failure(self, mock_get_ai, client, test_user, sample_questionnaire_payload):
        """Test POST /career/generate/{user_id} returns 500 when AI fails."""
        mock_get_ai.side_effect = Exception("AI model offline")

        response = client.post(f"/career/generate/{test_user.id}", json=sample_questionnaire_payload)

        assert response.status_code == 500
        assert "AI model offline" in response.json()["detail"]

    @patch("app.router.career_router.get_ai_career_path")
    def test_regenerate_career_api(self, mock_get_ai, client, test_user, sample_ai_response, sample_questionnaire_payload):
        """Test POST /career/regenerate/{user_id} regenerates career."""
        mock_get_ai.return_value = sample_ai_response

        # Generate first
        client.post(f"/career/generate/{test_user.id}", json=sample_questionnaire_payload)

        # Regenerate
        new_response = sample_ai_response.copy()
        new_response["recommended_domain"] = "DevOps Engineer"
        mock_get_ai.return_value = new_response

        response = client.post(f"/career/regenerate/{test_user.id}", json=sample_questionnaire_payload)
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Career path regenerated successfully"
        assert "career_id" in data

    @patch("app.router.career_router.get_ai_career_path")
    def test_get_career_endpoints(self, mock_get_ai, client, test_user, sample_ai_response, sample_questionnaire_payload):
        """Test GET /career/{user_id}, /career/roadmap/{user_id}, and /career/summary/{user_id}."""
        # 404 when no career exists
        assert client.get(f"/career/{test_user.id}").status_code == 404
        assert client.get(f"/career/roadmap/{test_user.id}").status_code == 404
        assert client.get(f"/career/summary/{test_user.id}").status_code == 404

        # Generate career
        mock_get_ai.return_value = sample_ai_response
        client.post(f"/career/generate/{test_user.id}", json=sample_questionnaire_payload)

        # GET /career/{user_id}
        career_resp = client.get(f"/career/{test_user.id}")
        assert career_resp.status_code == 200
        career_data = career_resp.json()
        assert career_data["domain"] == "Full Stack Web Development"
        assert career_data["user_id"] == test_user.id

        # GET /career/roadmap/{user_id}
        roadmap_resp = client.get(f"/career/roadmap/{test_user.id}")
        assert roadmap_resp.status_code == 200
        roadmap_data = roadmap_resp.json()
        assert roadmap_data["domain"] == "Full Stack Web Development"
        assert len(roadmap_data["roadmap"]) == 2

        # GET /career/summary/{user_id}
        summary_resp = client.get(f"/career/summary/{test_user.id}")
        assert summary_resp.status_code == 200
        summary_data = summary_resp.json()
        assert summary_data["domain"] == "Full Stack Web Development"
        assert summary_data["confidence_score"] == 0.92

    @patch("app.router.career_router.get_ai_career_path")
    def test_delete_career_api(self, mock_get_ai, client, test_user, sample_ai_response, sample_questionnaire_payload):
        """Test DELETE /career/{user_id} deletes career."""
        mock_get_ai.return_value = sample_ai_response
        client.post(f"/career/generate/{test_user.id}", json=sample_questionnaire_payload)

        # Delete career
        del_resp = client.delete(f"/career/{test_user.id}")
        assert del_resp.status_code == 200
        assert del_resp.json()["message"] == "Career path deleted successfully"

        # Subsequent delete returns 404
        assert client.delete(f"/career/{test_user.id}").status_code == 404
