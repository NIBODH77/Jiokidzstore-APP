from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, Text, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class RefundStatus(str, enum.Enum):
    REQUESTED = "REQUESTED"
    APPROVED = "APPROVED"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    REJECTED = "REJECTED"
    FAILED = "FAILED"

class RefundType(str, enum.Enum):
    FULL = "FULL"
    PARTIAL = "PARTIAL"

class Refund(Base):
    __tablename__ = "refunds"
    
    id = Column(Integer, primary_key=True, index=True)
    refund_number = Column(String(50), unique=True, index=True, nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False, index=True)
    payment_id = Column(Integer, ForeignKey("payments.id"), nullable=False)
    
    refund_type = Column(SQLEnum(RefundType), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    
    status = Column(SQLEnum(RefundStatus), default=RefundStatus.REQUESTED, index=True)
    reason = Column(Text, nullable=False)
    
    gateway_refund_id = Column(String(100), nullable=True)
    
    processed_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    order = relationship("Order", back_populates="refund")
    payment = relationship("Payment")
