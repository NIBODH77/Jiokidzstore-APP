from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List
from app.models.user import User, Child

class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: int) -> Optional[User]:
        stmt = select(User).where(User.id == user_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_phone(self, phone: str) -> Optional[User]:
        stmt = select(User).where(User.phone == phone)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[User]:
        stmt = select(User).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_children(self, user_id: int) -> List[Child]:
        stmt = select(Child).where(Child.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_child_by_id(self, child_id: int, user_id: int) -> Optional[Child]:
        stmt = select(Child).where(Child.id == child_id, Child.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def create_user(self, user_data: dict) -> User:
        db_user = User(**user_data)
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        return db_user

    async def update_user(self, user: User, update_data: dict) -> User:
        for key, value in update_data.items():
            setattr(user, key, value)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def delete_user(self, user: User):
        self.db.delete(user)
        await self.db.commit()
