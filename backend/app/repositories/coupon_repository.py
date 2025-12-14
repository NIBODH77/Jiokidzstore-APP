from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import Optional, List
from datetime import datetime
from app.models.coupon import Coupon, CouponUsage

class CouponRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, coupon_id: int) -> Optional[Coupon]:
        return self.db.query(Coupon).filter(Coupon.id == coupon_id).first()
    
    def get_by_code(self, code: str) -> Optional[Coupon]:
        return self.db.query(Coupon).filter(
            Coupon.code.ilike(code)
        ).first()
    
    def get_active_coupons(self) -> List[Coupon]:
        now = datetime.utcnow()
        return self.db.query(Coupon).filter(
            and_(
                Coupon.is_active == True,
                Coupon.valid_from <= now,
                Coupon.valid_until >= now
            )
        ).all()
    
    def get_user_usage_count(self, coupon_id: int, user_id: int) -> int:
        return self.db.query(CouponUsage).filter(
            CouponUsage.coupon_id == coupon_id,
            CouponUsage.user_id == user_id,
            CouponUsage.is_reversed == False
        ).count()
