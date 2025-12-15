# CloudKidd Database ER Diagram

## Entity Relationship Overview

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ PK: id          │
│ phone (unique)  │
│ email (unique)  │
│ name            │
│ role            │
│ is_active       │
│ is_verified     │
└────────┬────────┘
         │
    ┌────┴────┬─────────┬──────────┬──────────┐
    │         │         │          │          │
    ▼         ▼         ▼          ▼          ▼
┌────────┐ ┌─────┐ ┌────────┐ ┌─────────┐ ┌──────┐
│children│ │carts│ │wishlists│ │addresses│ │orders│
└────────┘ └──┬──┘ └────────┘ └─────────┘ └──┬───┘
              │                               │
              ▼                               │
         ┌─────────┐                          │
         │cart_items│◄────────────────────────┤
         └────┬────┘                          │
              │                               │
              ▼                               ▼
         ┌────────┐                    ┌───────────┐
         │products│◄───────────────────│order_items│
         └───┬────┘                    └───────────┘
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
┌──────┐ ┌──────────┐ ┌─────────────┐
│images│ │inventory │ │categories   │
└──────┘ └──────────┘ └─────────────┘


┌─────────┐     ┌─────────┐     ┌─────────┐
│ orders  │────►│payments │────►│ refunds │
└─────────┘     └─────────┘     └─────────┘
     │
     └──────────►┌───────────────┐
                 │coupon_usage   │
                 └───────┬───────┘
                         │
                         ▼
                  ┌─────────┐
                  │ coupons │
                  └─────────┘
```

## Table Details

### Core Tables

| Table | PK | Foreign Keys | Indexes |
|-------|----|--------------|---------|
| users | id | - | phone, email |
| children | id | user_id → users | user_id |
| otp_verifications | id | - | phone |
| addresses | id | user_id → users | user_id, pincode |

### Product Tables

| Table | PK | Foreign Keys | Indexes |
|-------|----|--------------|---------|
| categories | id | parent_id → categories | slug |
| products | id | category_id → categories | sku, name, category_id, brand |
| product_images | id | product_id → products | product_id |
| inventory | id | product_id → products | product_id (unique) |
| inventory_locks | id | product_id, order_id, cart_id | product_id, order_id |

### Cart & Wishlist Tables

| Table | PK | Foreign Keys | Indexes |
|-------|----|--------------|---------|
| carts | id | user_id → users | user_id (unique) |
| cart_items | id | cart_id → carts, product_id → products | cart_id, product_id |
| wishlists | id | user_id → users, product_id → products | user_id, product_id |

### Order Tables

| Table | PK | Foreign Keys | Indexes |
|-------|----|--------------|---------|
| orders | id | user_id, address_id, coupon_id | order_number, user_id, status |
| order_items | id | order_id → orders, product_id → products | order_id |

### Payment Tables

| Table | PK | Foreign Keys | Indexes |
|-------|----|--------------|---------|
| payments | id | order_id → orders | order_id (unique), transaction_id |
| payment_attempts | id | payment_id → payments | payment_id |
| refunds | id | order_id, payment_id | refund_number, order_id |

### Coupon Tables

| Table | PK | Foreign Keys | Indexes |
|-------|----|--------------|---------|
| coupons | id | - | code (unique) |
| coupon_usage | id | coupon_id, user_id, order_id | coupon_id, user_id, order_id |

## Relationships Summary

- User → Cart (1:1)
- User → Children (1:N)
- User → Addresses (1:N)
- User → Orders (1:N)
- User → Wishlist Items (1:N)
- Cart → Cart Items (1:N)
- Product → Images (1:N)
- Product → Inventory (1:1)
- Category → Products (1:N)
- Category → Subcategories (1:N, self-referential)
- Order → Order Items (1:N)
- Order → Payment (1:1)
- Order → Refund (1:1)
- Coupon → Usage Records (1:N)
