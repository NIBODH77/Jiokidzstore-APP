from sqlalchemy.orm import Session, joinedload
from typing import Optional, List
from app.models.wishlist import Wishlist
from app.models.product import Product

class WishlistRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_user_wishlist(self, user_id: int) -> List[Wishlist]:
        return self.db.query(Wishlist).options(
            joinedload(Wishlist.product).joinedload(Product.images)
        ).filter(Wishlist.user_id == user_id).order_by(Wishlist.created_at.desc()).all()
    
    def get_wishlist_item(self, user_id: int, product_id: int) -> Optional[Wishlist]:
        return self.db.query(Wishlist).filter(
            Wishlist.user_id == user_id,
            Wishlist.product_id == product_id
        ).first()
    
    def is_in_wishlist(self, user_id: int, product_id: int) -> bool:
        return self.db.query(Wishlist).filter(
            Wishlist.user_id == user_id,
            Wishlist.product_id == product_id
        ).first() is not None
    
    def get_wishlist_count(self, user_id: int) -> int:
        return self.db.query(Wishlist).filter(Wishlist.user_id == user_id).count()
