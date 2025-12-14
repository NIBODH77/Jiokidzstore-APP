import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const { width } = Dimensions.get('window');

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Mother of 2',
    rating: 5,
    text: 'Amazing quality products! My kids love their toys and the diapers are so soft.',
    avatar: '👩‍🦰',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    role: 'New Dad',
    rating: 5,
    text: 'Best app for kids products. Fast delivery and excellent customer service!',
    avatar: '👨‍💼',
  },
  {
    id: '3',
    name: 'Anjali Verma',
    role: 'Busy Mom',
    rating: 5,
    text: 'Super convenient! Found everything I needed in one place. Highly recommended!',
    avatar: '👩‍🔬',
  },
];

interface TestimonialsSectionProps {}

export function TestimonialsSection({}: TestimonialsSectionProps) {
  const renderTestimonial = ({ item }: any) => (
    <View style={styles.testimonialCard}>
      <LinearGradient
        colors={['#FFFFFF', '#FFF8FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Stars */}
        <View style={styles.starsRow}>
          {[...Array(item.rating)].map((_, i) => (
            <Feather key={i} name="star" size={14} color="#F59E0B" fill="#F59E0B" />
          ))}
        </View>

        {/* Review Text */}
        <ThemedText style={styles.reviewText}>"{item.text}"</ThemedText>

        {/* User Info */}
        <View style={styles.userRow}>
          <ThemedText style={styles.avatarText}>{item.avatar}</ThemedText>
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>{item.name}</ThemedText>
            <ThemedText style={styles.userRole}>{item.role}</ThemedText>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>What Parents Love ❤️</ThemedText>
      <ThemedText style={styles.subtitle}>Trusted by 50,000+ happy families</ThemedText>
      <FlatList
        data={TESTIMONIALS}
        renderItem={renderTestimonial}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.light.textGray,
    marginBottom: Spacing.lg,
  },
  listContent: {
    gap: Spacing.md,
  },
  testimonialCard: {
    width: width - 80,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardGradient: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewText: {
    fontSize: 13,
    color: Colors.light.text,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  avatarText: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
  },
  userRole: {
    fontSize: 11,
    color: Colors.light.textGray,
    marginTop: 2,
  },
});
