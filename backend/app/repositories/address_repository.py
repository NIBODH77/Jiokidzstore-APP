from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List
from app.models.address import Address

class AddressRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, address_id: int) -> Optional[Address]:
        stmt = select(Address).where(Address.id == address_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_user_addresses(self, user_id: int) -> List[Address]:
        stmt = select(Address).where(
            Address.user_id == user_id,
            Address.is_active == True
        ).order_by(Address.is_default.desc(), Address.created_at.desc())
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_default_address(self, user_id: int) -> Optional[Address]:
        stmt = select(Address).where(
            Address.user_id == user_id,
            Address.is_default == True,
            Address.is_active == True
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()
