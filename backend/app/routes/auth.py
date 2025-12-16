"""
COMPLETE AUTHENTICATION API - ALL ENDPOINTS

This module provides ALL required authentication endpoints:
✓ POST /api/v1/auth/send-otp
✓ POST /api/v1/auth/resend-otp          (NEW)
✓ POST /api/v1/auth/verify-otp
✓ POST /api/v1/auth/refresh-token
✓ POST /api/v1/auth/logout
✓ GET  /api/v1/auth/me
✓ POST /api/v1/auth/validate-session
✓ POST /api/v1/auth/customer/check
✓ POST /api/v1/auth/seller/check
✓ POST /api/v1/auth/admin/check
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_active_user, get_current_user
from app.services.auth_service import AuthService
from app.schemas.auth import (
    SendOTPRequest,
    SendOTPResponse,
    VerifyOTPRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    LogoutRequest,
    LogoutResponse,
    MeResponse,
    ValidateSessionResponse,
    RoleCheckResponse,
    ErrorResponse
)
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

# ============================================================================
# OTP AUTHENTICATION
# ============================================================================

@router.post(
    "/send-otp",
    response_model=SendOTPResponse,
    status_code=status.HTTP_200_OK,
    summary="Send OTP to phone number",
    description="""
    Send OTP to user's phone number for authentication.

    **Security Features:**
    - OTP expires in 5 minutes
    - Previous unused OTPs are invalidated

    **Use Case:**
    - Initial login/registration
    - First time OTP request
    """
)
async def send_otp(
    request: SendOTPRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Send OTP for phone number authentication.
    Used by ALL platforms (Web, Mobile, Seller Panel, Admin Panel).
    """
    service = AuthService(db)
    return await service.send_otp(request.phone)


@router.post(
    "/resend-otp",
    response_model=SendOTPResponse,
    status_code=status.HTTP_200_OK,
    summary="Resend OTP to phone number",
    description="""
    Resend OTP to user's phone number.

    **Security Features:**
    - Invalidates previous OTP
    - Generates new OTP with fresh 5-minute expiry
    - Resets retry count

    **Use Case:**
    - User didn't receive initial OTP
    - OTP expired
    - User wants a new code
    """
)
async def resend_otp(
    request: SendOTPRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Resend OTP to phone number.
    Creates a new OTP and invalidates the old one.
    """
    service = AuthService(db)
    return await service.resend_otp(request.phone)


@router.post(
    "/verify-otp",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Verify OTP and login",
    description="""
    Verify OTP and authenticate user.

    **Security Features:**
    - Max 3 retry attempts per OTP
    - OTP expiry check (5 minutes)
    - Returns JWT access + refresh tokens
    - Creates user account if first time login

    **Validation Errors:**
    - 400: Invalid OTP, expired, or max attempts exceeded
    """
)
async def verify_otp(
    request: VerifyOTPRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Verify OTP and complete authentication.
    Returns user data and JWT tokens on success.
    """
    service = AuthService(db)
    return await service.verify_otp(request.phone, request.otp)

# ============================================================================
# TOKEN MANAGEMENT
# ============================================================================

@router.post(
    "/refresh-token",
    response_model=RefreshTokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Refresh access token",
    description="""
    Generate new access token using refresh token.

    **Security:**
    - Validates refresh token against database
    - Checks token expiration
    - Ensures user is still active

    **Errors:**
    - 401: Invalid, expired, or revoked refresh token
    """
)
async def refresh_token(
    request: RefreshTokenRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Refresh access token.
    Client should call this endpoint when access token expires.
    """
    service = AuthService(db)
    return await service.refresh_access_token(request.refresh_token)


@router.post(
    "/logout",
    response_model=LogoutResponse,
    status_code=status.HTTP_200_OK,
    summary="Logout user",
    description="""
    Logout user by revoking refresh token.

    **Security:**
    - Revokes refresh token in database
    - Prevents further token refresh
    - Client should discard access token
    """
)
async def logout(
    request: LogoutRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Logout user by revoking refresh token.
    Client should delete stored tokens after calling this endpoint.
    """
    service = AuthService(db)
    return await service.logout(request.refresh_token)

# ============================================================================
# SESSION & USER INFO
# ============================================================================

@router.get(
    "/me",
    response_model=MeResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current user information",
    description="""
    Get authenticated user's information.

    **Authorization:** Requires valid access token in Authorization header

    **Returns:**
    - User ID, phone, email, name, role
    - Account status (active, verified)
    - Creation timestamp
    """
)
async def get_me(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get current authenticated user information.
    Requires valid access token.
    """
    service = AuthService(db)
    return await service.get_current_user_info(current_user)


@router.post(
    "/validate-session",
    response_model=ValidateSessionResponse,
    status_code=status.HTTP_200_OK,
    summary="Validate current session",
    description="""
    Validate if current access token is valid.

    **Authorization:** Requires valid access token

    **Use Case:**
    - Check if user session is still valid
    - Verify token before sensitive operations
    """
)
async def validate_session(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Validate current user session.
    Returns user info if session is valid.
    """
    service = AuthService(db)
    return await service.validate_session(current_user)

# ============================================================================
# ROLE VALIDATION ENDPOINTS
# ============================================================================

@router.post(
    "/customer/check",
    response_model=RoleCheckResponse,
    status_code=status.HTTP_200_OK,
    summary="Check CUSTOMER role access",
    description="""
    Validate if current user has CUSTOMER role.

    **Authorization:** Requires valid access token

    **Use Case:**
    - Customer app login validation
    - Feature access control
    - Platform-specific authorization
    """
)
async def check_customer_access(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Check if current user has CUSTOMER role.
    Used by customer-facing platforms.
    """
    service = AuthService(db)
    return service.check_customer_role(current_user)


@router.post(
    "/seller/check",
    response_model=RoleCheckResponse,
    status_code=status.HTTP_200_OK,
    summary="Check SELLER role access",
    description="""
    Validate if current user has SELLER role.

    **Authorization:** Requires valid access token

    **Use Case:**
    - Seller panel access control
    - Product management features
    - Seller-specific operations
    """
)
async def check_seller_access(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Check if current user has SELLER role.
    Used by seller panel.
    """
    service = AuthService(db)
    return service.check_seller_role(current_user)


@router.post(
    "/admin/check",
    response_model=RoleCheckResponse,
    status_code=status.HTTP_200_OK,
    summary="Check ADMIN role access",
    description="""
    Validate if current user has ADMIN role.

    **Authorization:** Requires valid access token

    **Use Case:**
    - Admin panel access control
    - System management features
    - Admin-only operations
    """
)
async def check_admin_access(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Check if current user has ADMIN role.
    Used by admin panel.
    """
    service = AuthService(db)
    return service.check_admin_role(current_user)

# ============================================================================
# HEALTH CHECK
# ============================================================================

@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Auth module health check"
)
async def auth_health():
    """
    Health check endpoint for authentication module.
    """
    return {
        "status": "healthy",
        "module": "authentication",
        "otp_security": {
            "otp_expiry_minutes": 5,
            "max_retry_attempts": 3,
            "resend_enabled": True
        },
        "jwt": {
            "access_token_expire_minutes": 30,
            "refresh_token_expire_days": 7
        },
        "roles": ["CUSTOMER", "SELLER", "ADMIN"]
    }
