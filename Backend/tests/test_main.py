class TestMain:
    def test_root_endpoint(self, client):
        """Test root endpoint returns 200 and running status."""
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "AI Career Counsellor API Running"}
