import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WishlistScreen from "@/screens/main/WishlistScreen";
import ProductDetailScreen from "@/screens/product/ProductDetailScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type WishlistStackParamList = {
  Wishlist: undefined;
  ProductDetail: { productId: string };
};

const Stack = createNativeStackNavigator<WishlistStackParamList>();

export default function WishlistStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ 
          headerTitle: "My Wishlist",
          tabBarStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ 
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Stack.Navigator>
  );
}
