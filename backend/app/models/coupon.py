from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, Boolean, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class DiscountType(str, enum.Enum):
    PERCENTAGE = "PERCENTAGE"
    FIXED = "FIXED"

class Coupon(Base):
    __tablename__ = "coupons"
    
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(String(255), nullable=True)
    
    discount_type = Column(SQLEnum(DiscountType), nullable=False)
    discount_value = Column(Numeric(10, 2), nullable=False)
    
    min_order_value = Column(Numeric(10, 2), default=0)
    max_discount_amount = Column(Numeric(10, 2), nullable=True)
    
    usage_limit_total = Column(Integer, nullable=True)
    usage_limit_per_user = Column(Integer, default=1)
    times_used = Column(Integer, default=0)
    
    valid_from = Column(DateTime(timezone=True), nullable=False)
    valid_until = Column(DateTime(timezone=True), nullable=False)
    
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    usages = relationship("CouponUsage", back_populates="coupon")

class CouponUsage(Base):
    __tablename__ = "coupon_usage"
    
    id = Column(Integer, primary_key=True, index=True)
    coupon_id = Column(Integer, ForeignKey("coupons.id"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True, index=True)
    
    discount_applied = Column(Numeric(10, 2), nullable=False)
    used_at = Column(DateTime(timezone=True), server_default=func.now())
    
    is_reversed = Column(Boolean, default=False)
    reversed_at = Column(DateTime(timezone=True), nullable=True)
    
    coupon = relationship("Coupon", back_populates="usages")
    user = relationship("User")
