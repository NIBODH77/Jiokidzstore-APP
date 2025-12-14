import React, { useState } from 'react';
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

export default function RootNavigator() {
  const { user, isLoading, hasSeenOnboarding } = useAuth();
  const [isSplashFinished, setSplashFinished] = useState(false);

  if (!isSplashFinished || isLoading) {
    return <SimpleSplashScreen onFinish={() => setSplashFinished(true)} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen}
            options={{ animationTypeForReplace: !user ? 'pop' : 'push' }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
}
