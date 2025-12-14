from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Tuple, Optional, List
from decimal import Decimal
from app.repositories.order_repository import OrderRepository
from app.repositories.coupon_repository import CouponRepository
from app.schemas.order import OrderResponse, OrderItemResponse, OrderListResponse

class OrderService:
    def __init__(self, db: Session):
        self.db = db
        self.order_repo = OrderRepository(db)
        self.coupon_repo = CouponRepository(db)
    
    def create_order(
        self, 
        user_id: int, 
        address_id: int, 
        coupon_code: Optional[str] = None,
        notes: Optional[str] = None
    ) -> Tuple[bool, str, Optional[dict]]:
        coupon_id = None
        if coupon_code:
            coupon = self.coupon_repo.get_by_code(coupon_code)
            if coupon:
                coupon_id = coupon.id
        
        result = self.db.execute(
            text("""
                SELECT * FROM create_order(
                    :user_id, :address_id, :coupon_id, :notes,
                    NULL::INTEGER, NULL::VARCHAR, NULL::NUMERIC, NULL::BOOLEAN, NULL::TEXT
                )
            """),
            {
                "user_id": user_id, 
                "address_id": address_id, 
                "coupon_id": coupon_id,
                "notes": notes
            }
        ).fetchone()
        
        if result and result[3]:
            self.db.commit()
            return True, "Order created successfully", {
                "order_id": result[0],
                "order_number": result[1],
                "total_amount": float(result[2])
            }
        
        error_msg = result[4] if result else "Failed to create order"
        return False, error_msg, None
    
    def cancel_order(self, order_id: int, user_id: int, reason: str) -> Tuple[bool, str]:
        result = self.db.execute(
            text("SELECT * FROM cancel_order(:order_id, :user_id, :reason, NULL::BOOLEAN, NULL::TEXT)"),
            {"order_id": order_id, "user_id": user_id, "reason": reason}
        ).fetchone()
        
        if result and result[0]:
            self.db.commit()
            return True, "Order cancelled successfully"
        
        error_msg = result[1] if result else "Failed to cancel order"
        return False, error_msg
    
    def get_order(self, order_id: int, user_id: int) -> Optional[OrderResponse]:
        order = self.order_repo.get_by_id(order_id)
        if not order or order.user_id != user_id:
            return None
        return self._to_response(order)
    
    def get_user_orders(self, user_id: int, status: Optional[str], page: int, page_size: int) -> OrderListResponse:
        orders, total = self.order_repo.get_user_orders(
            user_id, status, skip=(page - 1) * page_size, limit=page_size
        )
        return OrderListResponse(
            orders=[self._to_response(o) for o in orders],
            total=total,
            page=page,
            page_size=page_size
        )
    
    def _to_response(self, order) -> OrderResponse:
        items = [
            OrderItemResponse(
                id=item.id,
                product_id=item.product_id,
                product_name=item.product_name,
                product_sku=item.product_sku,
                product_image_url=item.product_image_url,
                quantity=item.quantity,
                unit_price=item.unit_price,
                discount_percent=item.discount_percent,
                total_price=item.total_price
            ) for item in order.items
        ]
        
        return OrderResponse(
            id=order.id,
            order_number=order.order_number,
            user_id=order.user_id,
            subtotal=order.subtotal,
            discount_amount=order.discount_amount,
            delivery_fee=order.delivery_fee,
            platform_fee=order.platform_fee,
            total_amount=order.total_amount,
            status=order.status,
            payment_status=order.payment_status,
            items=items,
            estimated_delivery=order.estimated_delivery,
            shipped_at=order.shipped_at,
            delivered_at=order.delivered_at,
            created_at=order.created_at,
            updated_at=order.updated_at
        )
