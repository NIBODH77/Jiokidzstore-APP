from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class RateLimitType(str, enum.Enum):
    """Types of rate limits applied"""
    OTP_SEND = "OTP_SEND"  # Limit OTP send requests
    OTP_VERIFY = "OTP_VERIFY"  # Limit OTP verification attempts

class OTPRateLimit(Base):
    """
    Rate limiting table for OTP operations.

    Enforces:
    - OTP send rate limit: Max 3 requests per 15 minutes
    - OTP verify rate limit: Max 5 attempts per 15 minutes
    """
    __tablename__ = "otp_rate_limits"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(15), index=True, nullable=False)
    limit_type = Column(SQLEnum(RateLimitType), nullable=False, index=True)
    attempt_count = Column(Integer, default=1, nullable=False)
    window_start = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    last_attempt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
