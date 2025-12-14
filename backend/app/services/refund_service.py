from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Tuple, Optional
from decimal import Decimal
from app.repositories.payment_repository import RefundRepository
from app.schemas.refund import RefundResponse

class RefundService:
    def __init__(self, db: Session):
        self.db = db
        self.refund_repo = RefundRepository(db)
    
    def initiate_refund(
        self, 
        order_id: int, 
        user_id: int, 
        refund_type: str,
        amount: Optional[Decimal],
        reason: str
    ) -> Tuple[bool, str, Optional[dict]]:
        result = self.db.execute(
            text("""
                SELECT * FROM initiate_refund(
                    :order_id, :user_id, :refund_type, :amount, :reason,
                    NULL::INTEGER, NULL::VARCHAR, NULL::BOOLEAN, NULL::TEXT
                )
            """),
            {
                "order_id": order_id, 
                "user_id": user_id, 
                "refund_type": refund_type,
                "amount": amount,
                "reason": reason
            }
        ).fetchone()
        
        if result and result[2]:
            self.db.commit()
            return True, "Refund initiated successfully", {
                "refund_id": result[0],
                "refund_number": result[1]
            }
        
        error_msg = result[3] if result else "Failed to initiate refund"
        return False, error_msg, None
    
    def get_refund(self, order_id: int) -> Optional[RefundResponse]:
        refund = self.refund_repo.get_by_order_id(order_id)
        if not refund:
            return None
        
        return RefundResponse(
            id=refund.id,
            refund_number=refund.refund_number,
            order_id=refund.order_id,
            refund_type=refund.refund_type,
            amount=refund.amount,
            status=refund.status,
            reason=refund.reason,
            gateway_refund_id=refund.gateway_refund_id,
            processed_at=refund.processed_at,
            completed_at=refund.completed_at,
            created_at=refund.created_at
        )
