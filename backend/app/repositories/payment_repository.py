from sqlalchemy.orm import Session
from typing import Optional
from app.models.payment import Payment, PaymentAttempt
from app.models.refund import Refund

class PaymentRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, payment_id: int) -> Optional[Payment]:
        return self.db.query(Payment).filter(Payment.id == payment_id).first()
    
    def get_by_order_id(self, order_id: int) -> Optional[Payment]:
        return self.db.query(Payment).filter(Payment.order_id == order_id).first()
    
    def get_by_transaction_id(self, transaction_id: str) -> Optional[Payment]:
        return self.db.query(Payment).filter(Payment.transaction_id == transaction_id).first()

class RefundRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, refund_id: int) -> Optional[Refund]:
        return self.db.query(Refund).filter(Refund.id == refund_id).first()
    
    def get_by_order_id(self, order_id: int) -> Optional[Refund]:
        return self.db.query(Refund).filter(Refund.order_id == order_id).first()
    
    def get_by_refund_number(self, refund_number: str) -> Optional[Refund]:
        return self.db.query(Refund).filter(Refund.refund_number == refund_number).first()
