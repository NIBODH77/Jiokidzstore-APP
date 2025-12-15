from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from decimal import Decimal
from app.core.database import get_db
from app.repositories.product_repository import ProductRepository, CategoryRepository
from app.schemas.product import ProductResponse, ProductListResponse, CategoryResponse
import math

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=ProductListResponse)
async def get_products(
    category_id: Optional[int] = None,
    brand: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    gender: Optional[str] = None,
    age_months: Optional[int] = None,
    search: Optional[str] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    repo = ProductRepository(db)
    products, total = await repo.get_all(
        category_id=category_id, brand=brand, min_price=min_price,
        max_price=max_price, gender=gender, age_months=age_months,
        search=search, sort_by=sort_by, sort_order=sort_order,
        skip=(page - 1) * page_size, limit=page_size
    )

    product_responses = []
    for p in products:
        primary_img = next((img for img in p.images if img.is_primary), None)
        stock = await repo.get_stock(p.id)
        product_responses.append(ProductResponse(
            id=p.id, sku=p.sku, name=p.name, description=p.description,
            category_id=p.category_id, brand=p.brand, mrp=p.mrp,
            selling_price=p.selling_price, discount_percent=p.discount_percent,
            age_min_months=p.age_min_months, age_max_months=p.age_max_months,
            gender=p.gender, size=p.size, color=p.color,
            is_active=p.is_active, is_featured=p.is_featured,
            rating_avg=p.rating_avg, rating_count=p.rating_count,
            created_at=p.created_at, images=[],
            stock_available=stock
        ))

    return ProductListResponse(
        products=product_responses, total=total, page=page,
        page_size=page_size, total_pages=math.ceil(total / page_size)
    )


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    repo = ProductRepository(db)
    product = await repo.get_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    stock = await repo.get_stock(product_id)
    return ProductResponse(
        id=product.id, sku=product.sku, name=product.name,
        description=product.description, category_id=product.category_id,
        brand=product.brand, mrp=product.mrp, selling_price=product.selling_price,
        discount_percent=product.discount_percent,
        age_min_months=product.age_min_months, age_max_months=product.age_max_months,
        gender=product.gender, size=product.size, color=product.color,
        is_active=product.is_active, is_featured=product.is_featured,
        rating_avg=product.rating_avg, rating_count=product.rating_count,
        created_at=product.created_at, images=[], stock_available=stock
    )


@router.get("/categories/", response_model=list[CategoryResponse])
async def get_categories(parent_id: Optional[int] = None, db: AsyncSession = Depends(get_db)):
    repo = CategoryRepository(db)
    return await repo.get_all(parent_id)
