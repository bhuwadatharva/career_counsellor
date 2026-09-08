from app.services.career_service import create_career_path


class TestPhaseSkillProjectAPI:
    def test_phase_endpoints(self, client, db_session, test_user, sample_ai_response):
        """Test GET /phases/{user_id} and GET /phases/details/{phase_id}."""
        # 404 before career created
        assert client.get(f"/phases/{test_user.id}").status_code == 404

        # Create career path
        career = create_career_path(db_session, test_user.id, sample_ai_response)

        # GET /phases/{user_id}
        phases_resp = client.get(f"/phases/{test_user.id}")
        assert phases_resp.status_code == 200
        phases = phases_resp.json()
        assert len(phases) == 2
        assert phases[0]["phase_number"] == 1
        assert phases[0]["status"] == "active"
        assert phases[1]["phase_number"] == 2
        assert phases[1]["status"] == "locked"

        # GET /phases/details/{phase_id}
        phase1_id = phases[0]["id"]
        detail_resp = client.get(f"/phases/details/{phase1_id}")
        assert detail_resp.status_code == 200
        detail = detail_resp.json()
        assert detail["phase"]["id"] == phase1_id
        assert len(detail["skills"]) == 3
        assert len(detail["projects"]) == 2
        assert len(detail["resources"]) == 1
        assert detail["resources"][0]["title"] == "JavaScript Masterclass"

        # 404 for invalid phase ID
        assert client.get("/phases/details/99999").status_code == 404

    def test_skill_endpoints(self, client, db_session, test_user, sample_ai_response):
        """Test GET /skills/phase/{phase_id} and PUT /skills/complete/{skill_id}."""
        create_career_path(db_session, test_user.id, sample_ai_response)

        phases = client.get(f"/phases/{test_user.id}").json()
        phase1_id = phases[0]["id"]

        # GET skills
        skills_resp = client.get(f"/skills/phase/{phase1_id}")
        assert skills_resp.status_code == 200
        skills = skills_resp.json()
        assert len(skills) == 3
        assert skills[0]["status"] == "pending"

        # PUT complete skill
        skill1_id = skills[0]["id"]
        complete_resp = client.put(f"/skills/complete/{skill1_id}")
        assert complete_resp.status_code == 200
        assert complete_resp.json()["status"] == "completed"

        # 404 for non-existent skill
        assert client.put("/skills/complete/99999").status_code == 404

    def test_project_endpoints(self, client, db_session, test_user, sample_ai_response):
        """Test GET /projects/phase/{phase_id}, submit project, and approve project."""
        create_career_path(db_session, test_user.id, sample_ai_response)

        phases = client.get(f"/phases/{test_user.id}").json()
        phase1_id = phases[0]["id"]

        # GET projects
        proj_resp = client.get(f"/projects/phase/{phase1_id}")
        assert proj_resp.status_code == 200
        projects = proj_resp.json()
        assert len(projects) == 2
        assert projects[0]["status"] == "not_started"

        proj1_id = projects[0]["id"]

        # Submit project
        submit_resp = client.put(f"/projects/submit/{proj1_id}?link=https://github.com/test/portfolio")
        assert submit_resp.status_code == 200
        assert submit_resp.json()["status"] == "submitted"

        # Approve project
        approve_resp = client.put(f"/projects/approve/{proj1_id}")
        assert approve_resp.status_code == 200
        assert approve_resp.json()["status"] == "approved"

        # 404 for non-existent project
        assert client.put("/projects/submit/99999?link=https://example.com").status_code == 404
        assert client.put("/projects/approve/99999").status_code == 404
