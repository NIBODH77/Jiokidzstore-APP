from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, func
from sqlalchemy.orm import joinedload
from typing import Optional, List, Tuple
from app.models.order import Order, OrderItem

class OrderRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, order_id: int) -> Optional[Order]:
        stmt = select(Order).options(
            joinedload(Order.items),
            joinedload(Order.payment),
            joinedload(Order.address)
        ).where(Order.id == order_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_order_number(self, order_number: str) -> Optional[Order]:
        stmt = select(Order).options(
            joinedload(Order.items),
            joinedload(Order.payment)
        ).where(Order.order_number == order_number)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_user_orders(
        self,
        user_id: int,
        status: Optional[str] = None,
        skip: int = 0,
        limit: int = 20
    ) -> Tuple[List[Order], int]:
        conditions = [Order.user_id == user_id]
        if status:
            conditions.append(Order.status == status)

        count_stmt = select(func.count()).select_from(Order).where(*conditions)
        count_res = await self.db.execute(count_stmt)
        total = count_res.scalar() or 0

        stmt = select(Order).where(*conditions).options(joinedload(Order.items)).order_by(desc(Order.created_at)).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        orders = result.scalars().all()
        return orders, total

    async def get_order_items(self, order_id: int) -> List[OrderItem]:
        stmt = select(OrderItem).where(OrderItem.order_id == order_id)
        result = await self.db.execute(stmt)
        return result.scalars().all()
