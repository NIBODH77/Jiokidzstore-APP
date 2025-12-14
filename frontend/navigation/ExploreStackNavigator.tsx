import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '@/screens/main/ExploreScreen';
import ProductDetailScreen from '@/screens/product/ProductDetailScreen';
import { useTheme } from '@/hooks/useTheme';
import { getCommonScreenOptions } from '@/navigation/screenOptions';
import { TopHeader } from '@/components/TopHeader';

export type ExploreStackParamList = {
  Explore: undefined;
  ProductDetail: { productId: string };
};

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={false} />
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ 
          headerShown: true,
          header: (props) => <TopHeader {...props} showBackButton={true} />
        }}
      />
    </Stack.Navigator>
  );
}
