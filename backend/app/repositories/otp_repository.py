from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, and_, or_
from sqlalchemy.sql import func
from datetime import datetime, timedelta, timezone
from typing import Optional, List
from app.models.otp_verification import OTPVerification

class OTPRepository:
    """Repository for OTP operations - handles all database queries for OTP"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_latest_otp(self, phone: str) -> Optional[OTPVerification]:
        """Get the most recent OTP for a phone number"""
        stmt = (
            select(OTPVerification)
            .where(
                and_(
                    OTPVerification.phone == phone,
                    OTPVerification.is_used == False
                )
            )
            .order_by(OTPVerification.created_at.desc())
            .limit(1)
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def create_otp(
        self,
        phone: str,
        otp: str,
        expires_at: datetime
    ) -> OTPVerification:
        """Create a new OTP verification record"""
        # Invalidate any existing unused OTPs for this phone
        await self.invalidate_existing_otps(phone)

        otp_record = OTPVerification(
            phone=phone,
            otp=otp,
            expires_at=expires_at,
            retry_count=0,
            is_used=False,
            is_verified=False
        )
        self.db.add(otp_record)
        await self.db.commit()
        await self.db.refresh(otp_record)
        return otp_record

    async def invalidate_existing_otps(self, phone: str):
        """Mark all existing unused OTPs as used"""
        stmt = (
            select(OTPVerification)
            .where(
                and_(
                    OTPVerification.phone == phone,
                    OTPVerification.is_used == False
                )
            )
        )
        result = await self.db.execute(stmt)
        existing_otps = result.scalars().all()

        for otp in existing_otps:
            otp.is_used = True

        if existing_otps:
            await self.db.commit()

    async def increment_retry_count(self, otp_record: OTPVerification):
        """Increment retry count and update last attempt time"""
        otp_record.retry_count += 1
        otp_record.last_attempt_at = datetime.now(timezone.utc)
        await self.db.commit()
        await self.db.refresh(otp_record)

    async def mark_verified(self, otp_record: OTPVerification):
        """Mark OTP as verified and used"""
        otp_record.is_verified = True
        otp_record.is_used = True
        otp_record.last_attempt_at = datetime.now(timezone.utc)
        await self.db.commit()

    async def cleanup_expired_otps(self):
        """Clean up expired OTP records (maintenance operation)"""
        cutoff = datetime.now(timezone.utc) - timedelta(hours=24)
        stmt = delete(OTPVerification).where(
            or_(
                OTPVerification.expires_at < datetime.now(timezone.utc),
                OTPVerification.created_at < cutoff
            )
        )
        await self.db.execute(stmt)
        await self.db.commit()
