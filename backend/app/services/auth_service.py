"""
COMPLETE AUTHENTICATION SERVICE

This service implements:
✓ OTP expiry (5 minutes)
✓ OTP retry limit (max 3 attempts per OTP)
✓ Resend OTP functionality
✓ JWT access + refresh tokens
✓ Token revocation on logout
✓ Role-based access control
"""
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta, timezone
from typing import Tuple, Optional
from fastapi import HTTPException, status

from app.core.security import (
    generate_otp,
    create_access_token,
    create_refresh_token,
    decode_token
)
from app.core.config import settings
from app.repositories.user_repository import UserRepository
from app.repositories.otp_repository import OTPRepository
from app.repositories.refresh_token_repository import RefreshTokenRepository
from app.schemas.auth import (
    SendOTPResponse,
    LoginResponse,
    TokenResponse,
    UserResponse,
    RefreshTokenResponse,
    LogoutResponse,
    MeResponse,
    ValidateSessionResponse,
    RoleCheckResponse
)
from app.models.user import User, UserRole
from app.models.cart import Cart

class AuthService:
    """
    Complete Authentication Service
    Central authentication system for ALL platforms (Web, Mobile, Seller Panel, Admin Panel)
    """

    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
        self.otp_repo = OTPRepository(db)
        self.refresh_token_repo = RefreshTokenRepository(db)

    # ========================================================================
    # OTP OPERATIONS
    # ========================================================================

    async def send_otp(self, phone: str) -> SendOTPResponse:
        """
        Send OTP to phone number.

        Security enforcements:
        ✓ Invalidates previous unused OTPs
        ✓ OTP expires in 5 minutes

        Args:
            phone: Phone number with country code

        Returns:
            SendOTPResponse with success status
        """
        # Generate OTP
        otp_code = generate_otp(settings.OTP_LENGTH)

        # OTP EXPIRY: 5 minutes from now
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)

        # Create OTP record (this also invalidates existing OTPs)
        await self.otp_repo.create_otp(phone, otp_code, expires_at)

        # 🚀 TODO: Integrate with SMS provider (Twilio, AWS SNS, etc.)
        # For development, log the OTP
        print(f"📱 OTP for {phone}: {otp_code} (expires in 5 minutes)")

        return SendOTPResponse(
            success=True,
            message=f"OTP sent successfully to {phone}",
            expires_in_seconds=settings.OTP_EXPIRE_MINUTES * 60
        )

    async def resend_otp(self, phone: str) -> SendOTPResponse:
        """
        Resend OTP to phone number.
        This is identical to send_otp but provides a clearer API endpoint.

        Args:
            phone: Phone number with country code

        Returns:
            SendOTPResponse with success status
        """
        return await self.send_otp(phone)

    async def verify_otp(
        self,
        phone: str,
        otp: str
    ) -> LoginResponse:
        """
        Verify OTP and authenticate user.

        Security enforcements:
        ✓ OTP expiry check (5 minutes)
        ✓ Retry limit: Max 3 attempts per OTP
        ✓ OTP marked as used after successful verification

        Args:
            phone: Phone number
            otp: OTP code to verify

        Returns:
            LoginResponse with user data and JWT tokens

        Raises:
            HTTPException: If verification fails
        """
        # Get latest OTP for this phone
        otp_record = await self.otp_repo.get_latest_otp(phone)

        if not otp_record:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No OTP found for this phone number. Please request a new OTP."
            )

        # CHECK OTP RETRY LIMIT (Max 3 attempts)
        if otp_record.retry_count >= 3:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Maximum retry attempts exceeded. OTP has been invalidated. Please request a new OTP."
            )

        # CHECK OTP EXPIRY
        if otp_record.expires_at < datetime.now(timezone.utc):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="OTP has expired. Please request a new OTP."
            )

        # CHECK IF OTP ALREADY USED
        if otp_record.is_used or otp_record.is_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="OTP has already been used. Please request a new OTP."
            )

        # Verify OTP code
        if otp_record.otp != otp:
            # Increment retry count
            await self.otp_repo.increment_retry_count(otp_record)

            attempts_left = 3 - otp_record.retry_count
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid OTP. {attempts_left} attempts remaining."
            )

        # ✅ OTP VERIFIED - Mark as used
        await self.otp_repo.mark_verified(otp_record)

        # Find or create user
        user = await self.user_repo.get_by_phone(phone)
        is_new_user = False

        if not user:
            # Create new user
            user = User(
                phone=phone,
                role=UserRole.CUSTOMER,  # Default role
                is_active=True,
                is_verified=True
            )
            self.db.add(user)
            await self.db.flush()

            # Create cart for new user
            cart = Cart(user_id=user.id)
            self.db.add(cart)
            await self.db.commit()
            await self.db.refresh(user)

            is_new_user = True
        else:
            # Update existing user
            user.is_verified = True
            if not user.is_active:
                user.is_active = True
            await self.db.commit()
            await self.db.refresh(user)

        # Generate JWT tokens
        access_token = create_access_token({
            "sub": str(user.id),
            "role": user.role.value if user.role else UserRole.CUSTOMER.value
        })

        refresh_token = create_refresh_token({
            "sub": str(user.id)
        })

        # Store refresh token in database
        refresh_expires_at = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        await self.refresh_token_repo.create_refresh_token(
            user_id=user.id,
            token=refresh_token,
            expires_at=refresh_expires_at
        )

        return LoginResponse(
            success=True,
            message="Authentication successful",
            user=UserResponse.from_orm(user),
            tokens=TokenResponse(
                access_token=access_token,
                refresh_token=refresh_token,
                token_type="bearer",
                expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
            ),
            is_new_user=is_new_user
        )

    # ========================================================================
    # TOKEN MANAGEMENT
    # ========================================================================

    async def refresh_access_token(
        self,
        refresh_token: str
    ) -> RefreshTokenResponse:
        """
        Generate new access token using refresh token.

        Args:
            refresh_token: Valid refresh token

        Returns:
            RefreshTokenResponse with new access token

        Raises:
            HTTPException: If refresh token is invalid or expired
        """
        # Verify refresh token exists and is active
        token_record = await self.refresh_token_repo.get_active_token(refresh_token)

        if not token_record:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token"
            )

        # Decode token to get user_id
        try:
            payload = decode_token(refresh_token)

            if payload.get("type") != "refresh":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token type"
                )

            user_id = int(payload.get("sub"))
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )

        # Get user
        user = await self.user_repo.get_by_id(user_id)

        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive"
            )

        # Generate new access token
        access_token = create_access_token({
            "sub": str(user.id),
            "role": user.role.value if user.role else UserRole.CUSTOMER.value
        })

        return RefreshTokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

    async def logout(self, refresh_token: str) -> LogoutResponse:
        """
        Logout user by revoking refresh token.

        Args:
            refresh_token: Refresh token to revoke

        Returns:
            LogoutResponse
        """
        revoked = await self.refresh_token_repo.revoke_token(refresh_token)

        if revoked:
            return LogoutResponse(
                success=True,
                message="Logged out successfully"
            )
        else:
            return LogoutResponse(
                success=False,
                message="Token already revoked or not found"
            )

    # ========================================================================
    # SESSION & USER INFO
    # ========================================================================

    async def get_current_user_info(self, user: User) -> MeResponse:
        """
        Get current user information.

        Args:
            user: Current authenticated user

        Returns:
            MeResponse with user data
        """
        return MeResponse(
            user=UserResponse.from_orm(user)
        )

    async def validate_session(self, user: User) -> ValidateSessionResponse:
        """
        Validate current session.

        Args:
            user: Current authenticated user

        Returns:
            ValidateSessionResponse
        """
        return ValidateSessionResponse(
            valid=True,
            user=UserResponse.from_orm(user),
            message="Session is valid"
        )

    # ========================================================================
    # ROLE VALIDATION
    # ========================================================================

    def check_customer_role(self, user: User) -> RoleCheckResponse:
        """Check if user has CUSTOMER role"""
        has_access = user.role == UserRole.CUSTOMER
        return RoleCheckResponse(
            has_access=has_access,
            user_role=user.role.value if user.role else None,
            message="Access granted" if has_access else "Customer role required"
        )

    def check_seller_role(self, user: User) -> RoleCheckResponse:
        """Check if user has SELLER role"""
        has_access = user.role == UserRole.SELLER
        return RoleCheckResponse(
            has_access=has_access,
            user_role=user.role.value if user.role else None,
            message="Access granted" if has_access else "Seller role required"
        )

    def check_admin_role(self, user: User) -> RoleCheckResponse:
        """Check if user has ADMIN role"""
        has_access = user.role == UserRole.ADMIN
        return RoleCheckResponse(
            has_access=has_access,
            user_role=user.role.value if user.role else None,
            message="Access granted" if has_access else "Admin role required"
        )
