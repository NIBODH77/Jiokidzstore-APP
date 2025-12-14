from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from decimal import Decimal
from enum import Enum

class OrderStatus(str, Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"
    RETURNED = "RETURNED"
    REFUNDED = "REFUNDED"

class CreateOrderRequest(BaseModel):
    address_id: int
    coupon_code: Optional[str] = None
    notes: Optional[str] = None

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    product_sku: str
    product_image_url: Optional[str] = None
    quantity: int
    unit_price: Decimal
    discount_percent: Decimal
    total_price: Decimal
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    order_number: str
    user_id: int
    
    subtotal: Decimal
    discount_amount: Decimal
    delivery_fee: Decimal
    platform_fee: Decimal
    total_amount: Decimal
    
    status: OrderStatus
    payment_status: str
    
    items: List[OrderItemResponse]
    
    estimated_delivery: Optional[datetime] = None
    shipped_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class OrderListResponse(BaseModel):
    orders: List[OrderResponse]
    total: int
    page: int
    page_size: int

class CancelOrderRequest(BaseModel):
    reason: str = Field(..., min_length=10)

class UpdateOrderStatusRequest(BaseModel):
    status: OrderStatus
    notes: Optional[str] = None
