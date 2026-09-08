from sqlalchemy.orm import Session

from app.models.user import User
from app.models.career import CareerPath
from typing import Optional

import hashlib
import bcrypt


def hash_password(password: str) -> str:
    # Hash with sha256 (64 hex characters < 72 bytes limit) then bcrypt
    sha_hash = hashlib.sha256(password.encode()).hexdigest().encode("utf-8")
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(sha_hash, salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        sha_hash = hashlib.sha256(plain_password.encode()).hexdigest().encode("utf-8")
        return bcrypt.checkpw(sha_hash, hashed_password.encode("utf-8"))
    except Exception:
        return False


# 👤 ---------------- USER CREATION ---------------- #

def create_user(db: Session, name: str, email: str, password: str) -> User:
    
    # check if user exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise ValueError("User already exists")

    hashed_password = hash_password(password)

    user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


# 🔑 ---------------- LOGIN ---------------- #

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user


# 🧠 ---------------- FIRST TIME CHECK ---------------- #

def is_first_time_user(db: Session, user_id: int) -> bool:
    
    career = db.query(CareerPath).filter(
        CareerPath.user_id == user_id
    ).first()

    return career is None


# 📄 ---------------- GET USER PROFILE ---------------- #

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


# 🔄 ---------------- UPDATE PROFILE ---------------- #

def update_user_profile(db: Session, user_id: int, name: Optional[str] = None):
    
    user = get_user_by_id(db, user_id)

    if not user:
        raise ValueError("User not found")

    if name:
        user.name = name

    db.commit()
    db.refresh(user)

    return user


# 🔐 ---------------- CHANGE PASSWORD ---------------- #

def change_password(db: Session, user_id: int, old_password: str, new_password: str):

    user = get_user_by_id(db, user_id)

    if not user:
        raise ValueError("User not found")

    if not verify_password(old_password, user.password):
        raise ValueError("Incorrect old password")

    user.password = hash_password(new_password)

    db.commit()

    return True


# 🧹 ---------------- DELETE USER ---------------- #

def delete_user(db: Session, user_id: int):

    user = get_user_by_id(db, user_id)

    if not user:
        raise ValueError("User not found")

    db.delete(user)
    db.commit()

    return True


# 📊 ---------------- USER DASHBOARD DATA ---------------- #

def get_user_dashboard(db: Session, user_id: int):
    
    user = get_user_by_id(db, user_id)

    if not user:
        raise ValueError("User not found")

    career = db.query(CareerPath).filter(
        CareerPath.user_id == user_id
    ).first()

    return {
        "user": user,
        "career": career,
        "is_first_time": career is None
    }