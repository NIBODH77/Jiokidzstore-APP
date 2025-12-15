from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.order_service import OrderService
from app.schemas.order import CreateOrderRequest, CancelOrderRequest, OrderResponse, OrderListResponse
from app.schemas.common import SuccessResponse

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=SuccessResponse)
async def create_order(
    request: CreateOrderRequest,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = OrderService(db)
    success, message, data = await service.create_order(
        current_user.id, request.address_id, request.coupon_code, request.notes
    )
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message=message, data=data)


@router.get("", response_model=OrderListResponse)
async def get_orders(
    status: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = OrderService(db)
    return await service.get_user_orders(current_user.id, status, page, page_size)


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = OrderService(db)
    order = await service.get_order(order_id, current_user.id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.post("/{order_id}/cancel", response_model=SuccessResponse)
async def cancel_order(
    order_id: int,
    request: CancelOrderRequest,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = OrderService(db)
    success, message = await service.cancel_order(order_id, current_user.id, request.reason)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message=message)
