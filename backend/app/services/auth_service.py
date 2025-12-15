from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.sql import func
from datetime import datetime, timedelta, timezone
from typing import Tuple, Optional
from app.core.security import generate_otp, create_access_token, create_refresh_token
from app.core.config import settings
from app.repositories.user_repository import UserRepository
from app.schemas.auth import SendOTPResponse, LoginResponse, TokenResponse
from app.models.otp import OTPVerification
from app.models.cart import Cart
from app.models.user import User

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)

    async def send_otp(self, phone: str) -> SendOTPResponse:
        """Generate OTP and store/update it in `otp_verifications` table."""
        otp_code = generate_otp(settings.OTP_LENGTH)
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)

        # Transactional update/create similar to the stored procedure
        async with self.db.begin():
            stmt = (
                select(OTPVerification)
                .where(OTPVerification.phone == phone, OTPVerification.is_verified == False)
                .order_by(OTPVerification.created_at.desc())
                .limit(1)
                .with_for_update()
            )
            res = await self.db.execute(stmt)
            existing = res.scalars().first()

            if existing:
                existing.otp_code = otp_code
                existing.expires_at = expires_at
                existing.attempts = 0
                existing.created_at = datetime.now(timezone.utc)
                self.db.add(existing)
            else:
                new = OTPVerification(
                    phone=phone,
                    otp_code=otp_code,
                    expires_at=expires_at,
                    is_verified=False,
                    attempts=0
                )
                self.db.add(new)

        # Here you would integrate with an SMS provider to send the OTP.
        return SendOTPResponse(
            success=True,
            message=f"OTP generated and stored for {phone}",
            expires_in_seconds=settings.OTP_EXPIRE_MINUTES * 60,
        )

    async def verify_otp(self, phone: str, otp: str) -> Tuple[bool, Optional[LoginResponse], str]:
        """Verify OTP stored in `otp_verifications` and create/verify user/cart as needed."""
        max_attempts = 5

        async with self.db.begin():
            stmt = (
                select(OTPVerification)
                .where(OTPVerification.phone == phone, OTPVerification.is_verified == False)
                .order_by(OTPVerification.created_at.desc())
                .limit(1)
                .with_for_update()
            )
            res = await self.db.execute(stmt)
            record = res.scalars().first()

            if not record:
                return False, None, "No OTP found. Please request a new OTP."

            if record.attempts >= max_attempts:
                return False, None, "Maximum attempts exceeded. Please request a new OTP."

            if record.expires_at < datetime.now(timezone.utc):
                return False, None, "OTP has expired. Please request a new OTP."

            # increment attempts
            record.attempts = (record.attempts or 0) + 1
            self.db.add(record)

            if record.otp_code != otp:
                return False, None, "Invalid OTP. Please try again."

            # mark verified
            record.is_verified = True
            self.db.add(record)

            # find or create user
            user = await self.user_repo.get_by_phone(phone)
            is_new_user = False
            user_id_local = None
            if not user:
                # create user inline to avoid nested commits
                user_obj = User(phone=phone, is_active=True, is_verified=True)
                self.db.add(user_obj)
                await self.db.flush()  # ensure id is populated
                # create cart
                cart = Cart(user_id=user_obj.id)
                self.db.add(cart)
                user_id_local = user_obj.id
                is_new_user = True
            else:
                # mark user verified
                user.is_verified = True
                self.db.add(user)
                user_id_local = user.id

        # fetch fresh user object after transaction commit
        user = await self.user_repo.get_by_id(user_id_local)

        # create tokens
        access_token = create_access_token({"sub": str(user.id)})
        refresh_token = create_refresh_token({"sub": str(user.id)})

        return True, LoginResponse(
            user_id=user.id,
            phone=phone,
            name=getattr(user, "name", None),
            is_verified=True,
            tokens=TokenResponse(
                access_token=access_token,
                refresh_token=refresh_token,
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            )
        ), "Login successful"
