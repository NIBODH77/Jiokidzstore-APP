from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Inventory(Base):
    __tablename__ = "inventory"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), unique=True, nullable=False, index=True)
    quantity_available = Column(Integer, nullable=False, default=0)
    quantity_reserved = Column(Integer, nullable=False, default=0)
    low_stock_threshold = Column(Integer, default=10)
    reorder_point = Column(Integer, default=20)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
    
    product = relationship("Product", back_populates="inventory")

class InventoryLock(Base):
    __tablename__ = "inventory_locks"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True, index=True)
    cart_id = Column(Integer, ForeignKey("carts.id"), nullable=True, index=True)
    quantity_locked = Column(Integer, nullable=False)
    lock_type = Column(String(20), default="cart")
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
