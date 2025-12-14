from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from decimal import Decimal
from enum import Enum

class RefundStatus(str, Enum):
    REQUESTED = "REQUESTED"
    APPROVED = "APPROVED"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    REJECTED = "REJECTED"
    FAILED = "FAILED"

class RefundType(str, Enum):
    FULL = "FULL"
    PARTIAL = "PARTIAL"

class InitiateRefundRequest(BaseModel):
    order_id: int
    refund_type: RefundType = RefundType.FULL
    amount: Optional[Decimal] = None
    reason: str = Field(..., min_length=10)

class RefundResponse(BaseModel):
    id: int
    refund_number: str
    order_id: int
    refund_type: RefundType
    amount: Decimal
    status: RefundStatus
    reason: str
    gateway_refund_id: Optional[str] = None
    processed_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
