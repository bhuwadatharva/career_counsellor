from app.services.career_service import create_career_path
from app.models.badge import Badge, UserBadge
from app.models.job import Job
from unittest.mock import patch


class TestProgressBadgeJobAPI:
    def test_progress_endpoints(self, client, db_session, test_user, sample_ai_response):
        """Test GET and PUT /progress/{user_id}."""
        # 404 before career exists
        assert client.get(f"/progress/{test_user.id}").status_code == 404

        create_career_path(db_session, test_user.id, sample_ai_response)

        # GET progress
        prog_resp = client.get(f"/progress/{test_user.id}")
        assert prog_resp.status_code == 200
        prog_data = prog_resp.json()
        assert "progress_percentage" in prog_data

        # PUT force update progress
        update_resp = client.put(f"/progress/update/{test_user.id}")
        assert update_resp.status_code == 200
        assert update_resp.json()["message"] == "Progress updated"

    def test_badge_endpoints(self, client, db_session, test_user):
        """Test GET /badges/{user_id}."""
        # Initially empty list
        resp = client.get(f"/badges/{test_user.id}")
        assert resp.status_code == 200
        assert resp.json() == []

        # Add a badge to user
        badge = Badge(name="Quick Starter", description="Completed first skill")
        db_session.add(badge)
        db_session.commit()
        db_session.refresh(badge)

        user_badge = UserBadge(user_id=test_user.id, badge_id=badge.id)
        db_session.add(user_badge)
        db_session.commit()

        # Fetch badges
        resp_after = client.get(f"/badges/{test_user.id}")
        assert resp_after.status_code == 200
        badges = resp_after.json()
        assert len(badges) == 1
        assert badges[0]["name"] == "Quick Starter"

    def test_job_match_endpoints(self, client, db_session, test_user, sample_ai_response):
        """Test GET /jobs/match/{user_id}."""
        # 404 when no matching jobs
        assert client.get(f"/jobs/match/{test_user.id}").status_code == 404

        create_career_path(db_session, test_user.id, sample_ai_response)
        
        # Complete skills
        phases = client.get(f"/phases/{test_user.id}").json()
        skills = client.get(f"/skills/phase/{phases[0]['id']}").json()
        for s in skills:
            client.put(f"/skills/complete/{s['id']}")

        # Mock job_service return for DB backend compatibility
        mock_jobs = [
            {
                "job_id": 1,
                "company_name": "Tech Corp",
                "role": "Frontend Developer",
                "url": "https://example.com/job/1",
                "job_skills": ["html5", "css3", "javascript"],
                "matched_skills": ["html5", "css3"],
                "missing_skills": ["javascript"],
                "confidence": 0.6667,
                "confidence_pct": "66.7%",
            }
        ]
        with patch("app.router.job_router.get_matched_jobs", return_value=mock_jobs):
            match_resp = client.get(f"/jobs/match/{test_user.id}?min_confidence=0.0")
            assert match_resp.status_code == 200
            data = match_resp.json()
            assert data["total_matches"] == 1
            assert data["jobs"][0]["role"] == "Frontend Developer"
