import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/hooks/useAuth';
import SimpleSplashScreen from '@/screens/auth/SimpleSplashScreen';
import AppIntroCarousel from '@/screens/auth/AppIntroCarousel';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import OTPScreen from '@/screens/auth/OTPScreen';
import MainTabNavigator from '@/navigation/MainTabNavigator';

export type RootStackParamList = {
  Splash: undefined;
  AppIntro: undefined;
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
  const { user, isLoading, hasSeenOnboarding } = useAuth();

  if (user) {
    // If user is authenticated, show Main app
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    );
  }

  // Always show splash screen first, then app intro carousel, then login
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SimpleSplashScreen} />
      <Stack.Screen name="AppIntro" component={AppIntroCarousel} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
}
