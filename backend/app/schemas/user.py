from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    MOM = "MOM"
    DAD = "DAD"
    GUARDIAN = "GUARDIAN"
    EXPECTING = "EXPECTING"
    TRYING_TO_CONCEIVE = "TRYING_TO_CONCEIVE"

class UserBase(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[str] = None
    name: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    email: Optional[str] = None
    name: Optional[str] = None
    role: Optional[UserRole] = None
    is_expecting: Optional[bool] = None
    due_date: Optional[datetime] = None

class UserResponse(UserBase):
    id: int
    role: Optional[UserRole] = None
    is_expecting: bool = False
    due_date: Optional[datetime] = None
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChildBase(BaseModel):
    name: str
    gender: Optional[str] = None
    date_of_birth: Optional[datetime] = None

class ChildCreate(ChildBase):
    pass

class ChildResponse(ChildBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
