from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_, func
from typing import Optional, List, Tuple
from app.models.product import Product, Category, ProductImage
from app.models.inventory import Inventory
from decimal import Decimal

class ProductRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, product_id: int) -> Optional[Product]:
        return self.db.query(Product).options(
            joinedload(Product.images),
            joinedload(Product.inventory),
            joinedload(Product.category)
        ).filter(Product.id == product_id, Product.is_active == True).first()
    
    def get_by_sku(self, sku: str) -> Optional[Product]:
        return self.db.query(Product).filter(Product.sku == sku).first()
    
    def get_all(
        self,
        category_id: Optional[int] = None,
        brand: Optional[str] = None,
        min_price: Optional[Decimal] = None,
        max_price: Optional[Decimal] = None,
        gender: Optional[str] = None,
        age_months: Optional[int] = None,
        search: Optional[str] = None,
        is_featured: Optional[bool] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
        skip: int = 0,
        limit: int = 20
    ) -> Tuple[List[Product], int]:
        query = self.db.query(Product).filter(Product.is_active == True)
        
        if category_id:
            query = query.filter(Product.category_id == category_id)
        if brand:
            query = query.filter(Product.brand.ilike(f"%{brand}%"))
        if min_price:
            query = query.filter(Product.selling_price >= min_price)
        if max_price:
            query = query.filter(Product.selling_price <= max_price)
        if gender:
            query = query.filter(Product.gender == gender)
        if age_months is not None:
            query = query.filter(
                and_(Product.age_min_months <= age_months, Product.age_max_months >= age_months)
            )
        if search:
            query = query.filter(
                or_(
                    Product.name.ilike(f"%{search}%"),
                    Product.description.ilike(f"%{search}%"),
                    Product.brand.ilike(f"%{search}%")
                )
            )
        if is_featured is not None:
            query = query.filter(Product.is_featured == is_featured)
        
        total = query.count()
        
        if sort_order == "desc":
            query = query.order_by(getattr(Product, sort_by).desc())
        else:
            query = query.order_by(getattr(Product, sort_by).asc())
        
        products = query.options(
            joinedload(Product.images),
            joinedload(Product.inventory)
        ).offset(skip).limit(limit).all()
        
        return products, total
    
    def get_stock(self, product_id: int) -> int:
        inv = self.db.query(Inventory).filter(Inventory.product_id == product_id).first()
        if inv:
            return max(0, inv.quantity_available - inv.quantity_reserved)
        return 0

class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, category_id: int) -> Optional[Category]:
        return self.db.query(Category).filter(Category.id == category_id).first()
    
    def get_by_slug(self, slug: str) -> Optional[Category]:
        return self.db.query(Category).filter(Category.slug == slug).first()
    
    def get_all(self, parent_id: Optional[int] = None) -> List[Category]:
        query = self.db.query(Category).filter(Category.is_active == True)
        if parent_id is not None:
            query = query.filter(Category.parent_id == parent_id)
        else:
            query = query.filter(Category.parent_id == None)
        return query.order_by(Category.display_order).all()
    
    def get_subcategories(self, parent_id: int) -> List[Category]:
        return self.db.query(Category).filter(
            Category.parent_id == parent_id,
            Category.is_active == True
        ).order_by(Category.display_order).all()
