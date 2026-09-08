class TestAuthAPI:
    def test_register_user_success(self, client):
        """Test POST /auth/register creates a new user."""
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "password": "strongpassword123"
        }
        response = client.post("/auth/register", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "User registered successfully"
        assert "user_id" in data

    def test_register_duplicate_email(self, client):
        """Test registering with an existing email returns 400."""
        payload = {
            "name": "Jane Doe",
            "email": "duplicate@example.com",
            "password": "password123"
        }
        resp1 = client.post("/auth/register", json=payload)
        assert resp1.status_code == 200

        resp2 = client.post("/auth/register", json=payload)
        assert resp2.status_code == 400
        assert "already exists" in resp2.json()["detail"]

    def test_login_success_and_failure(self, client):
        """Test POST /auth/login with valid and invalid credentials."""
        # Register user first
        reg_payload = {
            "name": "John Smith",
            "email": "john@example.com",
            "password": "secretpassword"
        }
        client.post("/auth/register", json=reg_payload)

        # Success login (query params as per FastAPI endpoint signature: email, password)
        login_resp = client.post("/auth/login?email=john@example.com&password=secretpassword")
        assert login_resp.status_code == 200
        assert login_resp.json()["message"] == "Login successful"
        assert "user_id" in login_resp.json()

        # Failed login with wrong password
        fail_resp = client.post("/auth/login?email=john@example.com&password=wrongpassword")
        assert fail_resp.status_code == 401
        assert fail_resp.json()["detail"] == "Invalid credentials"

        # Failed login with non-existent email
        not_found_resp = client.post("/auth/login?email=unknown@example.com&password=secretpassword")
        assert not_found_resp.status_code == 401

    def test_user_profile_crud(self, client):
        """Test get profile, update profile, change password, and delete user."""
        # Register user
        reg_payload = {
            "name": "Alice Bob",
            "email": "alice@example.com",
            "password": "initialpassword"
        }
        reg_resp = client.post("/auth/register", json=reg_payload)
        user_id = reg_resp.json()["user_id"]

        # Check first time status (True before career path generated)
        ft_resp = client.get(f"/auth/is-first-time/{user_id}")
        assert ft_resp.status_code == 200
        assert ft_resp.json()["is_first_time"] is True

        # Get profile
        profile_resp = client.get(f"/auth/profile/{user_id}")
        assert profile_resp.status_code == 200
        assert profile_resp.json()["name"] == "Alice Bob"
        assert profile_resp.json()["email"] == "alice@example.com"

        # Update profile name
        update_resp = client.put(f"/auth/update/{user_id}?name=Alice Updated")
        assert update_resp.status_code == 200
        assert update_resp.json()["message"] == "Profile updated"

        # Change password
        pwd_resp = client.put(f"/auth/change-password/{user_id}?old_password=initialpassword&new_password=newsecurepassword")
        assert pwd_resp.status_code == 200
        assert pwd_resp.json()["message"] == "Password updated successfully"

        # Check dashboard
        dash_resp = client.get(f"/auth/dashboard/{user_id}")
        assert dash_resp.status_code == 200
        assert dash_resp.json()["user"]["name"] == "Alice Updated"
        assert dash_resp.json()["is_first_time"] is True

        # Delete user
        del_resp = client.delete(f"/auth/delete/{user_id}")
        assert del_resp.status_code == 200
        assert del_resp.json()["message"] == "User deleted successfully"

        # Verify user is gone
        assert client.get(f"/auth/profile/{user_id}").status_code == 404
