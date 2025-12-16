# 🔐 Complete Authentication API Documentation

## Overview

This is a **centralized authentication system** for ALL platforms:
- ✅ Android Mobile App
- ✅ Web Application
- ✅ Seller Panel
- ✅ Admin Panel

**NO separate login systems** - ONE authentication backend for everything!

---

## 🎯 Core Features

### OTP Security
- ✅ **OTP Expiry**: 5 minutes
- ✅ **Retry Limit**: Max 3 attempts per OTP
- ✅ **Resend OTP**: Generate fresh OTP anytime
- ✅ **Auto-invalidation**: Old OTPs invalidated on resend

### JWT Tokens
- ✅ **Access Token**: Short-lived (30 minutes)
- ✅ **Refresh Token**: Long-lived (7 days)
- ✅ **Token Payload**: Includes `user_id` and `role`
- ✅ **Revocation**: Logout revokes refresh tokens

### Role-Based Access
- ✅ **CUSTOMER**: Default role for new users
- ✅ **SELLER**: For seller panel access
- ✅ **ADMIN**: For admin panel access

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8000/api/v1
```

---

## 🔑 Authentication Endpoints

### 1. Send OTP
**Endpoint:** `POST /auth/send-otp`

Send OTP to phone number for authentication.

**Request Body:**
```json
{
  "phone": "+919876543210"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "OTP sent successfully to +919876543210",
  "expires_in_seconds": 300
}
```

**Errors:**
- `400`: Invalid phone format
- `500`: SMS provider error

---

### 2. Resend OTP ✨ NEW
**Endpoint:** `POST /auth/resend-otp`

Resend OTP (invalidates previous OTP and generates new one).

**Request Body:**
```json
{
  "phone": "+919876543210"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "OTP sent successfully to +919876543210",
  "expires_in_seconds": 300
}
```

**Notes:**
- Invalidates any existing unused OTP
- Resets retry count to 0
- New 5-minute expiry

---

### 3. Verify OTP & Login
**Endpoint:** `POST /auth/verify-otp`

Verify OTP and complete authentication.

**Request Body:**
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "id": 1,
    "phone": "+919876543210",
    "email": null,
    "name": null,
    "role": "CUSTOMER",
    "is_active": true,
    "is_verified": true,
    "created_at": "2025-12-15T15:30:00Z"
  },
  "tokens": {
    "access_token": "eyJhbGci...",
    "refresh_token": "eyJhbGci...",
    "token_type": "bearer",
    "expires_in": 1800
  },
  "is_new_user": true
}
```

**Errors:**
- `400 Bad Request`:
  ```json
  {
    "detail": "Invalid OTP. 2 attempts remaining."
  }
  ```
- `400 Bad Request`:
  ```json
  {
    "detail": "OTP has expired. Please request a new OTP."
  }
  ```
- `400 Bad Request`:
  ```json
  {
    "detail": "Maximum retry attempts exceeded. OTP has been invalidated. Please request a new OTP."
  }
  ```

---

## 🔄 Token Management

### 4. Refresh Access Token
**Endpoint:** `POST /auth/refresh-token`

Generate new access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGci..."
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGci...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

**Errors:**
- `401`: Invalid or expired refresh token

**Usage:**
Call this endpoint when access token expires (after 30 minutes).

---

### 5. Logout
**Endpoint:** `POST /auth/logout`

Logout user by revoking refresh token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGci..."
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Client Action:**
After logout, client should:
1. Delete stored access token
2. Delete stored refresh token
3. Clear user session data

---

## 👤 User Session

### 6. Get Current User
**Endpoint:** `GET /auth/me`

Get authenticated user's information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "phone": "+919876543210",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER",
    "is_active": true,
    "is_verified": true,
    "created_at": "2025-12-15T15:30:00Z"
  }
}
```

**Errors:**
- `401`: Missing or invalid token

---

### 7. Validate Session
**Endpoint:** `POST /auth/validate-session`

Validate if current access token is valid.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "phone": "+919876543210",
    "role": "CUSTOMER",
    ...
  },
  "message": "Session is valid"
}
```

---

## 🎭 Role Validation

### 8. Check Customer Access
**Endpoint:** `POST /auth/customer/check`

