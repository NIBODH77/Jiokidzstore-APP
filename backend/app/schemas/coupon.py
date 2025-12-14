from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from decimal import Decimal
from enum import Enum

class DiscountType(str, Enum):
    PERCENTAGE = "PERCENTAGE"
    FIXED = "FIXED"

class ApplyCouponRequest(BaseModel):
    code: str = Field(..., min_length=1)
    cart_value: Decimal

class ApplyCouponResponse(BaseModel):
    success: bool
    message: str
    coupon_id: Optional[int] = None
    coupon_code: Optional[str] = None
    discount_type: Optional[DiscountType] = None
    discount_value: Optional[Decimal] = None
    discount_amount: Optional[Decimal] = None
    final_amount: Optional[Decimal] = None

class CouponResponse(BaseModel):
    id: int
    code: str
    description: Optional[str] = None
    discount_type: DiscountType
    discount_value: Decimal
    min_order_value: Decimal
    max_discount_amount: Optional[Decimal] = None
    valid_from: datetime
    valid_until: datetime
    is_active: bool
    
    class Config:
        from_attributes = True

class ValidateCouponResponse(BaseModel):
    is_valid: bool
    message: str
    remaining_uses: Optional[int] = None
