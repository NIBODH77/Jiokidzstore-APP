from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func
from typing import Optional, List
from datetime import datetime
from app.models.coupon import Coupon, CouponUsage

class CouponRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, coupon_id: int) -> Optional[Coupon]:
        stmt = select(Coupon).where(Coupon.id == coupon_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_code(self, code: str) -> Optional[Coupon]:
        stmt = select(Coupon).where(Coupon.code.ilike(code))
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_active_coupons(self) -> List[Coupon]:
        now = datetime.utcnow()
        stmt = select(Coupon).where(and_(
            Coupon.is_active == True,
            Coupon.valid_from <= now,
            Coupon.valid_until >= now
        ))
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_user_usage_count(self, coupon_id: int, user_id: int) -> int:
        count_stmt = select(func.count()).select_from(CouponUsage).where(
            CouponUsage.coupon_id == coupon_id,
            CouponUsage.user_id == user_id,
            CouponUsage.is_reversed == False
        )
        count_res = await self.db.execute(count_stmt)
        return count_res.scalar() or 0
