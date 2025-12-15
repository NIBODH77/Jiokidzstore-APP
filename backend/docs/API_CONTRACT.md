# CloudKidd API Contract

## Base URL
`/api/v1`

---

## Authentication

### Send OTP
```
POST /auth/send-otp
Request: { "phone": "+919876543210" }
Response: { "success": true, "message": "OTP sent", "expires_in_seconds": 300 }
Errors: 500 - Internal error
```

### Verify OTP
```
POST /auth/verify-otp
Request: { "phone": "+919876543210", "otp": "123456" }
Response: {
  "user_id": 1,
  "phone": "+919876543210",
  "name": null,
  "is_verified": true,
  "tokens": {
    "access_token": "...",
    "refresh_token": "...",
    "token_type": "bearer",
    "expires_in": 1800
  }
}
Errors: 400 - Invalid OTP, Expired OTP, Max attempts
```

---

## Products

### List Products
```
GET /products?category_id=1&brand=Nike&min_price=100&max_price=1000&gender=male&age_months=12&search=shirt&sort_by=price&sort_order=asc&page=1&page_size=20
Response: {
  "products": [...],
  "total": 100,
  "page": 1,
  "page_size": 20,
  "total_pages": 5
}
```

### Get Product
```
GET /products/{id}
Response: { "id": 1, "name": "...", "sku": "...", ... }
Errors: 404 - Not found
```

---

## Cart (Authenticated)

### Get Cart
```
GET /cart
Response: {
  "id": 1,
  "items": [...],
  "subtotal": 1500.00,
  "item_count": 3
}
```

### Add to Cart
```
POST /cart/items
Request: { "product_id": 1, "quantity": 2 }
Response: { "success": true, "data": { "cart_item_id": 1 } }
Errors: 400 - Out of stock, Max quantity
```

### Update Quantity
```
PUT /cart/items/{id}
Request: { "quantity": 3 }
Errors: 400 - Invalid quantity, Out of stock
```

### Validate Cart
```
POST /cart/validate
Response: {
  "is_valid": true,
  "errors": [],
  "warnings": ["Price changed for..."],
  "unavailable_items": []
}
```

---

## Orders (Authenticated)

### Create Order
```
POST /orders
Request: {
  "address_id": 1,
  "coupon_code": "SAVE10",
  "notes": "Gift wrap please"
}
Response: {
  "success": true,
  "data": {
    "order_id": 1,
    "order_number": "JK202312140001",
    "total_amount": 1245.00
  }
}
Errors: 400 - Empty cart, Invalid address, Stock issues
```

### Cancel Order
```
POST /orders/{id}/cancel
Request: { "reason": "Changed my mind about the product" }
Errors: 400 - Cannot cancel (already shipped)
```

---

## Payments (Authenticated)

### Initiate Payment
```
POST /payments/initiate
Request: {
  "order_id": 1,
  "payment_method": "UPI"
}
Response: {
  "success": true,
  "data": {
    "payment_id": 1,
    "transaction_id": "TXN202312141234"
  }
}
```

### Verify Payment
```
POST /payments/verify
Request: {
  "order_id": 1,
  "transaction_id": "TXN...",
  "gateway_payment_id": "...",
  "gateway_signature": "..."
}
Response: { "success": true, "data": { "payment_status": "SUCCESS" } }
```

### Payment Webhook
```
POST /payments/webhook
Request: {
  "event": "payment.captured",
  "order_id": 1,
  "transaction_id": "TXN...",
  "status": "SUCCESS",
  "amount": 1245.00,
  "payment_method": "UPI",
  "signature": "..."
}
```

---

## Coupons (Authenticated)

### Apply Coupon
```
POST /coupons/apply
Request: { "code": "SAVE10", "cart_value": 1500.00 }
Response: {
  "success": true,
  "coupon_id": 1,
  "discount_type": "PERCENTAGE",
  "discount_value": 10,
  "discount_amount": 150.00,
  "final_amount": 1350.00
}
Errors: Invalid code, Expired, Min order not met, Usage limit
```

---

## Refunds (Authenticated)

### Initiate Refund
```
POST /refunds
Request: {
  "order_id": 1,
  "refund_type": "FULL",
  "reason": "Product damaged during delivery"
}
Response: {
  "success": true,
  "data": {
    "refund_id": 1,
    "refund_number": "RF202312140001"
  }
}
Errors: 400 - Order not eligible, Refund exists
```

---

## User Profile (Authenticated)

### Get/Update Profile
```
GET /users/me
PUT /users/me
Request: { "name": "John", "email": "john@example.com", "role": "DAD" }
```

### Addresses
```
GET /users/me/addresses
POST /users/me/addresses
PUT /users/me/addresses/{id}
DELETE /users/me/addresses/{id}
```

### Children
```
GET /users/me/children
POST /users/me/children
```

### Wishlist
```
GET /users/me/wishlist
POST /users/me/wishlist/{product_id}
DELETE /users/me/wishlist/{product_id}
```

---

## Error Response Format
```json
{
  "detail": "Error message describing what went wrong"
}
```

## Authentication
All endpoints except `/auth/*`, `/products/*`, `/health`, and `/` require Bearer token:
```
Authorization: Bearer <access_token>
```
