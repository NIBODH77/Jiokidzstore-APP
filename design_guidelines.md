# JioKidz E-Commerce App - Design Guidelines

## Brand Identity
**App Name:** JioKidz  
**Logo:** Colorful, playful wordmark with vibrant multi-color characters  
**Target Audience:** Parents shopping for kids (ages 0-12)  
**Theme:** Bright, cheerful, child-friendly with pink primary accent

## Color Palette
**Primary Colors:**
- Primary Pink: `#FF6B9D` (buttons, CTAs, active states)
- Secondary Pink: `#FFE5EE` (backgrounds, highlights)
- Accent Purple: `#9B59B6` (secondary actions)

**Neutral Colors:**
- Background White: `#FFFFFF`
- Background Light: `#F8F9FA`
- Text Dark: `#2C3E50`
- Text Gray: `#7F8C8D`
- Border Light: `#E8E8E8`

**Functional Colors:**
- Success Green: `#27AE60`
- Warning Orange: `#F39C12`
- Error Red: `#E74C3C`
- Info Blue: `#3498DB`

**Category Colors:** (matching logo vibrancy)
- Boy Fashion: `#3498DB`
- Girl Fashion: `#FF6B9D`
- Footwear: `#F39C12`
- Toys: `#9B59B6`
- Diapers: `#27AE60`

## Typography
**Font Family:** System default (San Francisco for iOS, Roboto for Android)

**Scale:**
- H1 (Page Titles): 28px, Bold
- H2 (Section Headers): 22px, SemiBold
- H3 (Card Titles): 18px, SemiBold
- Body Large: 16px, Regular
- Body: 14px, Regular
- Caption: 12px, Regular
- Button Text: 16px, SemiBold

## Spacing System
Use 4px base unit:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px

## Architecture Decisions

### Authentication
**SSO Required** - E-commerce app with cloud sync
- Apple Sign-In (primary for iOS)
- Google Sign-In (primary for Android)
- Optional: Phone number OTP for India market
- Include privacy policy & terms links
- Profile includes: avatar, name, email, phone, addresses

### Navigation Structure
**Tab Navigation (4 tabs):**
1. Home (house icon)
2. Categories (grid icon)
3. Wishlist (heart icon)
4. Profile (user icon)

**Floating Action Button:** Cart icon with badge (overlays bottom-right)

**Modal Screens:** Product Details, Checkout Flow, Filters, Search

## Screen Specifications

### 1. Splash Screen
- Full-screen JioKidz animated logo on pink gradient background
- Logo scales in with bounce animation (800ms)
- Auto-transitions to onboarding or home after 2s

### 2. Onboarding (3 screens)
- Full-screen carousel with skip button (top-right)
- Illustrations showing: shopping benefits, fast delivery, secure checkout
- Dot indicators at bottom
- "Get Started" button on final screen
- Swipeable gesture navigation

### 3. Authentication Screens
**Login:**
- JioKidz logo at top (centered, 80px height)
- Large "Welcome Back!" heading
- SSO buttons (Apple, Google) with respective brand colors
- "OR" divider line
- Phone number input with country code selector (+91 default)
- "Send OTP" primary button
- "New user? Sign Up" link at bottom

**OTP Verification:**
- 6-digit OTP input boxes (large, pink border on active)
- Countdown timer "Resend OTP in 0:30"
- Auto-advance on digit entry

### 4. Home Screen
**Header (Fixed):**
- Location selector (left): "Mumbai 🏠" dropdown
- JioKidz logo (center, 50px)
- Notification bell (right) with red dot if unread

**Search Bar:**
- Rounded rectangle (8px radius)
- Placeholder: "Search for toys, clothes, diapers..."
- Pink search icon (left)
- Voice search icon (right)

**Content (Scrollable):**
- Category circles (horizontal scroll): 8 circular icons with labels
- Flash Sale banner: Full-width card with countdown timer, pink gradient
- "Trending Now" section: 2-column product grid
- "Best Sellers" section: Horizontal scrollable product cards
- "Shop by Age" section: Age group cards (0-1yr, 1-3yr, etc.)

**Tab Bar (Fixed Bottom):**
- Pink accent for active tab
- Badge on cart icon showing item count

### 5. Category Listing
**Header:**
- Back button (left)
- Category name (center)
- Filter icon (right) - opens filter modal
- Sort dropdown below header (Price, Popularity, New Arrivals)

**Filter Bar (Sticky):**
- Horizontal scrollable chips: "Age Group", "Brand", "Price", "Rating"
- Active filters show count badge

**Product Grid:**
- 2 columns on mobile
- Product cards with: image, brand, title (2 lines max), price, discount %, rating stars

