# 👤 Users Module Documentation

## Overview

The Users Module is strictly separated into three domains to ensure security and scalability:

1.  **Customer Domain** (`/api/v1/users`)
2.  **Seller Domain** (`/api/v1/seller/users`)
3.  **Admin Domain** (`/api/v1/admin/users`)

All domains share the same Authentication System (JWT + OTP) but have strictly enforced authorization barriers.

---

## 1. Customer Domain (`/api/v1/users`)

**Role Required:** `CUSTOMER`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Get profile |
| PUT | `/me` | Update profile |
| GET | `/me/addresses` | List addresses |
| POST | `/me/addresses` | Create address |
| PUT | `/me/addresses/{id}` | Update address |
| DELETE | `/me/addresses/{id}` | Delete address |
| GET | `/me/children` | List children |
| POST | `/me/children` | Add child |
| GET | `/me/wishlist` | View wishlist |
| POST | `/me/wishlist/{id}` | Add to wishlist |
| DELETE | `/me/wishlist/{id}` | Remove from wishlist |

---

## 2. Seller Domain (`/api/v1/seller/users`)

**Role Required:** `SELLER`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Get seller profile |
| PUT | `/me` | Update seller profile |

**Note:** Sellers cannot access addresses, children, or wishlist.

---

## 3. Admin Domain (`/api/v1/admin/users`)

**Role Required:** `ADMIN`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Get admin profile |
| GET | `/` | List all users (Paginated) |
| GET | `/{id}` | Get user details |
| PUT | `/{id}/status` | Activate/Deactivate user |

---

## 🔒 Security Implementation

- **Authentication:** All endpoints require Valid JWT.
- **Role Guards:** Enforced at Service Layer.
- **Ownership:** Enforced for all Customer resources.
- **Strict Separation:** No cross-domain access allowed.

---

## 🧪 Testing

### Customer Profile
```bash
curl -X GET http://localhost:8000/api/v1/users/me \
  -H "Authorization: Bearer <CUSTOMER_TOKEN>"
```

### Seller Profile
```bash
curl -X GET http://localhost:8000/api/v1/seller/users/me \
  -H "Authorization: Bearer <SELLER_TOKEN>"
```

### Admin User List
```bash
curl -X GET http://localhost:8000/api/v1/admin/users \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```
