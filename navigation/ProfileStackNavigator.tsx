import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import ProfileScreen from "@/screens/ProfileScreen";
import EditProfileScreen from "@/screens/account/EditProfileScreen";
import OrderHistoryScreen from "@/screens/account/OrderHistoryScreen";
import OrderTrackingScreen from "@/screens/account/OrderTrackingScreen";
import NotificationsScreen from "@/screens/account/NotificationsScreen";
import SavedAddressesScreen from "@/screens/account/SavedAddressesScreen";
import HelpSupportScreen from "@/screens/account/HelpSupportScreen";
import SettingsScreen from "@/screens/account/SettingsScreen";
import ProductDetailScreen from "@/screens/product/ProductDetailScreen";
import CrashScreen from "@/screens/CrashScreen";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { Colors } from "@/constants/theme";

import { HeaderTitle } from "@/components/HeaderTitle";

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  OrderHistory: undefined;
  OrderTracking: { orderId: string };
  Notifications: undefined;
  SavedAddresses: undefined;
  HelpSupport: undefined;
  Settings: undefined;
  ProductDetail: { productId: string };
  Crash: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator 
      screenOptions={({ navigation }) => ({
        ...getCommonScreenOptions({ theme, isDark }),
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.backgroundRoot,
        },
        headerTintColor: Colors.light.primary,
        headerBackTitleVisible: false,
      })}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ 
          headerTitle: () => <HeaderTitle title="Edit Profile" />,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ 
          headerTitle: () => <HeaderTitle title="My Orders" />,
        }}
      />
      <Stack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{ 
          headerTitle: () => <HeaderTitle title="Track Order" />,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ 
          headerTitle: () => <HeaderTitle title="Notifications" />,
        }}
      />
      <Stack.Screen
        name="SavedAddresses"
        component={SavedAddressesScreen}
        options={{ 
          headerTitle: () => <HeaderTitle title="My Addresses" />,
        }}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{ 
          headerTitle: () => <HeaderTitle title="Help & Support" />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ 
          headerTitle: () => <HeaderTitle title="Settings" />,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Crash"
        component={CrashScreen}
        options={{ headerTitle: () => <HeaderTitle title="Crash Test" /> }}
      />
    </Stack.Navigator>
  );
}
