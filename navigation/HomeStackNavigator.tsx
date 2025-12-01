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
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={false} />
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
    </Stack.Navigator>
  );
}