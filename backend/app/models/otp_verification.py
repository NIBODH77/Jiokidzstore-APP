from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class OTPVerification(Base):
    """
    OTP Verification table with complete security tracking.

    Security Features:
    - OTP expiry enforcement
    - Retry count limiting (max 3 attempts per OTP)
    - Rate limit tracking
    - Usage tracking to prevent reuse
    """
    __tablename__ = "otp_verifications"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(15), index=True, nullable=False)
    otp = Column(String(6), nullable=False)  # The OTP code
    expires_at = Column(DateTime(timezone=True), nullable=False)
    retry_count = Column(Integer, default=0, nullable=False)  # Max 3 attempts
    is_used = Column(Boolean, default=False, nullable=False)  # Prevent OTP reuse
    is_verified = Column(Boolean, default=False, nullable=False)
    last_attempt_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
