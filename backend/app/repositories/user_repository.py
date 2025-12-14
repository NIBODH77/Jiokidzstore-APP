from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional, List
from app.models.user import User, Child

class UserRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_by_phone(self, phone: str) -> Optional[User]:
        return self.db.query(User).filter(User.phone == phone).first()
    
    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[User]:
        return self.db.query(User).offset(skip).limit(limit).all()
    
    def get_children(self, user_id: int) -> List[Child]:
        return self.db.query(Child).filter(Child.user_id == user_id).all()
    
    def get_child_by_id(self, child_id: int, user_id: int) -> Optional[Child]:
        return self.db.query(Child).filter(
            Child.id == child_id, 
            Child.user_id == user_id
        ).first()
