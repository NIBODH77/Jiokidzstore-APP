"""
USERS API
Base path: /api/v1/users

Unified endpoints for all user roles (Customer, Seller, Admin).
Access control is handled at the service layer where necessary.
"""
from fastapi import APIRouter, Depends, Query, Path
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.user_service import UserService
from app.schemas.users import (
    UserProfileResponse,
    UserProfileUpdate,
    AddressListResponse,
    AddressCreate,
    AddressUpdate,
    AddressResponse,
    ChildResponse,
    ChildCreate,
    WishlistResponse,
    SuccessResponse,
    AdminUserListResponse,
    AdminUserDetailResponse,
    AdminUserStatusUpdate
)
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])

# ============================================================================
# USER PROFILE (Unified)
# ============================================================================

@router.get(
    "/me",
    response_model=UserProfileResponse,
    summary="Get my profile",
    description="Get authenticated user's profile. Structure adapts to role."
)
async def get_my_profile(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Get current user profile"""
    service = UserService(db)
    return await service.get_user_profile(current_user)


@router.put(
    "/me",
    response_model=UserProfileResponse,
    summary="Update my profile",
    description="Update authenticated user's profile fields."
)
async def update_my_profile(
    data: UserProfileUpdate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Update current user profile"""
    service = UserService(db)
    return await service.update_user_profile(current_user, data)

# ============================================================================
# USER ADDRESSES (Unified)
# ============================================================================

@router.get(
    "/me/addresses",
    response_model=AddressListResponse,
    summary="Get my addresses",
    description="Get all addresses for authenticated user."
)
async def get_my_addresses(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all user addresses"""
    service = UserService(db)
    return await service.get_user_addresses(current_user)


@router.post(
    "/me/addresses",
    response_model=AddressResponse,
    summary="Create address",
    description="Create new address for authenticated user."
)
async def create_address(
    data: AddressCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Create new address"""
    service = UserService(db)
    return await service.create_user_address(current_user, data)


@router.put(
    "/me/addresses/{address_id}",
    response_model=AddressResponse,
    summary="Update address",
    description="Update existing address. Ownership validated."
)
async def update_address(
    address_id: int,
    data: AddressUpdate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Update address with ownership validation"""
    service = UserService(db)
    return await service.update_user_address(current_user, address_id, data)


@router.delete(
    "/me/addresses/{address_id}",
    response_model=SuccessResponse,
    summary="Delete address",
    description="Soft delete address. Ownership validated."
)
async def delete_address(
    address_id: int,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete address (soft delete)"""
    service = UserService(db)
    return await service.delete_user_address(current_user, address_id)

# ============================================================================
# USER CHILDREN (Unified)
# ============================================================================

@router.get(
    "/me/children",
    response_model=List[ChildResponse],
    summary="Get my children",
    description="Get all children for authenticated user."
)
async def get_my_children(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Get all children"""
    service = UserService(db)
    return await service.get_user_children(current_user)


@router.post(
    "/me/children",
    response_model=ChildResponse,
    summary="Add child",
    description="Add child for authenticated user."
)
async def add_child(
    data: ChildCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Add child"""
    service = UserService(db)
    return await service.add_user_child(current_user, data)

# ============================================================================
# USER WISHLIST (Unified)
# ============================================================================

@router.get(
    "/me/wishlist",
    response_model=WishlistResponse,
    summary="Get my wishlist",
    description="Get complete wishlist with product details."
)
async def get_my_wishlist(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Get wishlist"""
    service = UserService(db)
    return await service.get_user_wishlist(current_user)


@router.post(
    "/me/wishlist/{product_id}",
    response_model=SuccessResponse,
    summary="Add to wishlist",
    description="Add product to wishlist. Product existence validated. Duplicates prevented."
)
async def add_to_wishlist(
    product_id: int,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Add product to wishlist"""
    service = UserService(db)
    return await service.add_to_user_wishlist(current_user, product_id)


@router.delete(
    "/me/wishlist/{product_id}",
    response_model=SuccessResponse,
    summary="Remove from wishlist",
    description="Remove product from wishlist."
)
async def remove_from_wishlist(
    product_id: int,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Remove product from wishlist"""
    service = UserService(db)
    return await service.remove_from_user_wishlist(current_user, product_id)

# ============================================================================
# ADMIN: USER MANAGEMENT
# ============================================================================

@router.get(
    "/",
    response_model=AdminUserListResponse,
    summary="List all users",
    description="Get paginated list of all users. ADMIN only."
)
async def get_all_users(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """List all users (Admin)"""
    service = UserService(db)
    return await service.get_all_users_admin(current_user, page, per_page)


@router.get(
    "/{user_id}",
    response_model=AdminUserDetailResponse,
    summary="Get user details",
    description="Get detailed user info by ID. ADMIN only."
)
async def get_user_details(
    user_id: int = Path(..., title="The ID of the user to get"),
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user by ID (Admin)"""
    service = UserService(db)
    return await service.get_user_by_id_admin(current_user, user_id)


@router.put(
    "/{user_id}/status",
    response_model=AdminUserDetailResponse,
    summary="Update user status",
    description="Update user active status. ADMIN only."
)
async def update_user_status(
    data: AdminUserStatusUpdate,
    user_id: int = Path(..., title="The ID of the user to update"),
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Update user status (Admin)"""
    service = UserService(db)
    return await service.update_user_status_admin(current_user, user_id, data)
