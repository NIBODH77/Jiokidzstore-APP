
<old_str>import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <ScreenScrollView>
      <View style={[styles.searchContainer, { marginTop: Spacing.lg }]}>
        <Feather name="search" size={20} color={Colors.light.textGray} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          placeholderTextColor={Colors.light.textGray}
          autoFocus
        />
      </View>
      <View style={styles.content}>
        <ThemedText type="h3">Recent Searches</ThemedText>
        <ThemedText style={styles.placeholder}>Start typing to search...</ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    margin: Spacing.lg,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: Typography.body.fontSize,
    color: Colors.light.text,
  },
  content: { padding: Spacing.lg },
  placeholder: { color: Colors.light.textGray, marginTop: Spacing.md },
});</old_str>
<new_str>import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      {/* Custom Header with Back Button and Search Box */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={10}
          >
            <Feather name="chevron-left" size={32} color="#1F2937" strokeWidth={2.5} />
          </Pressable>
          
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color={Colors.light.textGray} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search products..."
              placeholderTextColor={Colors.light.textGray}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Feather name="x-circle" size={20} color={Colors.light.textGray} />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScreenScrollView>
        <View style={styles.content}>
          <ThemedText type="h3">Recent Searches</ThemedText>
          <ThemedText style={styles.placeholder}>Start typing to search...</ThemedText>
        </View>
      </ScreenScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: Typography.body.fontSize,
    color: Colors.light.text,
  },
  content: { 
    padding: Spacing.lg 
  },
  placeholder: { 
    color: Colors.light.textGray, 
    marginTop: Spacing.md 
  },
});</new_str>
