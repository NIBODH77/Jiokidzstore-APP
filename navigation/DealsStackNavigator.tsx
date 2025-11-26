import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DealsScreen from '@/screens/deals/DealsScreen';
import ProductDetailScreen from '@/screens/product/ProductDetailScreen';
import { useTheme } from '@/hooks/useTheme';
import { getCommonScreenOptions } from '@/navigation/screenOptions';

import { HeaderTitle } from '@/components/HeaderTitle';

export type DealsStackParamList = {
  Deals: undefined;
  DealDetail: { productId: string };
};

const Stack = createNativeStackNavigator<DealsStackParamList>();

export default function DealsStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Deals"
        component={DealsScreen}
        options={{ headerTitle: () => <HeaderTitle title="Deals & Offers" /> }}
      />
      <Stack.Screen
        name="DealDetail"
        component={ProductDetailScreen}
        options={{ 
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Stack.Navigator>
  );
}
