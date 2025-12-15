from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import Tuple, Optional, List
from decimal import Decimal
from app.repositories.order_repository import OrderRepository
from app.repositories.coupon_repository import CouponRepository
from app.schemas.order import OrderResponse, OrderItemResponse, OrderListResponse

class OrderService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.order_repo = OrderRepository(db)
        self.coupon_repo = CouponRepository(db)

    async def create_order(
        self,
        user_id: int,
        address_id: int,
        coupon_code: Optional[str] = None,
        notes: Optional[str] = None
    ) -> Tuple[bool, str, Optional[dict]]:
        coupon_id = None
        if coupon_code:
            coupon = await self.coupon_repo.get_by_code(coupon_code)
            if coupon:
                coupon_id = coupon.id

        result = await self.db.execute(
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
        )
        row = result.fetchone()

        if row and row[3]:
            await self.db.commit()
            return True, "Order created successfully", {
                "order_id": row[0],
                "order_number": row[1],
                "total_amount": float(row[2])
            }

        error_msg = row[4] if row else "Failed to create order"
        return False, error_msg, None

    async def cancel_order(self, order_id: int, user_id: int, reason: str) -> Tuple[bool, str]:
        result = await self.db.execute(
            text("SELECT * FROM cancel_order(:order_id, :user_id, :reason, NULL::BOOLEAN, NULL::TEXT)"),
            {"order_id": order_id, "user_id": user_id, "reason": reason}
        )
        row = result.fetchone()

        if row and row[0]:
            await self.db.commit()
            return True, "Order cancelled successfully"

        error_msg = row[1] if row else "Failed to cancel order"
        return False, error_msg

    async def get_order(self, order_id: int, user_id: int) -> Optional[OrderResponse]:
        order = await self.order_repo.get_by_id(order_id)
        if not order or order.user_id != user_id:
            return None
        return self._to_response(order)

    async def get_user_orders(self, user_id: int, status: Optional[str], page: int, page_size: int) -> OrderListResponse:
        orders, total = await self.order_repo.get_user_orders(
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
