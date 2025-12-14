from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.auth_service import AuthService
from app.schemas.auth import SendOTPRequest, SendOTPResponse, VerifyOTPRequest, LoginResponse
from app.schemas.common import ErrorResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/send-otp", response_model=SendOTPResponse)
def send_otp(request: SendOTPRequest, db: Session = Depends(get_db)):
    service = AuthService(db)
    try:
        return service.send_otp(request.phone)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify-otp", response_model=LoginResponse)
def verify_otp(request: VerifyOTPRequest, db: Session = Depends(get_db)):
    service = AuthService(db)
    success, response, message = service.verify_otp(request.phone, request.otp)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return response
