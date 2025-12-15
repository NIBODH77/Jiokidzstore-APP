from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.refund_service import RefundService
from app.schemas.refund import InitiateRefundRequest, RefundResponse
from app.schemas.common import SuccessResponse

router = APIRouter(prefix="/refunds", tags=["Refunds"])


@router.post("", response_model=SuccessResponse)
async def initiate_refund(
    request: InitiateRefundRequest,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = RefundService(db)
    success, message, data = await service.initiate_refund(
        request.order_id, current_user.id, request.refund_type.value,
        request.amount, request.reason
    )
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message=message, data=data)


@router.get("/{order_id}", response_model=RefundResponse)
async def get_refund(
    order_id: int,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = RefundService(db)
    refund = await service.get_refund(order_id)
    if not refund:
        raise HTTPException(status_code=404, detail="Refund not found")
    return refund
