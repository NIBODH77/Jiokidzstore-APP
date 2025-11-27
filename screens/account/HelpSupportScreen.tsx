import React from 'react';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollableHeaderBack } from '@/components/ScrollableHeaderBack';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export default function HelpSupportScreen() {
  const helpItems = [
    { title: 'Call Us', subtitle: '+91 1800-123-4567', icon: 'phone', action: () => Linking.openURL('tel:18001234567') },
    { title: 'Email Us', subtitle: 'support@jiokidz.com', icon: 'mail', action: () => Linking.openURL('mailto:support@jiokidz.com') },
    { title: 'FAQs', subtitle: 'Find answers to common questions', icon: 'help-circle', action: () => {} },
    { title: 'Live Chat', subtitle: 'Chat with our support team', icon: 'message-circle', action: () => {} },
  ];

  return (
    <ScrollableHeaderBack 
      title="Help & Support"
      contentContainerStyle={{ paddingTop: 80, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.lg }}
    >
      <ThemedText type="h3" style={styles.title}>How can we help you?</ThemedText>
      {helpItems.map((item, index) => (
        <Pressable key={index} style={styles.helpCard} onPress={item.action}>
          <View style={styles.helpIcon}>
            <Feather name={item.icon as any} size={24} color={Colors.light.primary} />
          </View>
          <View style={styles.helpContent}>
            <ThemedText style={styles.helpTitle}>{item.title}</ThemedText>
            <ThemedText type="caption" style={styles.helpSubtitle}>{item.subtitle}</ThemedText>
          </View>
          <Feather name="chevron-right" size={20} color={Colors.light.textGray} />
        </Pressable>
      ))}
    </ScrollableHeaderBack>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: Spacing.lg },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.light.backgroundRoot,
    marginBottom: Spacing.md,
  },
  helpIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${Colors.light.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  helpContent: { flex: 1 },
  helpTitle: { fontWeight: '600', marginBottom: 2 },
  helpSubtitle: { color: Colors.light.textGray },
});
