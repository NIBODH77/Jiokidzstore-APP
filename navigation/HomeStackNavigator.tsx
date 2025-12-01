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
          headerShown: false,
        }}
      />

      {/* AGE WISE SCREEN */}
      <Stack.Screen
        name="AgeWise"
        component={AgeWiseScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* AGE GROUP DETAIL SCREEN */}
      <Stack.Screen
        name="AgeGroupDetail"
        component={AgeGroupDetailScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* CATEGORY AGGREGATOR SCREEN */}
      <Stack.Screen
        name="CategoryAggregator"
        component={CategoryAggregatorScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* PRODUCT DETAIL */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* SEARCH */}
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />

      {/* REVIEWS */}
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* CART */}
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* CHECKOUT ADDRESS */}
      <Stack.Screen
        name="CheckoutAddress"
        component={CheckoutAddressScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* ADD / EDIT ADDRESS */}
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* CHECKOUT PAYMENT */}
      <Stack.Screen
        name="CheckoutPayment"
        component={CheckoutPaymentScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* ORDER SUMMARY */}
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />

      {/* ORDER CONFIRMATION */}
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ headerShown: false }}
      />

      {/* WISHLIST */}
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}