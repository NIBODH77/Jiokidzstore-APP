import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { ThemedText } from '@/components/ThemedText';

interface ScrollableHeaderBackProps {
  title: string;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollViewRef?: React.RefObject<ScrollView>;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

export function ScrollableHeaderBack({
  title,
  onScroll,
  scrollViewRef,
  children,
  contentContainerStyle,
}: ScrollableHeaderBackProps) {
  const insets = useSafeAreaInsets();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-100)).current;
  const { goBack } = require('@react-navigation/native').useNavigation();
  const navigation = require('@react-navigation/native').useNavigation();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const shouldShow = offsetY > 50;

    if (shouldShow !== isHeaderVisible) {
      setIsHeaderVisible(shouldShow);
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: shouldShow ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslateY, {
          toValue: shouldShow ? 0 : -100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }

    onScroll?.(event);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerCard,
          {
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
            paddingTop: insets.top,
          },
        ]}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
        >
          <Feather name="chevron-left" size={28} color={Colors.light.primary} />
        </Pressable>
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
        <View style={styles.spacer} />
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: Spacing.sm,
    marginRight: Spacing.md,
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
    flex: 1,
  },
  spacer: {
    width: 40,
  },
});
