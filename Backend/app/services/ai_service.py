import requests
from app.schemas.ai_schema import AIResponseSchema

BASE_URL = "https://career-counsellor-22cy.onrender.com"


# 🧾 GET QUESTIONS (optional - for frontend)
def get_questions():
    try:
        response = requests.get(f"{BASE_URL}/questions", timeout=30)

        if response.status_code != 200:
            raise Exception("Failed to fetch questions")

        return response.json()

    except Exception as e:
        raise Exception(f"Questions API Error: {str(e)}")


# 🤖 GET CAREER RECOMMENDATION (MAIN FUNCTION)
def get_ai_career_path(payload: dict):
    try:
        response = requests.post(
            f"{BASE_URL}/recommend",
            json=payload,
            timeout=30
        )

        if response.status_code != 200:
            raise Exception(f"AI Error: {response.text}")

        ai_data = response.json()

        # ✅ Validate structure (important)
        validated = AIResponseSchema(**ai_data)

        return validated.model_dump()

    except Exception as e:
        raise Exception(f"AI Service Error: {str(e)}")