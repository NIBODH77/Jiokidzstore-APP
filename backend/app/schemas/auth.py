from pydantic import BaseModel, Field
from typing import Optional

class SendOTPRequest(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15, description="Phone number with country code")

class SendOTPResponse(BaseModel):
    success: bool
    message: str
    expires_in_seconds: int = 300

class VerifyOTPRequest(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    otp: str = Field(..., min_length=6, max_length=6)

class VerifyOTPResponse(BaseModel):
    success: bool
    message: str
    is_new_user: bool = False

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class LoginResponse(BaseModel):
    user_id: int
    phone: str
    name: Optional[str] = None
    is_verified: bool
    tokens: TokenResponse
