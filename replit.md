# JioKidz E-Commerce Application

## Overview

JioKidz is a full-stack e-commerce mobile application for kids' fashion and baby products. The project consists of a React Native/Expo frontend targeting Android, iOS, and web platforms, paired with a FastAPI Python backend using PostgreSQL for data persistence. The application follows a modern e-commerce architecture with features including product browsing, cart management, order processing, payment integration, and user authentication via OTP.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React Native with Expo SDK 54
- Uses the new React Native architecture (React 19.1, RN 0.81.5)
- Expo Router is not used; navigation relies on React Navigation (native-stack, bottom-tabs)
- State management through Redux with react-redux
- Animations powered by react-native-reanimated
- Gesture handling via react-native-gesture-handler

**Key Design Patterns**:
- Component-based architecture with reusable UI components in `/components`
- Screen components organized in `/screens` directory
- Custom hooks in `/hooks` for shared logic (useAuth, useTheme, useResponsive)
- Centralized theming system in `/constants/theme`
- Path aliasing with `@/` prefix pointing to project root

**Navigation Structure**:
- RootNavigator handles main navigation flow
- Bottom tab navigation for primary app sections
- Native stack navigation for screen transitions
- Navigation ref exported for programmatic navigation

### Backend Architecture

**Framework**: FastAPI (Python 3.11+)
- RESTful API design with versioned endpoints (`/api/v1`)
- Pydantic v2 for request/response validation
- SQLAlchemy 2.0 as ORM
- Alembic for database migrations
- JWT-based authentication using python-jose

**API Structure**:
- Authentication: OTP-based phone verification
- Products: Listing, filtering, categories
- Cart: CRUD operations with validation
- Orders: Creation, tracking, cancellation
- Payments: Initiation, verification, webhooks
- Coupons: Application and validation
- Refunds: Processing and status tracking
- Users: Profile management

**Database Models**:
- Users with phone-based authentication
- Products with categories, images, inventory
- Cart and cart items
- Orders and order items
- Addresses for delivery
- Wishlists
- Payment and refund tracking
- Coupon usage

### Data Flow

1. Frontend makes API calls to FastAPI backend
2. Backend validates requests with Pydantic schemas
3. SQLAlchemy handles database operations
4. Responses return JSON with proper HTTP status codes
5. Frontend updates Redux state and UI accordingly

## External Dependencies

### Frontend Dependencies
- **Expo ecosystem**: expo-image, expo-linear-gradient, expo-haptics, expo-blur
- **Navigation**: @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs
- **State**: Redux, react-redux
- **Storage**: @react-native-async-storage/async-storage
- **Icons**: @expo/vector-icons, lucide-react-native
- **Animations**: react-native-reanimated, react-native-gesture-handler

### Backend Dependencies
- **Web Framework**: FastAPI, uvicorn
- **Database**: PostgreSQL via psycopg2-binary
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Auth**: python-jose (JWT), passlib, bcrypt
- **Config**: pydantic-settings, python-dotenv

### Infrastructure Requirements
- PostgreSQL database (configured via DATABASE_URL environment variable)
- Web server capable of running Python/uvicorn
- Expo development server for frontend (port 8080 for web preview)

### Development Tools
- TypeScript for frontend type safety
- ESLint with Expo configuration
- Prettier for code formatting
- Babel with module-resolver for path aliases