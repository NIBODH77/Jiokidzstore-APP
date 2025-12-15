from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
from typing import Optional, List
from app.models.wishlist import Wishlist
from app.models.product import Product

class WishlistRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_wishlist(self, user_id: int) -> List[Wishlist]:
        stmt = select(Wishlist).options(joinedload(Wishlist.product).joinedload(Product.images)).where(Wishlist.user_id == user_id).order_by(Wishlist.created_at.desc())
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_wishlist_item(self, user_id: int, product_id: int) -> Optional[Wishlist]:
        stmt = select(Wishlist).where(Wishlist.user_id == user_id, Wishlist.product_id == product_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def is_in_wishlist(self, user_id: int, product_id: int) -> bool:
        stmt = select(Wishlist).where(Wishlist.user_id == user_id, Wishlist.product_id == product_id)
        result = await self.db.execute(stmt)
        return result.scalars().first() is not None

    async def get_wishlist_count(self, user_id: int) -> int:
        count_stmt = select(func.count()).select_from(Wishlist).where(Wishlist.user_id == user_id)
        count_res = await self.db.execute(count_stmt)
        return count_res.scalar() or 0
