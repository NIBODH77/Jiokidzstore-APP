from sqlalchemy.orm import Session, joinedload
from typing import Optional, List
from app.models.cart import Cart, CartItem
from app.models.product import Product

class CartRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_user_id(self, user_id: int) -> Optional[Cart]:
        return self.db.query(Cart).options(
            joinedload(Cart.items).joinedload(CartItem.product).joinedload(Product.images),
            joinedload(Cart.items).joinedload(CartItem.product).joinedload(Product.inventory)
        ).filter(Cart.user_id == user_id).first()
    
    def get_cart_items(self, cart_id: int) -> List[CartItem]:
        return self.db.query(CartItem).options(
            joinedload(CartItem.product).joinedload(Product.images),
            joinedload(CartItem.product).joinedload(Product.inventory)
        ).filter(CartItem.cart_id == cart_id).all()
    
    def get_cart_item_by_id(self, item_id: int) -> Optional[CartItem]:
        return self.db.query(CartItem).options(
            joinedload(CartItem.product)
        ).filter(CartItem.id == item_id).first()
    
    def get_cart_item_count(self, user_id: int) -> int:
        cart = self.db.query(Cart).filter(Cart.user_id == user_id).first()
        if not cart:
            return 0
        return self.db.query(CartItem).filter(CartItem.cart_id == cart.id).count()
