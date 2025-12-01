import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParentingScreen from '@/screens/main/ParentingScreen';
import ProductDetailScreen from '@/screens/product/ProductDetailScreen';
import { useTheme } from '@/hooks/useTheme';
import { getCommonScreenOptions } from '@/navigation/screenOptions';
import { TopHeader } from '@/components/TopHeader';

export type ParentingStackParamList = {
  Parenting: undefined;
  ProductDetail: { productId: string };
};

const Stack = createNativeStackNavigator<ParentingStackParamList>();

export default function ParentingStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Parenting"
        component={ParentingScreen}
        options={{ 
          header: () => <TopHeader showBackButton={false} />
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ 
          headerShown: true,
          header: () => <TopHeader showBackButton={true} />,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Stack.Navigator>
  );
}
