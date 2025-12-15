from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_, func
from sqlalchemy.orm import joinedload
from typing import Optional, List, Tuple
from app.models.product import Product, Category, ProductImage
from app.models.inventory import Inventory
from decimal import Decimal

class ProductRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, product_id: int) -> Optional[Product]:
        stmt = select(Product).options(
            joinedload(Product.images),
            joinedload(Product.inventory),
            joinedload(Product.category)
        ).where(Product.id == product_id, Product.is_active == True)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_sku(self, sku: str) -> Optional[Product]:
        stmt = select(Product).where(Product.sku == sku)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_all(
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
        conditions = [Product.is_active == True]

        if category_id:
            conditions.append(Product.category_id == category_id)
        if brand:
            conditions.append(Product.brand.ilike(f"%{brand}%"))
        if min_price:
            conditions.append(Product.selling_price >= min_price)
        if max_price:
            conditions.append(Product.selling_price <= max_price)
        if gender:
            conditions.append(Product.gender == gender)
        if age_months is not None:
            conditions.append(and_(Product.age_min_months <= age_months, Product.age_max_months >= age_months))
        if search:
            conditions.append(or_(
                Product.name.ilike(f"%{search}%"),
                Product.description.ilike(f"%{search}%"),
                Product.brand.ilike(f"%{search}%")
            ))
        if is_featured is not None:
            conditions.append(Product.is_featured == is_featured)

        count_stmt = select(func.count()).select_from(Product).where(*conditions)
        total_result = await self.db.execute(count_stmt)
        total = total_result.scalar() or 0

        order_col = getattr(Product, sort_by)
        if sort_order == "desc":
            order_col = order_col.desc()
        else:
            order_col = order_col.asc()

        stmt = select(Product).where(*conditions).options(
            joinedload(Product.images),
            joinedload(Product.inventory)
        ).order_by(order_col).offset(skip).limit(limit)

        result = await self.db.execute(stmt)
        products = result.scalars().all()

        return products, total

    async def get_stock(self, product_id: int) -> int:
        stmt = select(Inventory).where(Inventory.product_id == product_id)
        result = await self.db.execute(stmt)
        inv = result.scalars().first()
        if inv:
            return max(0, inv.quantity_available - inv.quantity_reserved)
        return 0


class CategoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, category_id: int) -> Optional[Category]:
        stmt = select(Category).where(Category.id == category_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_by_slug(self, slug: str) -> Optional[Category]:
        stmt = select(Category).where(Category.slug == slug)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_all(self, parent_id: Optional[int] = None) -> List[Category]:
        conditions = [Category.is_active == True]
        if parent_id is not None:
            conditions.append(Category.parent_id == parent_id)
        else:
            conditions.append(Category.parent_id == None)
        stmt = select(Category).where(*conditions).order_by(Category.display_order)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_subcategories(self, parent_id: int) -> List[Category]:
        stmt = select(Category).where(Category.parent_id == parent_id, Category.is_active == True).order_by(Category.display_order)
        result = await self.db.execute(stmt)
        return result.scalars().all()
