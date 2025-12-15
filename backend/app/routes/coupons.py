from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.coupon_service import CouponService
from app.schemas.coupon import ApplyCouponRequest, ApplyCouponResponse

router = APIRouter(prefix="/coupons", tags=["Coupons"])


@router.post("/apply", response_model=ApplyCouponResponse)
async def apply_coupon(
    request: ApplyCouponRequest,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = CouponService(db)
    return await service.apply_coupon(current_user.id, request.code, request.cart_value)
