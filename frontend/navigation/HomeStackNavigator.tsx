import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import AgeWiseScreen from "@/screens/AgeWiseScreen";
import ProductDetailScreen from "@/screens/product/ProductDetailScreen";
import SearchScreen from "@/screens/product/SearchScreen";
import ReviewsScreen from "@/screens/product/ReviewsScreen";
import CartScreen from "@/screens/cart/CartScreen";
import CheckoutAddressScreen from "@/screens/cart/CheckoutAddressScreen";
import AddEditAddressScreen from "@/screens/cart/AddEditAddressScreen";
import CheckoutPaymentScreen from "@/screens/cart/CheckoutPaymentScreen";
import OrderSummaryScreen from "@/screens/cart/OrderSummaryScreen";
import OrderConfirmationScreen from "@/screens/cart/OrderConfirmationScreen";
import CategoryAggregatorScreen from "@/screens/CategoryAggregatorScreen"; // Import new screen
import AgeGroupDetailScreen from "@/screens/AgeGroupDetailScreen"; // Import age group detail screen
import WishlistScreen from "@/screens/main/WishlistScreen";
import NotificationsScreen from "@/screens/main/NotificationsScreen";
import ProfileScreen from "@/screens/main/ProfileScreen";
import CashRefundPage from "@/screens/product/CashRefundPage";
import MyRefundsPage from "@/screens/product/MyRefundsPage";
import OrderHistoryScreen from "@/screens/product/OrderHistoryScreen";
import OrderDetailScreen from "@/screens/product/OrderDetailScreen";
import TrackOrderScreen from "@/screens/product/TrackOrderScreen";
import ContactDetailsScreen from "@/screens/main/ContactDetailsScreen";
import PersonalDetailsScreen from "@/screens/main/PersonalDetailsScreen";
import ChildDetailsScreen from "@/screens/main/ChildDetailsScreen";
import MyPaymentDetailsScreen from "@/screens/payment/MyPaymentDetailsScreen";
import SavedCardsScreen from "@/screens/payment/SavedCardsScreen";
import AddBankAccountScreen from "@/screens/payment/AddBankAccountScreen";
import UPIScreen from "@/screens/payment/UPIScreen";
import WalletsScreen from "@/screens/payment/WalletsScreen";
import NetBankingScreen from "@/screens/payment/NetBankingScreen";
import MyReviewsScreen from '@/screens/product/MyReviewsScreen';
import DiscountCouponsScreen from '@/screens/main/DiscountCouponsScreen';
import InvitesCreditsScreen from '@/screens/product/InvitesCreditsScreen';
import RecentlyViewedScreen from '@/screens/main/RecentlyViewedScreen';
import KidsFashionLandingScreen from '@/screens/kids/KidsFashionLandingScreen';
import AgeGenderLandingScreen from '@/screens/kids/AgeGenderLandingScreen';
import KidsCategoryProductsScreen from '@/screens/kids/KidsCategoryProductsScreen';
import CategoryProductsScreen from '@/screens/product/CategoryProductsScreen';
import UPIPaymentScreen from '@/screens/cart/UPIPaymentScreen';
import CardPaymentScreen from '@/screens/cart/CardPaymentScreen';
import WalletPaymentScreen from '@/screens/cart/WalletPaymentScreen';
import NetBankingPaymentScreen from '@/screens/cart/NetBankingPaymentScreen';
import PaymentReviewScreen from '@/screens/cart/PaymentReviewScreen';
import { TopHeader } from "@/components/TopHeader";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type HomeStackParamList = {
  Home: undefined;
  AgeWise: undefined;
  AgeGroupDetail: { ageRange: string; gender: string; color: string };
  ProductDetail: { productId: string };
  Search: undefined;
  Reviews: { productId: string };
  Cart: undefined;
  CheckoutAddress: undefined;
  AddEditAddress: { addressId?: string };
  CheckoutPayment: undefined;
  OrderSummary: undefined;
  OrderConfirmation: { orderId?: string };
  CategoryAggregator: undefined;
  Wishlist: undefined;
  Notifications: undefined;
  Profile: undefined;
  CashRefund: undefined;
  MyRefunds: undefined;
  OrderHistory: undefined;
  OrderDetail: { orderId: string; order: any };
  TrackOrder: { orderNumber: string };
  ContactDetails: undefined;
  PersonalDetails: undefined;
  ChildDetails: undefined;
  AddressBook: undefined;
  MyPaymentDetails: undefined;
  SavedCards: undefined;
  UPI: undefined;
  Wallets: undefined;
  NetBanking: undefined;
  MyReviews: undefined;
  DiscountCoupons: undefined;
  InvitesCredits: undefined;
  RecentlyViewed: undefined;
  KidsFashionLanding: undefined;
  AgeGenderLanding: { gender: string; ageRange: string; color: string };
  KidsCategoryProducts: { gender: string; ageRange: string; category: string };
  CategoryProducts: { categoryName: string };
  UPIPayment: undefined;
  CardPayment: undefined;
  WalletPayment: undefined;
  NetBankingPayment: undefined;
  PaymentReview: { paymentMethod?: string; paymentDetails?: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      {/* HOME */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* AGE WISE SCREEN */}
      <Stack.Screen
        name="AgeWise"
        component={AgeWiseScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* AGE GROUP DETAIL SCREEN */}
      <Stack.Screen
        name="AgeGroupDetail"
        component={AgeGroupDetailScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* CATEGORY AGGREGATOR SCREEN */}
      <Stack.Screen
        name="CategoryAggregator"
        component={CategoryAggregatorScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* PRODUCT DETAIL */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* SEARCH */}
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideSearchIcon={true} />
        }}
      />

      {/* REVIEWS */}
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* CART */}
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideCartIcon={true} />
        }}
      />

      {/* CHECKOUT ADDRESS */}
      <Stack.Screen
        name="CheckoutAddress"
        component={CheckoutAddressScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* ADD / EDIT ADDRESS */}
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* CHECKOUT PAYMENT */}
      <Stack.Screen
        name="CheckoutPayment"
        component={CheckoutPaymentScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* ORDER SUMMARY */}
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={{
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* ORDER CONFIRMATION */}
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* WISHLIST */}
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideWishlistIcon={true} />
        }}
      />

      {/* NOTIFICATIONS */}
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideNotificationIcon={true} />
        }}
      />

      {/* PROFILE */}
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideProfileIcon={true} />
        }}
      />

      {/* CASH REFUND */}
      <Stack.Screen
        name="CashRefund"
        component={CashRefundPage}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* MY REFUNDS */}
      <Stack.Screen
        name="MyRefunds"
        component={MyRefundsPage}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} title="MyRefunds" />
        }}
      />

      {/* ORDER HISTORY */}
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} title="Order History" />
        }}
      />

      {/* ORDER DETAIL */}
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} title="Order Details" />
        }}
      />

      {/* TRACK ORDER */}
      <Stack.Screen
        name="TrackOrder"
        component={TrackOrderScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} title="Track Order" />
        }}
      />

      {/* CONTACT DETAILS */}
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideProfileIcon={true} />
        }}
      />

      {/* PERSONAL DETAILS */}
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetailsScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideProfileIcon={true} />
        }}
      />

      {/* CHILD DETAILS */}
      <Stack.Screen
        name="ChildDetails"
        component={ChildDetailsScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideProfileIcon={true} />
        }}
      />

      {/* ADDRESS BOOK */}
      <Stack.Screen
        name="AddressBook"
        component={CheckoutAddressScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} hideProfileIcon={true} title="Address Book" />
        }}
      />

      {/* MY PAYMENT DETAILS */}
      <Stack.Screen
        name="MyPaymentDetails"
        component={MyPaymentDetailsScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* SAVED CARDS */}
      <Stack.Screen
        name="SavedCards"
        component={SavedCardsScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* ADD BANK ACCOUNT */}
      <Stack.Screen
        name="AddBankAccount"
        component={AddBankAccountScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* UPI */}
      <Stack.Screen
        name="UPI"
        component={UPIScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* WALLETS */}
      <Stack.Screen
        name="Wallets"
        component={WalletsScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* NET BANKING */}
      <Stack.Screen
        name="NetBanking"
        component={NetBankingScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* MY REVIEWS */}
      <Stack.Screen
        name="MyReviews"
        component={MyReviewsScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* DISCOUNT COUPONS */}
      <Stack.Screen
        name="DiscountCoupons"
        component={DiscountCouponsScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* INVITES & CREDITS */}
      <Stack.Screen
        name="InvitesCredits"
        component={InvitesCreditsScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* RECENTLY VIEWED */}
      <Stack.Screen
        name="RecentlyViewed"
        component={RecentlyViewedScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* KIDS FASHION LANDING */}
      <Stack.Screen
        name="KidsFashionLanding"
        component={KidsFashionLandingScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* AGE GENDER LANDING */}
      <Stack.Screen
        name="AgeGenderLanding"
        component={AgeGenderLandingScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* KIDS CATEGORY PRODUCTS */}
      <Stack.Screen
        name="KidsCategoryProducts"
        component={KidsCategoryProductsScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />

      {/* CATEGORY PRODUCTS */}
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* UPI PAYMENT */}
      <Stack.Screen
        name="UPIPayment"
        component={UPIPaymentScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* CARD PAYMENT */}
      <Stack.Screen
        name="CardPayment"
        component={CardPaymentScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* WALLET PAYMENT */}
      <Stack.Screen
        name="WalletPayment"
        component={WalletPaymentScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* NET BANKING PAYMENT */}
      <Stack.Screen
        name="NetBankingPayment"
        component={NetBankingPaymentScreen}
        options={{ 
          headerShown: false
        }}
      />

      {/* PAYMENT REVIEW */}
      <Stack.Screen
        name="PaymentReview"
        component={PaymentReviewScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />
    </Stack.Navigator>
  );
}