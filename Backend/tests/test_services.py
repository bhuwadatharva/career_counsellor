from app.services.career_service import create_career_path
from app.services.phase_service import get_phases_by_user, get_phase_details
from app.services.skill_service import complete_skill, get_skills_by_phase
from app.services.project_service import submit_project, approve_project, get_projects_by_phase
from app.services.progress_servce import calculate_progress, get_user_progress, update_user_progress
from app.services.badge_service import create_and_assign_badge, get_user_badges
from app.services.job_service import compute_confidence, get_user_completed_skills
from app.models.phase import Phase


class TestServicesLifecycle:
    def test_complete_phase_lifecycle_unlocks_next_phase_and_awards_badge(
        self, db_session, test_user, sample_ai_response
    ):
        """
        Verify the complete workflow:
        1. Generate career path (Phase 1 active, Phase 2 locked).
        2. Complete all skills and approve all projects in Phase 1.
        3. Phase 1 automatically becomes completed.
        4. Phase 2 automatically unlocks and becomes active.
        5. User earns a badge for completing Phase 1.
        6. Progress percentage updates to 50%.
        """
        career = create_career_path(db_session, test_user.id, sample_ai_response)
        phases = get_phases_by_user(db_session, test_user.id)
        assert len(phases) == 2
        phase1 = phases[0]
        phase2 = phases[1]

        assert phase1.status == "active"
        assert phase2.status == "locked"

        # Complete all skills in Phase 1
        skills = get_skills_by_phase(db_session, phase1.id)
        for s in skills:
            complete_skill(db_session, s.id)

        # Submit and approve all projects in Phase 1
        projects = get_projects_by_phase(db_session, phase1.id)
        for p in projects:
            submit_project(db_session, p.id, "https://github.com/project")
            approve_project(db_session, p.id)

        # Refresh phase statuses from DB
        db_session.refresh(phase1)
        db_session.refresh(phase2)

        # Phase 1 should now be completed
        assert phase1.status == "completed"
        # Phase 2 should now be unlocked to active
        assert phase2.status == "active"

        # Verify badge awarded
        badges = get_user_badges(db_session, test_user.id)
        assert len(badges) == 1

        # Verify progress calculation
        progress_pct = calculate_progress(db_session, career.id)
        assert progress_pct == 50.0

        user_prog = get_user_progress(db_session, test_user.id, career.id)
        assert user_prog["progress_percentage"] == 50.0

    def test_phase_details_service(self, db_session, test_user, sample_ai_response):
        """Test get_phase_details returns skills, projects, and resources."""
        career = create_career_path(db_session, test_user.id, sample_ai_response)
        phases = get_phases_by_user(db_session, test_user.id)
        
        details = get_phase_details(db_session, phases[0].id)
        assert details is not None
        assert details["phase"]["phase_number"] == 1
        assert len(details["skills"]) == 3
        assert len(details["projects"]) == 2
        assert len(details["resources"]) == 1

    def test_job_service_helpers(self, db_session, test_user, sample_ai_response):
        """Test compute_confidence and get_user_completed_skills."""
        # compute_confidence test
        score = compute_confidence(["python", "fastapi", "sql"], ["Python", "FastAPI", "Docker", "AWS"])
        assert score == 0.5

        # Empty job skills returns 0.0
        assert compute_confidence(["python"], []) == 0.0

        # get_user_completed_skills before completing any skills
        create_career_path(db_session, test_user.id, sample_ai_response)
        skills = get_user_completed_skills(db_session, test_user.id)
        assert skills == []

        # Complete a skill
        phases = get_phases_by_user(db_session, test_user.id)
        phase1_skills = get_skills_by_phase(db_session, phases[0].id)
        complete_skill(db_session, phase1_skills[0].id)

        updated_skills = get_user_completed_skills(db_session, test_user.id)
        assert len(updated_skills) == 1
        assert updated_skills[0] == phase1_skills[0].name.strip().lower()
