import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WishlistScreen from "@/screens/main/WishlistScreen";
import ProductDetailScreen from "@/screens/product/ProductDetailScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { TopHeader } from "@/components/TopHeader";

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
          headerShown: true,
          header: () => <TopHeader showBackButton={true} hideWishlistIcon={true} />
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ 
          headerShown: true,
          header: () => <TopHeader showBackButton={true} />
        }}
      />
    </Stack.Navigator>
  );
}
