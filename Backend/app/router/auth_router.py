from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db

from app.services import user_service
from app.schemas.user_schema import UserCreate

router = APIRouter(prefix="/auth", tags=["Auth"])


# ✅ REGISTER
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        new_user = user_service.create_user(
            db,
            name=user.name,
            email=user.email,
            password=user.password
        )
        return {
            "message": "User registered successfully",
            "user_id": new_user.id
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ✅ LOGIN
@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = user_service.authenticate_user(db, email, password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user_id": user.id
    }


# ✅ CHECK FIRST TIME USER (for questionnaire popup)
@router.get("/is-first-time/{user_id}")
def is_first_time(user_id: int, db: Session = Depends(get_db)):
    is_first = user_service.is_first_time_user(db, user_id)

    return {
        "user_id": user_id,
        "is_first_time": is_first
    }


# ✅ GET USER PROFILE
@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = user_service.get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


# ✅ UPDATE USER PROFILE
@router.put("/update/{user_id}")
def update_profile(user_id: int, name: str, db: Session = Depends(get_db)):
    try:
        user = user_service.update_user_profile(db, user_id, name)
        return {
            "message": "Profile updated",
            "user": user
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ✅ CHANGE PASSWORD
@router.put("/change-password/{user_id}")
def change_password(
    user_id: int,
    old_password: str,
    new_password: str,
    db: Session = Depends(get_db)
):
    try:
        user_service.change_password(db, user_id, old_password, new_password)
        return {"message": "Password updated successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ✅ DELETE USER
@router.delete("/delete/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    try:
        user_service.delete_user(db, user_id)
        return {"message": "User deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ✅ USER DASHBOARD (important for frontend)
@router.get("/dashboard/{user_id}")
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    try:
        data = user_service.get_user_dashboard(db, user_id)

        return {
            "user": data["user"],
            "career": data["career"],
            "is_first_time": data["is_first_time"]
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))