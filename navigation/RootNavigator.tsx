import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/hooks/useAuth';
import SplashScreen from '@/screens/auth/SplashScreen';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import OTPScreen from '@/screens/auth/OTPScreen';
import MainTabNavigator from '@/navigation/MainTabNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTP: { phone: string; name?: string };
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define an AuthStack that always includes Onboarding, Login, and OTP
const AuthStack = () => {
  const { hasSeenOnboarding } = useAuth(); // hasSeenOnboarding is used here for initialRouteName

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={hasSeenOnboarding ? "Login" : "Onboarding"}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};


export default function RootNavigator() {
  const { user, isLoading, hasSeenOnboarding } = useAuth(); // Keep hasSeenOnboarding for initial render logic if needed

  if (isLoading) {
    // If loading, render SplashScreen and allow navigation to Login/Onboarding
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* Register Auth screens here temporarily if SplashScreen navigates to them */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
      </Stack.Navigator>
    );
  }

  if (user) {
    // If user is authenticated, show Main app
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    );
  }

  // If not loading and no user, show the full AuthStack (including OTP)
  // The initialRouteName will handle whether to go to Onboarding or Login
  return <AuthStack />;
}