### 6. Product Detail
**Image Gallery:**
- Full-width swipeable carousel
- Dot indicators
- Zoom on double-tap
- Share icon (top-right)
- Back button (top-left)

**Content (Scrollable):**
- Brand name (gray, 12px)
- Product title (18px, bold, 3 lines max)
- Rating stars + review count
- Price: Large, bold, primary pink
- MRP strikethrough + discount % in green
- Size/Color selector: Horizontal chips (outline when inactive, filled when selected)
- "Add to Cart" button: Fixed bottom, full-width, pink with shadow
- "Buy Now" button: Secondary, outline style
- Product description: Expandable section
- Specifications: Table view
- Reviews section: Top 3 reviews with photos, "View All" button

### 7. Shopping Cart
**Header:** "My Cart (3 items)"

**Cart Items (Scrollable):**
- Product card: Image (left), details (center), quantity controls (right)
- Swipe-to-delete gesture
- Wishlist icon to move item
- Stock status indicator (green dot)

**Price Breakdown (Fixed Bottom):**
- Subtotal, Delivery, Discount (green)
- Total: Large, bold
- "Proceed to Checkout" button

**Empty State:** Cute illustration, "Your cart is empty", "Start Shopping" button

### 8. Checkout Flow

**Address Selection:**
- List of saved addresses with radio buttons
- "+ Add New Address" card at top
- "Deliver Here" button (fixed bottom)

**Add/Edit Address Form:**
- Full name, phone number
- Pincode (auto-fills city/state)
- Address line, Landmark
- Address type chips: Home, Work, Other
- "Save Address" button

**Payment Method:**
- Options: UPI, Card, Netbanking, COD
- Expandable cards for each method
- "Apply Coupon" section with input field

**Order Summary:**
- Product list (collapsed, expandable)
- Price breakdown
- Delivery address (compact)
- "Place Order" button (pink, full-width)

**Order Confirmation:**
- Green checkmark animation
- Order number (large)
- Estimated delivery date
- "Track Order" button
- "Continue Shopping" secondary button

### 9. User Profile
**Header:** Profile avatar (large, circular), name, email

**Menu Items (List):**
- My Orders (with count badge)
- My Wishlist (heart icon)
- Saved Addresses (location icon)
- Notifications (bell icon)
- Help & Support (question icon)
- Settings (gear icon)
- Logout (red text)

### 10. Order Tracking
**Header:** Order #12345, Status badge

**Timeline:**
- Vertical stepper with pink checkmarks for completed steps
- Steps: Placed, Confirmed, Shipped, Out for Delivery, Delivered
- Timestamps for each completed step

**Delivery Details:**
- Estimated delivery date (large, highlighted)
- Delivery address
- Tracking ID with copy button

**Order Items:** Product cards (non-interactive)

## Component Design System

### Buttons
**Primary:**
- Background: `#FF6B9D`
- Text: White, 16px SemiBold
- Padding: 16px vertical, 24px horizontal
- Border radius: 8px
- Shadow: 0px 2px 8px rgba(255, 107, 157, 0.3)
- Press state: 85% opacity

**Secondary:**
- Border: 2px `#FF6B9D`
- Text: `#FF6B9D`, 16px SemiBold
- Padding: 14px vertical, 22px horizontal
- Border radius: 8px
- Press state: Light pink background

### Product Cards
- White background
- Border radius: 12px
- Shadow: 0px 2px 4px rgba(0,0,0,0.08)
- Image aspect ratio: 1:1
- Padding: 12px
- Wishlist icon: Top-right overlay

### Input Fields
- Border: 1px `#E8E8E8`
- Border radius: 8px
- Padding: 14px
- Focus state: Pink border
- Error state: Red border + helper text

### Cards
- Background: White
- Border radius: 12px
- Shadow: 0px 1px 3px rgba(0,0,0,0.1)
- Padding: 16px

## Interaction Design
- All touchables: Scale down to 0.95 on press
- List items: Ripple effect (Android), opacity (iOS)
- Swipe-to-delete: Red background reveals with trash icon
- Pull-to-refresh: Pink spinner
- Loading states: Pink shimmer effect
- Add to cart: Bounce animation on cart icon
- Transitions: 200-300ms smooth animations

## Accessibility
- Minimum touch target: 44x44px
- Color contrast ratio: 4.5:1 for text
- All images have alt text
- Form inputs have labels
- Error messages are clear and actionable
- Support screen readers
- Font scaling support

## Assets Required
- Category icons (8): Fashion, Footwear, Toys, Books, Diapers, Accessories, Electronics, Sports
- Onboarding illustrations (3): Shopping, Delivery, Secure
- Empty state illustrations: Cart, Wishlist, Orders, Search
- Product placeholder images
- Payment method icons: UPI, Card, Netbanking, COD
- Success/Error animations (Lottie)