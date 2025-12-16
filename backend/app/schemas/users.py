"""
User Schemas for all user domains (Customer, Seller, Admin)
"""
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from app.models.address import AddressType

# ============================================================================
# CUSTOMER USER SCHEMAS
# ============================================================================

class UserProfileResponse(BaseModel):
    """Customer user profile"""
    id: int
    phone: str
    email: Optional[str] = None
    name: Optional[str] = None
    role: str
    is_active: bool
    is_verified: bool
    is_expecting: Optional[bool] = None
    due_date: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

class UserProfileUpdate(BaseModel):
    """Update customer profile"""
    name: Optional[str] = Field(None, max_length=100)
    email: Optional[str] = Field(None, max_length=255)
    is_expecting: Optional[bool] = None
    due_date: Optional[datetime] = None

# ============================================================================
# ADDRESS SCHEMAS
# ============================================================================

class AddressCreate(BaseModel):
    """Create new address"""
    address_type: AddressType = AddressType.HOME
    recipient_name: str = Field(..., max_length=100)
    phone: str = Field(..., max_length=15)
    address_line1: str = Field(..., max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    landmark: Optional[str] = Field(None, max_length=255)
    city: str = Field(..., max_length=100)
    state: str = Field(..., max_length=100)
    pincode: str = Field(..., max_length=10)
    country: str = Field(default="India", max_length=50)
    is_default: bool = False

class AddressUpdate(BaseModel):
    """Update existing address"""
    address_type: Optional[AddressType] = None
    recipient_name: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=15)
    address_line1: Optional[str] = Field(None, max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    landmark: Optional[str] = Field(None, max_length=255)
    city: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    pincode: Optional[str] = Field(None, max_length=10)
    country: Optional[str] = Field(None, max_length=50)
    is_default: Optional[bool] = None

class AddressResponse(BaseModel):
    """Address response"""
    id: int
    user_id: int
    address_type: AddressType
    recipient_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str]
    landmark: Optional[str]
    city: str
    state: str
    pincode: str
    country: str
    is_default: bool
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AddressListResponse(BaseModel):
    """List of addresses"""
    addresses: List[AddressResponse]
    default_address_id: Optional[int] = None

# ============================================================================
# CHILDREN SCHEMAS
# ============================================================================

class ChildCreate(BaseModel):
    """Add child"""
    name: str = Field(..., max_length=100)
    gender: Optional[str] = Field(None, max_length=10)
    date_of_birth: Optional[datetime] = None

class ChildResponse(BaseModel):
    """Child response"""
    id: int
    user_id: int
    name: str
    gender: Optional[str]
    date_of_birth: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True

# ============================================================================
# WISHLIST SCHEMAS
# ============================================================================

class WishlistItemResponse(BaseModel):
    """Wishlist item with product details"""
    id: int
    product_id: int
    product_name: str
    product_price: float
    product_image: Optional[str]
    added_at: datetime

    class Config:
        from_attributes = True

class WishlistResponse(BaseModel):
    """Complete wishlist"""
    items: List[WishlistItemResponse]
    total_items: int

# ============================================================================
# SELLER USER SCHEMAS
# ============================================================================

class SellerProfileResponse(BaseModel):
    """Seller profile (limited fields)"""
    id: int
    phone: str
    email: Optional[str] = None
    name: Optional[str] = None
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class SellerProfileUpdate(BaseModel):
    """Update seller profile (limited fields)"""
    name: Optional[str] = Field(None, max_length=100)
    email: Optional[str] = Field(None, max_length=255)

# ============================================================================
# ADMIN USER SCHEMAS
# ============================================================================

class AdminProfileResponse(BaseModel):
    """Admin profile"""
    id: int
    phone: str
    email: Optional[str] = None
    name: Optional[str] = None
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AdminUserListItem(BaseModel):
    """User list item for admin"""
    id: int
    phone: str
    email: Optional[str]
    name: Optional[str]
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AdminUserListResponse(BaseModel):
    """Paginated user list for admin"""
    users: List[AdminUserListItem]
    total: int
    page: int
    per_page: int

class AdminUserDetailResponse(BaseModel):
    """Detailed user info for admin"""
    id: int
    phone: str
    email: Optional[str]
    name: Optional[str]
    role: str
    is_active: bool
    is_verified: bool
    is_expecting: Optional[bool]
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class AdminUserStatusUpdate(BaseModel):
    """Update user status (admin only)"""
    is_active: bool

# ============================================================================
# COMMON SCHEMAS
# ============================================================================

class SuccessResponse(BaseModel):
    """Generic success response"""
    success: bool = True
    message: str