Validate if current user has CUSTOMER role.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "has_access": true,
  "user_role": "CUSTOMER",
  "message": "Access granted"
}
```

**Use Case:** Customer app login validation

---

### 9. Check Seller Access
**Endpoint:** `POST /auth/seller/check`

Validate if current user has SELLER role.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "has_access": false,
  "user_role": "CUSTOMER",
  "message": "Seller role required"
}
```

**Use Case:** Seller panel access control

---

### 10. Check Admin Access
**Endpoint:** `POST /auth/admin/check`

Validate if current user has ADMIN role.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "has_access": false,
  "user_role": "CUSTOMER",
  "message": "Admin role required"
}
```

**Use Case:** Admin panel access control

---

## 📊 Health Check

### 11. Auth Health
**Endpoint:** `GET /auth/health`

Health check for authentication module.

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "module": "authentication",
  "otp_security": {
    "otp_expiry_minutes": 5,
    "max_retry_attempts": 3,
    "resend_enabled": true
  },
  "jwt": {
    "access_token_expire_minutes": 30,
    "refresh_token_expire_days": 7
  },
  "roles": ["CUSTOMER", "SELLER", "ADMIN"]
}
```

---

## 🔒 Security Implementation

### OTP Security ✅
| Feature | Implementation | Status |
|---------|---------------|--------|
| OTP Expiry | 5 minutes | ✅ |
| Retry Limit | Max 3 attempts per OTP | ✅ |
| Resend OTP | Fresh OTP with new expiry | ✅ |
| OTP Invalidation | Auto-invalidate on resend | ✅ |

### JWT Security ✅
| Feature | Implementation | Status |
|---------|---------------|--------|
| Access Token | 30 min expiry, includes user_id + role | ✅ |
| Refresh Token | 7 day expiry, stored in DB | ✅ |
| Token Revocation | Logout revokes refresh token | ✅ |
| Role in Token | RBAC enforced on backend | ✅ |

---

## 🎯 Integration Guide

### Mobile App (Android/iOS)

```javascript
// 1. Send OTP
const sendOTP = async (phone) => {
  const response = await fetch('http://api.example.com/api/v1/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return response.json();
};

// 2. Verify OTP
const verifyOTP = async (phone, otp) => {
  const response = await fetch('http://api.example.com/api/v1/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp })
  });
  const data = await response.json();

  // Store tokens
  await SecureStore.setItemAsync('access_token', data.tokens.access_token);
  await SecureStore.setItemAsync('refresh_token', data.tokens.refresh_token);

  return data;
};

// 3. Make authenticated requests
const getProfile = async () => {
  const token = await SecureStore.getItemAsync('access_token');
  const response = await fetch('http://api.example.com/api/v1/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

// 4. Refresh token when expired
const refreshToken = async () => {
  const refresh = await SecureStore.getItemAsync('refresh_token');
  const response = await fetch('http://api.example.com/api/v1/auth/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refresh })
  });
  const data = await response.json();
  await SecureStore.setItemAsync('access_token', data.access_token);
  return data;
};
```

### Web Application

```javascript
// Use Axios interceptor for automatic token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      const { data } = await axios.post('/api/v1/auth/refresh-token', {
        refresh_token: refreshToken
      });

      localStorage.setItem('access_token', data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);
```

---

## 🧪 Testing with cURL

```bash
# 1. Send OTP
curl -X POST http://localhost:8000/api/v1/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}'

# 2. Resend OTP
curl -X POST http://localhost:8000/api/v1/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210"}'

# 3. Verify OTP
curl -X POST http://localhost:8000/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+919876543210", "otp": "123456"}'

# 4. Get user info (use token from verify response)
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## ✅ Final Validation Checklist

- ✅ All auth endpoints implemented
- ✅ OTP expiry enforced (5 minutes)
- ✅ OTP retry limit enforced (max 3)
- ✅ Resend OTP functionality
- ✅ JWT access + refresh implemented
- ✅ Role validation enforced (CUSTOMER/SELLER/ADMIN)
- ✅ No frontend auth logic
- ✅ Centralized system for ALL platforms

---

## 📞 Support

For issues or questions, please check:
1. API health endpoint: `GET /api/v1/auth/health`
2. Interactive docs: `http://localhost:8000/docs`
3. Alternative docs: `http://localhost:8000/redoc`
