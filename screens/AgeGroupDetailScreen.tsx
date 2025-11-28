import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/theme';

interface Section {
  id: string;
  title: string;
  description?: string;
  icon: string;
  backgroundColor: string;
}

export default function AgeGroupDetailScreen() {
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { ageRange, gender, color } = route.params || {};
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const sections: Section[] = gender === 'girls' 
    ? [
        {
          id: '1',
          title: 'Baby Girl Clothes',
          description: 'Explore our curated collection of fashionable baby girl clothes',
          icon: '👗',
          backgroundColor: '#FFE5F0',
        },
        {
          id: '2',
          title: 'Winter Wonderland',
          description: 'Warm and cozy winter essentials for your little one',
          icon: '❄️',
          backgroundColor: '#E0F2FE',
        },
        {
          id: '3',
          title: 'Newborn Checklist',
          description: 'Essential items checklist for newborn baby girls',
          icon: '✓',
          backgroundColor: '#FFF3E0',
        },
      ]
    : [
        {
          id: '1',
          title: 'Baby Boy Clothes',
          description: 'Explore our curated collection of fashionable baby boy clothes',
          icon: '👕',
          backgroundColor: '#E3F2FD',
        },
        {
          id: '2',
          title: 'Winter Wonderland',
          description: 'Warm and cozy winter essentials for your little one',
          icon: '❄️',
          backgroundColor: '#E0F2FE',
        },
        {
          id: '3',
          title: 'Newborn Checklist',
          description: 'Essential items checklist for newborn baby boys',
          icon: '✓',
          backgroundColor: '#FFF3E0',
        },
      ];

  const toggleSection = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient
        colors={[color || '#FFE5E5', color ? color + '80' : '#FFD4E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>
            {gender === 'girls' ? '👧 ' : '👦 '}
            {gender === 'girls' ? 'Girl' : 'Boy'} Fashion
          </ThemedText>
          <ThemedText style={styles.ageRangeText}>{ageRange}</ThemedText>
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <View style={styles.promoBanner}>
          <LinearGradient
            colors={['#FFF9E6', '#FFE6CC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.promoBannerGradient}
          >
            <View style={styles.promoBannerContent}>
              <ThemedText style={styles.promoTitle}>Special Offers</ThemedText>
              <ThemedText style={styles.promoSubtitle}>Flat 40% OFF on selected items</ThemedText>
            </View>
          </LinearGradient>
        </View>

        {/* Accordion Sections */}
        <View style={styles.sectionsContainer}>
          {sections.map((section) => (
            <View key={section.id} style={styles.sectionWrapper}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: section.backgroundColor }]}>
                  <ThemedText style={styles.sectionIcon}>{section.icon}</ThemedText>
                </View>
                <View style={styles.sectionTitleContainer}>
                  <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
                  <ThemedText style={styles.sectionDescription}>{section.description}</ThemedText>
                </View>
                <Feather
                  name={expandedId === section.id ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#666"
                />
              </Pressable>

              {/* Expanded Content */}
              {expandedId === section.id && (
                <View style={styles.expandedContent}>
                  <View style={styles.itemsGrid}>
                    {[1, 2, 3, 4].map((item) => (
                      <Pressable key={item} style={styles.gridItem}>
                        <View style={[styles.itemImageContainer, { backgroundColor: section.backgroundColor }]}>
                          <ThemedText style={styles.itemEmoji}>🛍️</ThemedText>
                        </View>
                        <ThemedText style={styles.itemName}>Item {item}</ThemedText>
                      </Pressable>
                    ))}
                  </View>
                  <Pressable style={styles.viewMoreButton}>
                    <ThemedText style={styles.viewMoreText}>View All Items →</ThemedText>
                  </Pressable>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  ageRangeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  promoBanner: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  promoBannerGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  promoBannerContent: {
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  sectionsContainer: {
    gap: 12,
  },
  sectionWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionIcon: {
    fontSize: 24,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#999',
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  viewMoreButton: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});
