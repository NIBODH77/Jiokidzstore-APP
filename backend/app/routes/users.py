from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
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
def get_current_user_profile(current_user = Depends(get_current_active_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
def update_profile(
    request: UserUpdate,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    for field, value in request.model_dump(exclude_unset=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/me/addresses", response_model=AddressListResponse)
def get_addresses(current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    repo = AddressRepository(db)
    addresses = repo.get_user_addresses(current_user.id)
    default = repo.get_default_address(current_user.id)
    return AddressListResponse(
        addresses=[AddressResponse.model_validate(a) for a in addresses],
        default_address_id=default.id if default else None
    )

@router.post("/me/addresses", response_model=AddressResponse)
def create_address(
    request: AddressCreate,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if request.is_default:
        db.query(Address).filter(Address.user_id == current_user.id).update({"is_default": False})
    
    address = Address(**request.model_dump(), user_id=current_user.id)
    db.add(address)
    db.commit()
    db.refresh(address)
    return address

@router.put("/me/addresses/{address_id}", response_model=AddressResponse)
def update_address(
    address_id: int,
    request: AddressUpdate,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    repo = AddressRepository(db)
    address = repo.get_by_id(address_id)
    if not address or address.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Address not found")
    
    if request.is_default:
        db.query(Address).filter(Address.user_id == current_user.id).update({"is_default": False})
    
    for field, value in request.model_dump(exclude_unset=True).items():
        setattr(address, field, value)
    db.commit()
    db.refresh(address)
    return address

@router.delete("/me/addresses/{address_id}", response_model=SuccessResponse)
def delete_address(
    address_id: int,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    repo = AddressRepository(db)
    address = repo.get_by_id(address_id)
    if not address or address.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Address not found")
    
    address.is_active = False
    db.commit()
    return SuccessResponse(message="Address deleted")

@router.get("/me/children", response_model=list[ChildResponse])
def get_children(current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    repo = UserRepository(db)
    return repo.get_children(current_user.id)

@router.post("/me/children", response_model=ChildResponse)
def add_child(
    request: ChildCreate,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    child = Child(**request.model_dump(), user_id=current_user.id)
    db.add(child)
    db.commit()
    db.refresh(child)
    return child

@router.get("/me/wishlist")
def get_wishlist(current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    repo = WishlistRepository(db)
    return repo.get_user_wishlist(current_user.id)

@router.post("/me/wishlist/{product_id}", response_model=SuccessResponse)
def add_to_wishlist(
    product_id: int,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    repo = WishlistRepository(db)
    if repo.is_in_wishlist(current_user.id, product_id):
        raise HTTPException(status_code=400, detail="Product already in wishlist")
    
    wishlist_item = Wishlist(user_id=current_user.id, product_id=product_id)
    db.add(wishlist_item)
    db.commit()
    return SuccessResponse(message="Added to wishlist")

@router.delete("/me/wishlist/{product_id}", response_model=SuccessResponse)
def remove_from_wishlist(
    product_id: int,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    repo = WishlistRepository(db)
    item = repo.get_wishlist_item(current_user.id, product_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not in wishlist")
    
    db.delete(item)
    db.commit()
    return SuccessResponse(message="Removed from wishlist")
