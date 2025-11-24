import React from 'react';
import { View, StyleSheet, Switch, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing } from '@/constants/theme';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [orderUpdates, setOrderUpdates] = React.useState(true);

  return (
    <ScreenScrollView contentContainerStyle={{ paddingBottom: Spacing.xl }}>
      <View style={styles.container}>
        <ThemedText type="h3" style={styles.sectionTitle}>Notifications</ThemedText>
        <View style={styles.setting}>
          <ThemedText>Push Notifications</ThemedText>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.setting}>
          <ThemedText>Order Updates</ThemedText>
          <Switch value={orderUpdates} onValueChange={setOrderUpdates} />
        </View>

        <ThemedText type="h3" style={styles.sectionTitle}>About</ThemedText>
        <Pressable style={styles.setting}>
          <ThemedText>Privacy Policy</ThemedText>
          <Feather name="chevron-right" size={20} color={Colors.light.textGray} />
        </Pressable>
        <Pressable style={styles.setting}>
          <ThemedText>Terms of Service</ThemedText>
          <Feather name="chevron-right" size={20} color={Colors.light.textGray} />
        </Pressable>
        <View style={styles.setting}>
          <ThemedText>App Version</ThemedText>
          <ThemedText type="caption">1.0.0</ThemedText>
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg },
  sectionTitle: { marginTop: Spacing.md, marginBottom: Spacing.lg },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
});
