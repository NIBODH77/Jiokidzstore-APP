import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "@/screens/main/CategoriesScreen";
import CategoryListingScreen from "@/screens/product/CategoryListingScreen";
import ProductDetailScreen from "@/screens/product/ProductDetailScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { TopHeader } from "@/components/TopHeader";

export type CategoriesStackParamList = {
  Categories: undefined;
  CategoryListing: { categoryId: string; categoryName: string };
  ProductDetail: { productId: string };
};

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

export default function CategoriesStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ 
          header: () => <TopHeader showBackButton={false} />
        }}
      />
      <Stack.Screen
        name="CategoryListing"
        component={CategoryListingScreen}
        options={{
          header: () => <TopHeader showBackButton={true} />
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
