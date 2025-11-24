import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, FlatList, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const TRENDING_SEARCHES = ['Toys', 'Girl Clothes', 'Baby Diapers', 'Boy Shoes'];

interface ModernSearchBarProps {
  onSearch?: (text: string) => void;
  onMicPress?: () => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
}

export function ModernSearchBar({ 
  onSearch, 
  onMicPress,
  onLocationPress,
  onNotificationPress
}: ModernSearchBarProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <LinearGradient
      colors={['#FFB6D9', '#FF6B9D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Top Row: Logo and Notification Icon */}
      <View style={styles.topRow}>
        <View style={styles.logoSection}>
          <Image
            source={require('@/attached_assets/JioKidslogo_1763923777175.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={14} color="#FFFFFF" />
            <Text style={styles.locationText}>Delhi, India</Text>
          </View>
        </View>
        <Pressable style={styles.notificationButton} onPress={onNotificationPress}>
          <Feather name="bell" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Search Box */}
      <View
        style={[styles.searchBox, isFocused && styles.searchBoxFocused]}
      >
        <View style={styles.content}>
          <Feather name="search" size={18} color={Colors.light.textGray} />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={Colors.light.textGray}
            value={text}
            onChangeText={(newText) => {
              setText(newText);
              onSearch?.(newText);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {text.length > 0 && (
            <Pressable onPress={() => setText('')}>
              <Feather name="x" size={18} color={Colors.light.textGray} />
            </Pressable>
          )}
          <Pressable onPress={onMicPress}>
            <Feather name="mic" size={18} color={Colors.light.primary} />
          </Pressable>
        </View>
      </View>

      {/* Trending Searches */}
      {isFocused && text.length === 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Trending Searches</Text>
          <FlatList
            data={TRENDING_SEARCHES}
            renderItem={({ item }) => (
              <Pressable
                style={styles.suggestionItem}
                onPress={() => setText(item)}
              >
                <Feather name="trending-up" size={14} color={Colors.light.primary} />
                <Text style={styles.suggestionText}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item}
            scrollEnabled={false}
          />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 20,
    zIndex: 10,
    justifyContent: 'space-between',
    minHeight: 140,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 90,
    height: 40,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB6D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBoxFocused: {
    borderColor: Colors.light.primary,
    shadowOpacity: 0.15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  input: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 15,
    fontWeight: '500',
  },
  suggestionsContainer: {
    marginTop: Spacing.md,
    backgroundColor: 'rgba(255,107,157,0.05)',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.lg,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.textGray,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
});
