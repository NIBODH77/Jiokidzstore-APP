import React, { useState } from 'react';
import { StyleSheet, Pressable, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface SearchBarProps {
  onSearch?: (text: string) => void;
  onMicPress?: () => void;
}

export function SearchBar({ onSearch, onMicPress }: SearchBarProps) {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Feather name="search" size={18} color={Colors.light.textGray} />
          <TextInput
            style={styles.input}
            placeholder="Search toys, clothes, diapers..."
            placeholderTextColor={Colors.light.textGray}
            value={text}
            onChangeText={(newText) => {
              setText(newText);
              onSearch?.(newText);
            }}
          />
          <Pressable onPress={onMicPress}>
            <Feather name="mic" size={18} color={Colors.light.primary} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    padding: 0,
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
    fontSize: 14,
    fontWeight: '500',
  },
});
