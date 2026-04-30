from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router import phase_router, progress_router, skill_router, badge_router, project_router
from app.router import auth_router, career_router, job_router

app = FastAPI(title="AI Career Counsellor API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://career-counsellor-2-h3c8.onrender.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(career_router.router)
app.include_router(phase_router.router)
app.include_router(skill_router.router)
app.include_router(progress_router.router)
app.include_router(badge_router.router)
app.include_router(project_router.router)
app.include_router(job_router.router)



@app.get("/")
def root():
    return {"message": "AI Career Counsellor API Running"}