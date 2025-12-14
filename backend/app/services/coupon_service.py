from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Tuple, Optional
from decimal import Decimal
from app.repositories.coupon_repository import CouponRepository
from app.schemas.coupon import ApplyCouponResponse

class CouponService:
    def __init__(self, db: Session):
        self.db = db
        self.coupon_repo = CouponRepository(db)
    
    def apply_coupon(self, user_id: int, code: str, cart_value: Decimal) -> ApplyCouponResponse:
        result = self.db.execute(
            text("""
                SELECT * FROM apply_coupon(
                    :user_id, :code, :cart_value,
                    NULL::INTEGER, NULL::NUMERIC, NULL::NUMERIC, NULL::BOOLEAN, NULL::TEXT
                )
            """),
            {"user_id": user_id, "code": code, "cart_value": cart_value}
        ).fetchone()
        
        if result and result[3]:
            coupon = self.coupon_repo.get_by_id(result[0])
            return ApplyCouponResponse(
                success=True,
                message="Coupon applied successfully",
                coupon_id=result[0],
                coupon_code=code.upper(),
                discount_type=coupon.discount_type if coupon else None,
                discount_value=coupon.discount_value if coupon else None,
                discount_amount=result[1],
                final_amount=result[2]
            )
        
        error_msg = result[4] if result else "Failed to apply coupon"
        return ApplyCouponResponse(success=False, message=error_msg)
    
    def validate_coupon(self, coupon_id: int, user_id: int) -> Tuple[bool, str, Optional[int]]:
        result = self.db.execute(
            text("""
                SELECT * FROM validate_coupon_usage_limit(
                    :coupon_id, :user_id,
                    NULL::BOOLEAN, NULL::INTEGER, NULL::INTEGER, NULL::TEXT
                )
            """),
            {"coupon_id": coupon_id, "user_id": user_id}
        ).fetchone()
        
        if result and result[0]:
            return True, "Coupon is valid", result[2]
        
        error_msg = result[3] if result else "Coupon validation failed"
        return False, error_msg, None
