from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime

# ============================================================================
# OTP REQUESTS & RESPONSES
# ============================================================================

class SendOTPRequest(BaseModel):
    """Request to send OTP to phone number"""
    phone: str = Field(..., min_length=10, max_length=15, description="Phone number with country code")

    @validator('phone')
    def validate_phone(cls, v):
        # Remove spaces and dashes
        v = v.replace(' ', '').replace('-', '')
        if not v.startswith('+'):
            raise ValueError('Phone must start with country code (e.g., +91)')
        return v

class SendOTPResponse(BaseModel):
    """Response after sending OTP"""
    success: bool
    message: str
    expires_in_seconds: int = 300  # 5 minutes

class VerifyOTPRequest(BaseModel):
    """Request to verify OTP"""
    phone: str = Field(..., min_length=10, max_length=15)
    otp: str = Field(..., min_length=6, max_length=6)

    @validator('otp')
    def validate_otp(cls, v):
        if not v.isdigit():
            raise ValueError('OTP must contain only digits')
        return v

# ============================================================================
# TOKEN MANAGEMENT
# ============================================================================

class TokenResponse(BaseModel):
    """JWT Token pair response"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # in seconds

class RefreshTokenRequest(BaseModel):
    """Request to refresh access token"""
    refresh_token: str

class RefreshTokenResponse(BaseModel):
    """Response with new access token"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int

# ============================================================================
# AUTHENTICATION RESPONSES
# ============================================================================

class UserResponse(BaseModel):
    """User information in auth responses"""
    id: int
    phone: str
    email: Optional[str] = None
    name: Optional[str] = None
    role: Optional[str] = None
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    """Complete login response with user data and tokens"""
    success: bool = True
    message: str = "Authentication successful"
    user: UserResponse
    tokens: TokenResponse
    is_new_user: bool = False

class LogoutRequest(BaseModel):
    """Request to logout (revoke refresh token)"""
    refresh_token: str

class LogoutResponse(BaseModel):
    """Logout confirmation"""
    success: bool
    message: str

# ============================================================================
# SESSION & VALIDATION
# ============================================================================

class MeResponse(BaseModel):
    """Current user information"""
    user: UserResponse

class ValidateSessionRequest(BaseModel):
    """Request to validate current session"""
    pass  # Uses token from Authorization header

class ValidateSessionResponse(BaseModel):
    """Session validation result"""
    valid: bool
    user: Optional[UserResponse] = None
    message: str

# ============================================================================
# ROLE VALIDATION
# ============================================================================

class RoleCheckResponse(BaseModel):
    """Response for role validation endpoints"""
    has_access: bool
    user_role: Optional[str] = None
    message: str

# ============================================================================
# ERROR RESPONSES
# ============================================================================

class ErrorResponse(BaseModel):
    """Standard error response"""
    success: bool = False
    error: str
    detail: Optional[str] = None

class RateLimitErrorResponse(BaseModel):
    """Rate limit error with retry information"""
    success: bool = False
    error: str = "Rate limit exceeded"
    retry_after_seconds: int
    detail: str
