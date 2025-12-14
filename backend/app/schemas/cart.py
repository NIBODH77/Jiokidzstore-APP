from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

class AddToCartRequest(BaseModel):
    product_id: int
    quantity: int = Field(..., ge=1, le=10)

class UpdateCartItemRequest(BaseModel):
    quantity: int = Field(..., ge=0, le=10)

class CartItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    product_image: Optional[str] = None
    product_sku: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal
    stock_available: int
    is_available: bool = True
    
    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    id: int
    user_id: int
    items: List[CartItemResponse]
    subtotal: Decimal
    item_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class CartValidationResponse(BaseModel):
    is_valid: bool
    errors: List[str] = []
    warnings: List[str] = []
    unavailable_items: List[int] = []
    updated_prices: List[dict] = []
