"""
User Service - Business Logic Layer
Handles all user operations for Customer, Seller, and Admin domains
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, func
from fastapi import HTTPException, status
from typing import Optional, List, Tuple
from datetime import datetime

from app.models.user import User, UserRole, Child
from app.models.address import Address
from app.models.wishlist import Wishlist
from app.models.product import Product
from app.repositories.user_repository import UserRepository
from app.repositories.address_repository import AddressRepository
from app.repositories.wishlist_repository import WishlistRepository
from app.schemas.users import *

class UserService:
    """Service for user operations across all domains"""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
        self.address_repo = AddressRepository(db)
        self.wishlist_repo = WishlistRepository(db)

    # ========================================================================
    # USER PROFILE OPERATIONS (Unified)
    # ========================================================================

    async def get_user_profile(self, user: User) -> UserProfileResponse:
        """Get user profile (Accessible to all roles)"""
        return UserProfileResponse.from_orm(user)

    async def update_user_profile(
        self,
        user: User,
        data: UserProfileUpdate
    ) -> UserProfileResponse:
        """Update user profile (Accessible to all roles)"""
        update_data = data.model_dump(exclude_unset=True)
        if not update_data:
            return UserProfileResponse.from_orm(user)

        updated_user = await self.user_repo.update_user(user, update_data)
        return UserProfileResponse.from_orm(updated_user)

    # ========================================================================
    # USER ADDRESS OPERATIONS
    # ========================================================================

    async def get_user_addresses(self, user: User) -> AddressListResponse:
        """Get all addresses for user"""
        addresses = await self.address_repo.get_user_addresses(user.id)
        default_address = await self.address_repo.get_default_address(user.id)

        return AddressListResponse(
            addresses=[AddressResponse.from_orm(addr) for addr in addresses],
            default_address_id=default_address.id if default_address else None
        )

    async def create_user_address(
        self,
        user: User,
        data: AddressCreate
    ) -> AddressResponse:
        """Create new address for user"""
        # If setting as default, unset other defaults
        if data.is_default:
            await self.db.execute(
                update(Address)
                .where(Address.user_id == user.id)
                .values(is_default=False)
            )
            await self.db.commit()

        address = Address(**data.model_dump(), user_id=user.id)
        self.db.add(address)
        await self.db.commit()
        await self.db.refresh(address)

        return AddressResponse.from_orm(address)

    async def update_user_address(
        self,
        user: User,
        address_id: int,
        data: AddressUpdate
    ) -> AddressResponse:
        """Update user address with ownership validation"""
        address = await self.address_repo.get_by_id(address_id)

        # Ownership validation
        if not address or address.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Address not found"
            )

        if not address.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Address not found"
            )

        update_data = data.model_dump(exclude_unset=True)

        # If setting as default, unset other defaults
        if update_data.get('is_default'):
            await self.db.execute(
                update(Address)
                .where(Address.user_id == user.id, Address.id != address_id)
                .values(is_default=False)
            )

        for field, value in update_data.items():
            setattr(address, field, value)

        await self.db.commit()
        await self.db.refresh(address)

        return AddressResponse.from_orm(address)

    async def delete_user_address(
        self,
        user: User,
        address_id: int
    ) -> SuccessResponse:
        """Soft delete user address with ownership validation"""
        address = await self.address_repo.get_by_id(address_id)

        # Ownership validation
        if not address or address.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Address not found"
            )

        # Soft delete
        address.is_active = False
        address.is_default = False
        await self.db.commit()

        return SuccessResponse(message="Address deleted successfully")

    # ========================================================================
    # USER CHILDREN OPERATIONS
    # ========================================================================

    async def get_user_children(self, user: User) -> List[ChildResponse]:
        """Get all children for user"""
        children = await self.user_repo.get_children(user.id)
        return [ChildResponse.from_orm(child) for child in children]

    async def add_user_child(
        self,
        user: User,
        data: ChildCreate
    ) -> ChildResponse:
        """Add child for user"""
        child = Child(**data.model_dump(), user_id=user.id)
        self.db.add(child)
        await self.db.commit()
        await self.db.refresh(child)

        return ChildResponse.from_orm(child)

    # ========================================================================
    # USER WISHLIST OPERATIONS
    # ========================================================================

    async def get_user_wishlist(self, user: User) -> WishlistResponse:
        """Get user wishlist with product details"""
        stmt = (
            select(Wishlist, Product)
            .join(Product, Wishlist.product_id == Product.id)
            .where(Wishlist.user_id == user.id)
            .order_by(Wishlist.created_at.desc())
        )

        result = await self.db.execute(stmt)
        wishlist_items = result.all()

        items = []
        for wishlist, product in wishlist_items:
            items.append(WishlistItemResponse(
                id=wishlist.id,
                product_id=product.id,
                product_name=product.name,
                product_price=float(product.price),
                product_image=product.images[0].url if product.images else None,
                added_at=wishlist.created_at
            ))

        return WishlistResponse(
            items=items,
            total_items=len(items)
        )

    async def add_to_user_wishlist(
        self,
        user: User,
        product_id: int
    ) -> SuccessResponse:
        """Add product to user wishlist"""
        # Validate product exists
        stmt = select(Product).where(Product.id == product_id)
        result = await self.db.execute(stmt)
        product = result.scalars().first()

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )

        # Check if already in wishlist
        if await self.wishlist_repo.is_in_wishlist(user.id, product_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Product already in wishlist"
            )

        # Add to wishlist
        wishlist_item = Wishlist(user_id=user.id, product_id=product_id)
        self.db.add(wishlist_item)

        try:
            await self.db.commit()
        except Exception:
            await self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to add to wishlist. Item may already exist."
            )

        return SuccessResponse(message="Added to wishlist successfully")

    async def remove_from_user_wishlist(
        self,
        user: User,
        product_id: int
    ) -> SuccessResponse:
        """Remove product from user wishlist"""
        wishlist_item = await self.wishlist_repo.get_wishlist_item(user.id, product_id)

        if not wishlist_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found in wishlist"
            )

        await self.db.delete(wishlist_item)
        await self.db.commit()

        return SuccessResponse(message="Removed from wishlist successfully")

    # ========================================================================
    # ADMIN ONLY USER MANAGEMENT OPERATIONS
    # ========================================================================

    async def get_all_users_admin(
        self,
        user: User,
        page: int = 1,
        per_page: int = 20
    ) -> AdminUserListResponse:
        """Get all users (ADMIN only)"""
        if user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied. Admin role required."
            )

        # Get total count
        count_stmt = select(func.count(User.id))
        total_result = await self.db.execute(count_stmt)
        total = total_result.scalar()

        # Get paginated users
        offset = (page - 1) * per_page
        stmt = (
            select(User)
            .order_by(User.created_at.desc())
            .offset(offset)
            .limit(per_page)
        )

        result = await self.db.execute(stmt)
        users = result.scalars().all()

        return AdminUserListResponse(
            users=[AdminUserListItem.from_orm(u) for u in users],
            total=total,
            page=page,
            per_page=per_page
        )

    async def get_user_by_id_admin(
        self,
        user: User,
        target_user_id: int
    ) -> AdminUserDetailResponse:
        """Get user details by ID (ADMIN only)"""
        if user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied. Admin role required."
            )

        target_user = await self.user_repo.get_by_id(target_user_id)

        if not target_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        return AdminUserDetailResponse.from_orm(target_user)

    async def update_user_status_admin(
        self,
        user: User,
        target_user_id: int,
        data: AdminUserStatusUpdate
    ) -> AdminUserDetailResponse:
        """Update user status (ADMIN only)"""
        if user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied. Admin role required."
            )

        target_user = await self.user_repo.get_by_id(target_user_id)

        if not target_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Prevent admin from deactivating themselves
        if target_user.id == user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot modify own status"
            )

        target_user.is_active = data.is_active
        await self.db.commit()
        await self.db.refresh(target_user)

        return AdminUserDetailResponse.from_orm(target_user)
