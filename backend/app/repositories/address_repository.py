from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.address import Address

class AddressRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, address_id: int) -> Optional[Address]:
        return self.db.query(Address).filter(Address.id == address_id).first()
    
    def get_user_addresses(self, user_id: int) -> List[Address]:
        return self.db.query(Address).filter(
            Address.user_id == user_id,
            Address.is_active == True
        ).order_by(Address.is_default.desc(), Address.created_at.desc()).all()
    
    def get_default_address(self, user_id: int) -> Optional[Address]:
        return self.db.query(Address).filter(
            Address.user_id == user_id,
            Address.is_default == True,
            Address.is_active == True
        ).first()
