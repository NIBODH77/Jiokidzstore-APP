from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime, timedelta
from typing import Tuple, Optional
from app.core.security import generate_otp, create_access_token, create_refresh_token
from app.core.config import settings
from app.repositories.user_repository import UserRepository
from app.schemas.auth import SendOTPResponse, LoginResponse, TokenResponse

class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)
    
    def send_otp(self, phone: str) -> SendOTPResponse:
        otp_code = generate_otp(settings.OTP_LENGTH)
        expires_at = datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
        
        self.db.execute(
            text("CALL send_otp(:phone, :otp_code, :expires_at)"),
            {"phone": phone, "otp_code": otp_code, "expires_at": expires_at}
        )
        self.db.commit()
        
        return SendOTPResponse(
            success=True,
            message=f"OTP sent successfully to {phone}",
            expires_in_seconds=settings.OTP_EXPIRE_MINUTES * 60
        )
    
    def verify_otp(self, phone: str, otp: str) -> Tuple[bool, Optional[LoginResponse], str]:
        result = self.db.execute(
            text("""
                SELECT p_is_valid, p_user_id, p_is_new_user, p_error_message
                FROM verify_otp(:phone, :otp_code, NULL::BOOLEAN, NULL::INTEGER, NULL::BOOLEAN, NULL::TEXT)
            """),
            {"phone": phone, "otp_code": otp}
        ).fetchone()
        
        if result and result[0]:
            user_id = result[1]
            is_new_user = result[2]
            
            user = self.user_repo.get_by_id(user_id)
            
            access_token = create_access_token({"sub": str(user_id)})
            refresh_token = create_refresh_token({"sub": str(user_id)})
            
            return True, LoginResponse(
                user_id=user_id,
                phone=phone,
                name=user.name if user else None,
                is_verified=True,
                tokens=TokenResponse(
                    access_token=access_token,
                    refresh_token=refresh_token,
                    expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
                )
            ), "Login successful"
        
        error_msg = result[3] if result else "OTP verification failed"
        return False, None, error_msg
