import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import JioKidsLandingScreen from '@/screens/main/JioKidsLandingScreen';
import { useTheme } from '@/hooks/useTheme';
import { Colors } from '@/constants/theme';

export type LandingTabParamList = {
  ShoppingLanding: undefined;
  ExploreTab: undefined;
  ParentingTab: undefined;
};

const Tab = createBottomTabNavigator<LandingTabParamList>();

function ExploreScreen() {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderEmoji}>🔍</Text>
      <Text style={styles.placeholderTitle}>Explore</Text>
      <Text style={styles.placeholderSubtitle}>Coming Soon</Text>
    </View>
  );
}

function ParentingScreen() {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderEmoji}>👨‍👩‍👧</Text>
      <Text style={styles.placeholderTitle}>Parenting</Text>
      <Text style={styles.placeholderSubtitle}>Coming Soon</Text>
    </View>
  );
}

export default function LandingTabNavigator() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <Tab.Navigator
      initialRouteName="ShoppingLanding"
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.select({
            ios: 'transparent',
            android: '#FFFFFF',
          }),
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          paddingBottom: 16,
          marginBottom: 8,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={100}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="ShoppingLanding"
        component={JioKidsLandingScreen}
        options={{
          tabBarLabel: 'Shopping',
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
          tabBarButton: ({ children, style }) => (
            <Pressable
              style={style as any}
              onPress={() => {
                navigation.navigate('Main');
              }}
            >
              {children}
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ParentingTab"
        component={ParentingScreen}
        options={{
          tabBarLabel: 'Parenting',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  placeholderEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  placeholderSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});
