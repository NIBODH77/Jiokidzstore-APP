import React, { useState } from "react";
import { StyleSheet } from "react-native"; // Removed Button, View
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Removed useSafeAreaInsets
import { StatusBar } from "expo-status-bar";
// Removed import AsyncStorage

import { navigationRef } from "@/navigation/navigationRef";
import RootNavigator from "@/navigation/RootNavigator";
import { AuthProvider } from "@/hooks/useAuth"; // Removed useAuth
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function App() {
  return (
  <ErrorBoundary>
    <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <KeyboardProvider>
            <AuthProvider>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
              </NavigationContainer>
            </AuthProvider>
            <StatusBar style="dark" />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
  </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
