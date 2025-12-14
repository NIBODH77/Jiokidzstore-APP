from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.services.cart_service import CartService
from app.schemas.cart import AddToCartRequest, UpdateCartItemRequest, CartResponse, CartValidationResponse
from app.schemas.common import SuccessResponse

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("", response_model=CartResponse)
def get_cart(current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    service = CartService(db)
    cart = service.get_cart(current_user.id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    return cart

@router.post("/items", response_model=SuccessResponse)
def add_to_cart(
    request: AddToCartRequest,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    service = CartService(db)
    success, message, item_id = service.add_to_cart(current_user.id, request.product_id, request.quantity)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message=message, data={"cart_item_id": item_id})

@router.put("/items/{item_id}", response_model=SuccessResponse)
def update_cart_item(
    item_id: int,
    request: UpdateCartItemRequest,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    service = CartService(db)
    success, message = service.update_quantity(current_user.id, item_id, request.quantity)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message=message)

@router.delete("/items/{item_id}", response_model=SuccessResponse)
def remove_cart_item(
    item_id: int,
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    service = CartService(db)
    success, message = service.update_quantity(current_user.id, item_id, 0)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return SuccessResponse(message="Item removed from cart")

@router.post("/validate", response_model=CartValidationResponse)
def validate_cart(current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    service = CartService(db)
    return service.validate_cart(current_user.id)
