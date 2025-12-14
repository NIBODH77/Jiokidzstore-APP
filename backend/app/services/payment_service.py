from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Tuple, Optional
from decimal import Decimal
from app.repositories.payment_repository import PaymentRepository, RefundRepository
from app.repositories.order_repository import OrderRepository
from app.schemas.payment import PaymentResponse, PaymentStatus

class PaymentService:
    def __init__(self, db: Session):
        self.db = db
        self.payment_repo = PaymentRepository(db)
        self.order_repo = OrderRepository(db)
    
    def initiate_payment(
        self, 
        order_id: int, 
        payment_method: str, 
        amount: Decimal
    ) -> Tuple[bool, str, Optional[dict]]:
        result = self.db.execute(
            text("""
                SELECT * FROM register_payment_attempt(
                    :order_id, :payment_method, :amount,
                    NULL::INTEGER, NULL::VARCHAR, NULL::BOOLEAN, NULL::TEXT
                )
            """),
            {"order_id": order_id, "payment_method": payment_method, "amount": amount}
        ).fetchone()
        
        if result and result[2]:
            self.db.commit()
            return True, "Payment initiated", {
                "payment_id": result[0],
                "transaction_id": result[1]
            }
        
        error_msg = result[3] if result else "Failed to initiate payment"
        return False, error_msg, None
    
    def verify_payment(
        self, 
        order_id: int, 
        transaction_id: str,
        gateway_payment_id: Optional[str] = None,
        gateway_signature: Optional[str] = None
    ) -> Tuple[bool, str, str]:
        result = self.db.execute(
            text("""
                SELECT * FROM verify_payment(
                    :order_id, :transaction_id, :gateway_payment_id, :gateway_signature,
                    NULL::BOOLEAN, NULL::VARCHAR, NULL::TEXT
                )
            """),
            {
                "order_id": order_id, 
                "transaction_id": transaction_id,
                "gateway_payment_id": gateway_payment_id,
                "gateway_signature": gateway_signature
            }
        ).fetchone()
        
        if result and result[0]:
            self.db.commit()
            return True, "Payment verified", result[1]
        
        error_msg = result[2] if result else "Payment verification failed"
        return False, error_msg, "FAILED"
    
    def process_webhook(
        self,
        event: str,
        order_id: int,
        transaction_id: str,
        status: str,
        amount: Decimal,
        gateway_response: Optional[str] = None
    ) -> Tuple[bool, str]:
        result = self.db.execute(
            text("""
                SELECT * FROM payment_webhook(
                    :event, :order_id, :transaction_id, :status, :amount, :gateway_response,
                    NULL::BOOLEAN, NULL::TEXT
                )
            """),
            {
                "event": event,
                "order_id": order_id,
                "transaction_id": transaction_id,
                "status": status,
                "amount": amount,
                "gateway_response": gateway_response
            }
        ).fetchone()
        
        if result and result[0]:
            self.db.commit()
            return True, "Webhook processed"
        
        error_msg = result[1] if result else "Webhook processing failed"
        return False, error_msg
    
    def get_payment(self, order_id: int) -> Optional[PaymentResponse]:
        payment = self.payment_repo.get_by_order_id(order_id)
        if not payment:
            return None
        
        return PaymentResponse(
            id=payment.id,
            order_id=payment.order_id,
            payment_method=payment.payment_method,
            amount=payment.amount,
            currency=payment.currency,
            status=payment.status,
            transaction_id=payment.transaction_id,
            gateway_order_id=payment.gateway_order_id,
            created_at=payment.created_at,
            completed_at=payment.completed_at
        )
