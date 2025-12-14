from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

class CategoryBase(BaseModel):
    name: str
    slug: str
    parent_id: Optional[int] = None
    image_url: Optional[str] = None
    is_active: bool = True
    display_order: int = 0

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductImageBase(BaseModel):
    image_url: str
    angle: str = "front"
    display_order: int = 0
    is_primary: bool = False

class ProductImageResponse(ProductImageBase):
    id: int
    product_id: int
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    category_id: int
    brand: Optional[str] = None
    mrp: Decimal
    selling_price: Decimal
    discount_percent: Decimal = Decimal("0")
    age_min_months: int = 0
    age_max_months: int = 144
    gender: Optional[str] = None
    size: Optional[str] = None
    color: Optional[str] = None

class ProductCreate(ProductBase):
    images: Optional[List[ProductImageBase]] = None

class ProductResponse(ProductBase):
    id: int
    is_active: bool
    is_featured: bool
    rating_avg: Decimal
    rating_count: int
    created_at: datetime
    images: List[ProductImageResponse] = []
    stock_available: Optional[int] = None
    
    class Config:
        from_attributes = True

class ProductListResponse(BaseModel):
    products: List[ProductResponse]
    total: int
    page: int
    page_size: int
    total_pages: int

class ProductFilterParams(BaseModel):
    category_id: Optional[int] = None
    brand: Optional[str] = None
    min_price: Optional[Decimal] = None
    max_price: Optional[Decimal] = None
    gender: Optional[str] = None
    age_months: Optional[int] = None
    search: Optional[str] = None
    sort_by: Optional[str] = "created_at"
    sort_order: Optional[str] = "desc"
    page: int = 1
    page_size: int = 20
