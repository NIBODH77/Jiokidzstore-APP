from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.payment_service import PaymentService
from app.schemas.payment import InitiatePaymentRequest, VerifyPaymentRequest, PaymentWebhookRequest, PaymentResponse, PaymentWebhookResponse
from app.schemas.common import SuccessResponse

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.post("/initiate", response_model=SuccessResponse)
async def initiate_payment(
    request: InitiatePaymentRequest,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    from app.repositories.order_repository import OrderRepository
    order_repo = OrderRepository(db)
    order = await order_repo.get_by_id(request.order_id)
    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Order not found")

    service = PaymentService(db)
    success, message, data = await service.initiate_payment(
        request.order_id, request.payment_method.value, order.total_amount
    )
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message=message, data=data)


@router.post("/verify", response_model=SuccessResponse)
async def verify_payment(
    request: VerifyPaymentRequest,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = PaymentService(db)
    success, message, status = await service.verify_payment(
        request.order_id, request.transaction_id,
        request.gateway_payment_id, request.gateway_signature
    )
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message=message, data={"payment_status": status})


@router.post("/webhook", response_model=PaymentWebhookResponse)
async def payment_webhook(request: PaymentWebhookRequest, db: AsyncSession = Depends(get_db)):
    service = PaymentService(db)
    success, message = await service.process_webhook(
        request.event, request.order_id, request.transaction_id,
        request.status, request.amount, str(request.gateway_response) if request.gateway_response else None
    )
    return PaymentWebhookResponse(success=success, message=message)


@router.get("/{order_id}", response_model=PaymentResponse)
async def get_payment(
    order_id: int,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    service = PaymentService(db)
    payment = await service.get_payment(order_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment
