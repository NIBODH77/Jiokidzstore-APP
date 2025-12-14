from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from decimal import Decimal
from enum import Enum

class PaymentMethod(str, Enum):
    UPI = "UPI"
    CARD = "CARD"
    NET_BANKING = "NET_BANKING"
    WALLET = "WALLET"
    COD = "COD"

class PaymentStatus(str, Enum):
    PENDING = "PENDING"
    INITIATED = "INITIATED"
    PROCESSING = "PROCESSING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"
    REFUNDED = "REFUNDED"

class InitiatePaymentRequest(BaseModel):
    order_id: int
    payment_method: PaymentMethod
    upi_id: Optional[str] = None
    card_last_four: Optional[str] = None
    bank_name: Optional[str] = None
    wallet_name: Optional[str] = None

class PaymentResponse(BaseModel):
    id: int
    order_id: int
    payment_method: PaymentMethod
    amount: Decimal
    currency: str = "INR"
    status: PaymentStatus
    transaction_id: Optional[str] = None
    gateway_order_id: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class VerifyPaymentRequest(BaseModel):
    order_id: int
    transaction_id: str
    gateway_payment_id: Optional[str] = None
    gateway_signature: Optional[str] = None

class PaymentWebhookRequest(BaseModel):
    event: str
    order_id: int
    transaction_id: str
    status: str
    amount: Decimal
    payment_method: str
    gateway_response: Optional[dict] = None
    signature: str

class PaymentWebhookResponse(BaseModel):
    success: bool
    message: str
