from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
from typing import Optional, List
from app.models.cart import Cart, CartItem
from app.models.product import Product

class CartRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_user_id(self, user_id: int) -> Optional[Cart]:
        stmt = select(Cart).options(
            joinedload(Cart.items).joinedload(CartItem.product).joinedload(Product.images),
            joinedload(Cart.items).joinedload(CartItem.product).joinedload(Product.inventory)
        ).where(Cart.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_cart_items(self, cart_id: int) -> List[CartItem]:
        stmt = select(CartItem).options(
            joinedload(CartItem.product).joinedload(Product.images),
            joinedload(CartItem.product).joinedload(Product.inventory)
        ).where(CartItem.cart_id == cart_id)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_cart_item_by_id(self, item_id: int) -> Optional[CartItem]:
        stmt = select(CartItem).options(joinedload(CartItem.product)).where(CartItem.id == item_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_cart_item_count(self, user_id: int) -> int:
        cart_stmt = select(Cart).where(Cart.user_id == user_id)
        cart_res = await self.db.execute(cart_stmt)
        cart = cart_res.scalars().first()
        if not cart:
            return 0
        count_stmt = select(func.count()).select_from(CartItem).where(CartItem.cart_id == cart.id)
        count_res = await self.db.execute(count_stmt)
        return count_res.scalar() or 0
