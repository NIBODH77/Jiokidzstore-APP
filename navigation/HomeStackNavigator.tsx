// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { LinearGradient } from "expo-linear-gradient";
// import HomeScreen from "@/screens/HomeScreen";
// import ProductDetailScreen from "@/screens/product/ProductDetailScreen";
// import SearchScreen from "@/screens/product/SearchScreen";
// import FlashSaleScreen from "@/screens/product/FlashSaleScreen";
// import AllProductsScreen from "@/screens/product/AllProductsScreen";
// import ReviewsScreen from "@/screens/product/ReviewsScreen";
// import CartScreen from "@/screens/cart/CartScreen";
// import CheckoutAddressScreen from "@/screens/cart/CheckoutAddressScreen";
// import AddEditAddressScreen from "@/screens/cart/AddEditAddressScreen";
// import CheckoutPaymentScreen from "@/screens/cart/CheckoutPaymentScreen";
// import OrderSummaryScreen from "@/screens/cart/OrderSummaryScreen";
// import OrderConfirmationScreen from "@/screens/cart/OrderConfirmationScreen";
// import { HeaderTitle } from "@/components/HeaderTitle";
// import { useTheme } from "@/hooks/useTheme";
// import { getCommonScreenOptions } from "@/navigation/screenOptions";

// export type HomeStackParamList = {
//   Home: undefined;
//   ProductDetail: { productId: string };
//   Search: undefined;
//   FlashSale: undefined;
//   AllProducts: undefined;
//   Reviews: { productId: string };
//   Cart: undefined;
//   CheckoutAddress: undefined;
//   AddEditAddress: { addressId?: string };
//   CheckoutPayment: undefined;
//   OrderSummary: undefined;
//   OrderConfirmation: { orderId?: string };
// };

// const Stack = createNativeStackNavigator<HomeStackParamList>();

// export default function HomeStackNavigator() {
//   const { theme, isDark } = useTheme();

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         ...getCommonScreenOptions({ theme, isDark }),
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="ProductDetail"
//         component={ProductDetailScreen}
//         options={{
//           headerShown: false,
//           tabBarStyle: { display: 'none' },
//         }}
//       />
//       <Stack.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="FlashSale"
//         component={FlashSaleScreen}
//         options={{ title: "Flash Sale" }}
//       />
//       <Stack.Screen
//         name="AllProducts"
//         component={AllProductsScreen}
//         options={{ title: "All Products" }}
//       />
//       <Stack.Screen
//         name="Reviews"
//         component={ReviewsScreen}
//         options={{ title: "Reviews & Ratings" }}
//       />
//       <Stack.Screen
//         name="Cart"
//         component={CartScreen}
//         options={{ title: "My Cart" }}
//       />
//       <Stack.Screen
//         name="CheckoutAddress"
//         component={CheckoutAddressScreen}
//         options={{ title: "Select Address" }}
//       />
//       <Stack.Screen
//         name="AddEditAddress"
//         component={AddEditAddressScreen}
//         options={({ route }) => ({
//           title: route.params?.addressId ? "Edit Address" : "Add New Address",
//         })}
//       />
//       <Stack.Screen
//         name="CheckoutPayment"
//         component={CheckoutPaymentScreen}
//         options={{ title: "Payment Method" }}
//       />
//       <Stack.Screen
//         name="OrderSummary"
//         component={OrderSummaryScreen}
//         options={{ title: "Order Summary" }}
//       />
//       <Stack.Screen
//         name="OrderConfirmation"
//         component={OrderConfirmationScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }




import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import ProductDetailScreen from "@/screens/product/ProductDetailScreen";
import SearchScreen from "@/screens/product/SearchScreen";
import FlashSaleScreen from "@/screens/product/FlashSaleScreen";
import AllProductsScreen from "@/screens/product/AllProductsScreen";
import ReviewsScreen from "@/screens/product/ReviewsScreen";
import CartScreen from "@/screens/cart/CartScreen";
import CheckoutAddressScreen from "@/screens/cart/CheckoutAddressScreen";
import AddEditAddressScreen from "@/screens/cart/AddEditAddressScreen";
import CheckoutPaymentScreen from "@/screens/cart/CheckoutPaymentScreen";
import OrderSummaryScreen from "@/screens/cart/OrderSummaryScreen";
import OrderConfirmationScreen from "@/screens/cart/OrderConfirmationScreen";
import CategoryAggregatorScreen from "@/screens/CategoryAggregatorScreen"; // Import new screen
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  Search: undefined;
  FlashSale: undefined;
  AllProducts: undefined;
  Reviews: { productId: string };
  Cart: undefined;
  CheckoutAddress: undefined;
  AddEditAddress: { addressId?: string };
  CheckoutPayment: undefined;
  OrderSummary: undefined;
  OrderConfirmation: { orderId?: string };
  CategoryAggregator: undefined; // Add new screen to param list
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

      {/* CATEGORY AGGREGATOR SCREEN */}
      <Stack.Screen
        name="CategoryAggregator"
        component={CategoryAggregatorScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Categories" />, // A generic title for this aggregated view
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

      {/* FLASH SALE */}
      <Stack.Screen
        name="FlashSale"
        component={FlashSaleScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Flash Sale" />,
        }}
      />

      {/* ALL PRODUCTS */}
      <Stack.Screen
        name="AllProducts"
        component={AllProductsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="All Products" />,
        }}
      />

      {/* REVIEWS */}
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Reviews & Ratings" />,
        }}
      />

      {/* CART */}
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: () => <HeaderTitle title="My Cart" />,
        }}
      />

      {/* CHECKOUT ADDRESS */}
      <Stack.Screen
        name="CheckoutAddress"
        component={CheckoutAddressScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Select Address" />,
        }}
      />

      {/* ADD / EDIT ADDRESS */}
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <HeaderTitle
              title={route.params?.addressId ? "Edit Address" : "Add New Address"}
            />
          ),
        })}
      />

      {/* CHECKOUT PAYMENT */}
      <Stack.Screen
        name="CheckoutPayment"
        component={CheckoutPaymentScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Payment Method" />,
        }}
      />

      {/* ORDER SUMMARY */}
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Order Summary" />,
        }}
      />

      {/* ORDER CONFIRMATION */}
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
