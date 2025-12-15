from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import Tuple, Optional
from decimal import Decimal
from app.repositories.cart_repository import CartRepository
from app.repositories.product_repository import ProductRepository
from app.schemas.cart import CartResponse, CartItemResponse, CartValidationResponse

class CartService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.cart_repo = CartRepository(db)
        self.product_repo = ProductRepository(db)

    async def get_cart(self, user_id: int) -> Optional[CartResponse]:
        cart = await self.cart_repo.get_by_user_id(user_id)
        if not cart:
            return None

        items = []
        subtotal = Decimal("0")

        for item in cart.items:
            product = item.product
            stock = await self.product_repo.get_stock(product.id)
            primary_image = next((img for img in product.images if img.is_primary), None)

            item_response = CartItemResponse(
                id=item.id,
                product_id=product.id,
                product_name=product.name,
                product_image=primary_image.image_url if primary_image else None,
                product_sku=product.sku,
                quantity=item.quantity,
                unit_price=product.selling_price,
                total_price=product.selling_price * item.quantity,
                stock_available=stock,
                is_available=product.is_active and stock >= item.quantity
            )
            items.append(item_response)
            subtotal += product.selling_price * item.quantity

        return CartResponse(
            id=cart.id,
            user_id=user_id,
            items=items,
            subtotal=subtotal,
            item_count=len(items),
            created_at=cart.created_at,
            updated_at=cart.updated_at
        )

    async def add_to_cart(self, user_id: int, product_id: int, quantity: int) -> Tuple[bool, str, Optional[int]]:
        result = await self.db.execute(
            text("SELECT * FROM add_to_cart(:user_id, :product_id, :quantity, NULL::INTEGER, NULL::TEXT)"),
            {"user_id": user_id, "product_id": product_id, "quantity": quantity}
        )
        row = result.fetchone()

        if row and row[0]:
            await self.db.commit()
            return True, "Added to cart successfully", row[0]

        error_msg = row[1] if row else "Failed to add to cart"
        return False, error_msg, None

    async def update_quantity(self, user_id: int, cart_item_id: int, quantity: int) -> Tuple[bool, str]:
        result = await self.db.execute(
            text("SELECT * FROM update_cart_quantity(:user_id, :cart_item_id, :quantity, NULL::BOOLEAN, NULL::TEXT)"),
            {"user_id": user_id, "cart_item_id": cart_item_id, "quantity": quantity}
        )
        row = result.fetchone()

        if row and row[0]:
            await self.db.commit()
            return True, "Cart updated successfully"

        error_msg = row[1] if row else "Failed to update cart"
        return False, error_msg

    async def validate_cart(self, user_id: int) -> CartValidationResponse:
        result = await self.db.execute(
            text("SELECT * FROM validate_cart_before_checkout(:user_id, NULL::BOOLEAN, NULL::TEXT[], NULL::TEXT[], NULL::INTEGER[])") ,
            {"user_id": user_id}
        )
        row = result.fetchone()

        if row:
            return CartValidationResponse(
                is_valid=row[0] or False,
                errors=row[1] or [],
                warnings=row[2] or [],
                unavailable_items=row[3] or []
            )

        return CartValidationResponse(is_valid=False, errors=["Cart validation failed"])
