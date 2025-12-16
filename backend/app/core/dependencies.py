"""
Common dependencies for FastAPI routes
"""
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import (
    get_current_user,
    get_current_active_user,
    get_current_verified_user,
    get_current_customer,
    get_current_seller,
    get_current_admin
)

__all__ = [
    "get_db",
    "get_current_user",
    "get_current_active_user",
    "get_current_verified_user",
    "get_current_customer",
    "get_current_seller",
    "get_current_admin",
]
