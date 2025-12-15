from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from app.models.payment import Payment, PaymentAttempt
from app.models.refund import Refund

class PaymentRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, payment_id: int) -> Optional[Payment]:
        stmt = select(Payment).where(Payment.id == payment_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_order_id(self, order_id: int) -> Optional[Payment]:
        stmt = select(Payment).where(Payment.order_id == order_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_transaction_id(self, transaction_id: str) -> Optional[Payment]:
        stmt = select(Payment).where(Payment.transaction_id == transaction_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()


class RefundRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, refund_id: int) -> Optional[Refund]:
        stmt = select(Refund).where(Refund.id == refund_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_order_id(self, order_id: int) -> Optional[Refund]:
        stmt = select(Refund).where(Refund.order_id == order_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_refund_number(self, refund_number: str) -> Optional[Refund]:
        stmt = select(Refund).where(Refund.refund_number == refund_number)
        result = await self.db.execute(stmt)
        return result.scalars().first()
