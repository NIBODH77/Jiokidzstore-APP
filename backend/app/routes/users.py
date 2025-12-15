from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.repositories.user_repository import UserRepository
from app.repositories.address_repository import AddressRepository
from app.repositories.wishlist_repository import WishlistRepository
from app.schemas.user import UserResponse, UserUpdate, ChildCreate, ChildResponse
from app.schemas.address import AddressCreate, AddressUpdate, AddressResponse, AddressListResponse
from app.schemas.common import SuccessResponse
from app.models.user import Child
from app.models.address import Address
from app.models.wishlist import Wishlist

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user = Depends(get_current_active_user)):
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_profile(
    request: UserUpdate,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    repo = UserRepository(db)
    user = await repo.get_by_id(current_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    updated = await repo.update_user(user, request.model_dump(exclude_unset=True))
    return updated


@router.get("/me/addresses", response_model=AddressListResponse)
async def get_addresses(current_user = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    repo = AddressRepository(db)
    addresses = await repo.get_user_addresses(current_user.id)
    default = await repo.get_default_address(current_user.id)
    return AddressListResponse(
        addresses=[AddressResponse.model_validate(a) for a in addresses],
        default_address_id=default.id if default else None
    )


@router.post("/me/addresses", response_model=AddressResponse)
async def create_address(
    request: AddressCreate,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    if request.is_default:
        await db.execute(update(Address).where(Address.user_id == current_user.id).values(is_default=False))

    address = Address(**request.model_dump(), user_id=current_user.id)
    db.add(address)
    await db.commit()
    await db.refresh(address)
    return address


@router.put("/me/addresses/{address_id}", response_model=AddressResponse)
async def update_address(
    address_id: int,
    request: AddressUpdate,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    repo = AddressRepository(db)
    address = await repo.get_by_id(address_id)
    if not address or address.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Address not found")

    if request.is_default:
        await db.execute(update(Address).where(Address.user_id == current_user.id).values(is_default=False))

    for field, value in request.model_dump(exclude_unset=True).items():
        setattr(address, field, value)
    await db.commit()
    await db.refresh(address)
    return address


@router.delete("/me/addresses/{address_id}", response_model=SuccessResponse)
async def delete_address(
    address_id: int,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    repo = AddressRepository(db)
    address = await repo.get_by_id(address_id)
    if not address or address.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Address not found")

    address.is_active = False
    await db.commit()
    return SuccessResponse(message="Address deleted")


@router.get("/me/children", response_model=list[ChildResponse])
async def get_children(current_user = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    return await repo.get_children(current_user.id)


@router.post("/me/children", response_model=ChildResponse)
async def add_child(
    request: ChildCreate,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    child = Child(**request.model_dump(), user_id=current_user.id)
    db.add(child)
    await db.commit()
    await db.refresh(child)
    return child


@router.get("/me/wishlist")
async def get_wishlist(current_user = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    repo = WishlistRepository(db)
    return await repo.get_user_wishlist(current_user.id)


@router.post("/me/wishlist/{product_id}", response_model=SuccessResponse)
async def add_to_wishlist(
    product_id: int,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    repo = WishlistRepository(db)
    if await repo.is_in_wishlist(current_user.id, product_id):
        raise HTTPException(status_code=400, detail="Product already in wishlist")

    wishlist_item = Wishlist(user_id=current_user.id, product_id=product_id)
    db.add(wishlist_item)
    await db.commit()
    return SuccessResponse(message="Added to wishlist")


@router.delete("/me/wishlist/{product_id}", response_model=SuccessResponse)
async def remove_from_wishlist(
    product_id: int,
    current_user = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    repo = WishlistRepository(db)
    item = await repo.get_wishlist_item(current_user.id, product_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not in wishlist")

    await db.delete(item)
    await db.commit()
    return SuccessResponse(message="Removed from wishlist")
