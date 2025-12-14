from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from typing import Optional, List, Tuple
from app.models.order import Order, OrderItem

class OrderRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, order_id: int) -> Optional[Order]:
        return self.db.query(Order).options(
            joinedload(Order.items),
            joinedload(Order.payment),
            joinedload(Order.address)
        ).filter(Order.id == order_id).first()
    
    def get_by_order_number(self, order_number: str) -> Optional[Order]:
        return self.db.query(Order).options(
            joinedload(Order.items),
            joinedload(Order.payment)
        ).filter(Order.order_number == order_number).first()
    
    def get_user_orders(
        self, 
        user_id: int, 
        status: Optional[str] = None,
        skip: int = 0, 
        limit: int = 20
    ) -> Tuple[List[Order], int]:
        query = self.db.query(Order).filter(Order.user_id == user_id)
        
        if status:
            query = query.filter(Order.status == status)
        
        total = query.count()
        
        orders = query.options(
            joinedload(Order.items)
        ).order_by(desc(Order.created_at)).offset(skip).limit(limit).all()
        
        return orders, total
    
    def get_order_items(self, order_id: int) -> List[OrderItem]:
        return self.db.query(OrderItem).filter(OrderItem.order_id == order_id).all()
