# JioKidz Backend API

Production-ready e-commerce backend built with FastAPI, PostgreSQL, and SQLAlchemy.

## Tech Stack
- **Backend**: FastAPI (Python 3.11)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Migrations**: Alembic

## API Endpoints

### Authentication
- `POST /api/v1/auth/send-otp` - Send OTP to phone
- `POST /api/v1/auth/verify-otp` - Verify OTP and login

### Products
- `GET /api/v1/products` - List products with filters
- `GET /api/v1/products/{id}` - Get product details
- `GET /api/v1/products/categories/` - List categories

### Cart
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/items` - Add to cart
- `PUT /api/v1/cart/items/{id}` - Update quantity
- `DELETE /api/v1/cart/items/{id}` - Remove item
- `POST /api/v1/cart/validate` - Validate before checkout

### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - List user orders
- `GET /api/v1/orders/{id}` - Get order details
- `POST /api/v1/orders/{id}/cancel` - Cancel order

### Payments
- `POST /api/v1/payments/initiate` - Initiate payment
- `POST /api/v1/payments/verify` - Verify payment
- `POST /api/v1/payments/webhook` - Payment webhook
- `GET /api/v1/payments/{order_id}` - Get payment status

### Coupons
- `POST /api/v1/coupons/apply` - Apply coupon

### Refunds
- `POST /api/v1/refunds` - Initiate refund
- `GET /api/v1/refunds/{order_id}` - Get refund status

### User Profile
- `GET /api/v1/users/me` - Get profile
- `PUT /api/v1/users/me` - Update profile
- `GET/POST /api/v1/users/me/addresses` - Manage addresses
- `GET/POST /api/v1/users/me/children` - Manage children
- `GET/POST/DELETE /api/v1/users/me/wishlist` - Manage wishlist

## Database Schema

16 tables covering complete e-commerce flow:
- users, children, otp_verifications
- categories, products, product_images
- inventory, inventory_locks
- carts, cart_items
- wishlists
- orders, order_items
- payments, payment_attempts
- refunds
- coupons, coupon_usage
- addresses

## Stored Procedures

18 PostgreSQL procedures for critical business logic:
- Auth: send_otp, verify_otp
- Cart: add_to_cart, update_cart_quantity, validate_cart_before_checkout
- Inventory: lock_inventory, release_inventory, decrease_inventory, increase_inventory
- Coupons: apply_coupon, rollback_coupon, validate_coupon_usage_limit
- Orders: create_order, cancel_order, update_order_status, freeze_order_pricing
- Payments: register_payment_attempt, verify_payment, payment_webhook
- Refunds: initiate_refund, restore_inventory

## Running the Backend

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

API Docs: http://localhost:8000/api/v1/docs

## Scaling Roadmap

### 1L Users
- Database indexing on frequently queried columns
- Connection pooling optimization

### 10L Users
- Redis for session caching and rate limiting
- Read replicas for product queries
- CDN for static assets

### 1Cr Users
- Database sharding by user_id
- Message queues for order processing
- Distributed tracing and observability
- Microservices decomposition
