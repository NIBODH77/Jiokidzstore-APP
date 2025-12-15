from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import Tuple, Optional
from decimal import Decimal
from app.repositories.coupon_repository import CouponRepository
from app.schemas.coupon import ApplyCouponResponse

class CouponService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.coupon_repo = CouponRepository(db)

    async def apply_coupon(self, user_id: int, code: str, cart_value: Decimal) -> ApplyCouponResponse:
        result = await self.db.execute(
            text("""
                SELECT * FROM apply_coupon(
                    :user_id, :code, :cart_value,
                    NULL::INTEGER, NULL::NUMERIC, NULL::NUMERIC, NULL::BOOLEAN, NULL::TEXT
                )
            """),
            {"user_id": user_id, "code": code, "cart_value": cart_value}
        )
        row = result.fetchone()

        if row and row[3]:
            coupon = await self.coupon_repo.get_by_id(row[0])
            return ApplyCouponResponse(
                success=True,
                message="Coupon applied successfully",
                coupon_id=row[0],
                coupon_code=code.upper(),
                discount_type=coupon.discount_type if coupon else None,
                discount_value=coupon.discount_value if coupon else None,
                discount_amount=row[1],
                final_amount=row[2]
            )

        error_msg = row[4] if row else "Failed to apply coupon"
        return ApplyCouponResponse(success=False, message=error_msg)

    async def validate_coupon(self, coupon_id: int, user_id: int) -> Tuple[bool, str, Optional[int]]:
        result = await self.db.execute(
            text("""
                SELECT * FROM validate_coupon_usage_limit(
                    :coupon_id, :user_id,
                    NULL::BOOLEAN, NULL::INTEGER, NULL::INTEGER, NULL::TEXT
                )
            """),
            {"coupon_id": coupon_id, "user_id": user_id}
        )
        row = result.fetchone()

        if row and row[0]:
            return True, "Coupon is valid", row[2]

        error_msg = row[3] if row else "Coupon validation failed"
        return False, error_msg, None
