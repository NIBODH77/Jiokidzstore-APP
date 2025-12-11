import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  userName: string;
  date: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: '1',
    rating: 5,
    title: 'Excellent Quality!',
    comment: 'Amazing product, my kids love it. Highly recommended!',
    userName: 'Priya M.',
    date: '2 days ago',
  },
  {
    id: '2',
    rating: 4,
    title: 'Good Value for Money',
    comment: 'Good quality, fast delivery. Worth the price.',
    userName: 'Raj K.',
    date: '1 week ago',
  },
  {
    id: '3',
    rating: 5,
    title: 'Perfect!',
    comment: 'Exactly as described. Best purchase ever!',
    userName: 'Neha S.',
    date: '2 weeks ago',
  },
];

interface ReviewsFormProps {
  productId: string;
  onReviewSubmit?: (review: Omit<Review, 'id' | 'date' | 'userName'>) => void;
}

export function ReviewsForm({ productId, onReviewSubmit }: ReviewsFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);

  const handleSubmitReview = () => {
    if (title.trim() && comment.trim()) {
      const newReview: Review = {
        id: Date.now().toString(),
        rating,
        title,
        comment,
        userName: 'You',
        date: 'Just now',
      };
      setReviews([newReview, ...reviews]);
      onReviewSubmit?.({ rating, title, comment });
      setTitle('');
      setComment('');
      setRating(5);
      setShowForm(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : '0';

  return (
    <View style={styles.container}>
      {/* Reviews Header */}
      <View style={styles.header}>
        <View style={styles.ratingBox}>
          <ThemedText style={styles.averageRating}>{averageRating}</ThemedText>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Feather
                key={i}
                name="star"
                size={14}
                color={i < Math.floor(Number(averageRating)) ? '#F59E0B' : '#D1D5DB'}
                fill={i < Math.floor(Number(averageRating)) ? '#F59E0B' : 'transparent'}
              />
            ))}
          </View>
          <ThemedText style={styles.reviewCount}>{reviews.length} reviews</ThemedText>
        </View>
      </View>

      {/* Write Review Button */}
      <Pressable 
        style={styles.writeReviewButton}
        onPress={() => setShowForm(!showForm)}
      >
        <LinearGradient
          colors={['#FF8C00', '#FFA8C5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Feather name="edit" size={16} color="#FFFFFF" />
          <ThemedText style={styles.writeReviewText}>Write a Review</ThemedText>
        </LinearGradient>
      </Pressable>

      {/* Review Form */}
      {showForm && (
        <View style={styles.formContainer}>
          {/* Rating Stars */}
          <View style={styles.ratingInput}>
            <ThemedText style={styles.formLabel}>Rate this product</ThemedText>
            <View style={styles.starInput}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => setRating(star)}
                  hitSlop={10}
                >
                  <Feather
                    name="star"
                    size={28}
                    color={star <= rating ? '#F59E0B' : '#D1D5DB'}
                    fill={star <= rating ? '#F59E0B' : 'transparent'}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Title */}
          <View style={styles.formField}>
            <ThemedText style={styles.formLabel}>Review Title</ThemedText>
            <TextInput
              style={styles.titleInput}
              placeholder="Summary of your review"
              placeholderTextColor={Colors.light.textGray}
              value={title}
              onChangeText={setTitle}
              maxLength={50}
            />
            <ThemedText style={styles.charCount}>{title.length}/50</ThemedText>
          </View>

          {/* Comment */}
          <View style={styles.formField}>
            <ThemedText style={styles.formLabel}>Your Review</ThemedText>
            <TextInput
              style={styles.commentInput}
              placeholder="Share your experience with this product"
              placeholderTextColor={Colors.light.textGray}
              value={comment}
              onChangeText={setComment}
              maxLength={500}
              multiline
              numberOfLines={4}
            />
            <ThemedText style={styles.charCount}>{comment.length}/500</ThemedText>
          </View>

          {/* Submit Buttons */}
          <View style={styles.formButtons}>
            <Pressable 
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setShowForm(false);
                setTitle('');
                setComment('');
                setRating(5);
              }}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </Pressable>
            <Pressable 
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmitReview}
              disabled={!title.trim() || !comment.trim()}
            >
              <LinearGradient
                colors={['#FF8C00', '#FFA8C5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                <ThemedText style={styles.submitButtonText}>Submit Review</ThemedText>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      )}

      {/* Reviews List */}
      <View style={styles.reviewsList}>
        <ThemedText style={styles.allReviewsTitle}>All Reviews</ThemedText>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <ThemedText style={styles.reviewerName}>{review.userName}</ThemedText>
              <ThemedText style={styles.reviewDate}>{review.date}</ThemedText>
            </View>
            <View style={styles.reviewStars}>
              {[...Array(5)].map((_, i) => (
                <Feather
                  key={i}
                  name="star"
                  size={12}
                  color={i < review.rating ? '#F59E0B' : '#D1D5DB'}
                  fill={i < review.rating ? '#F59E0B' : 'transparent'}
                />
              ))}
            </View>
            <ThemedText style={styles.reviewTitle}>{review.title}</ThemedText>
            <ThemedText style={styles.reviewComment}>{review.comment}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  ratingBox: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  averageRating: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.light.primary,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: Spacing.sm,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.light.textGray,
  },
  writeReviewButton: {
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    borderRadius: BorderRadius.lg,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  writeReviewText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  formContainer: {
    backgroundColor: 'rgba(255,107,157,0.05)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  ratingInput: {
    marginBottom: Spacing.lg,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  starInput: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  formField: {
    marginBottom: Spacing.lg,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '500',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '500',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  charCount: {
    fontSize: 11,
    color: Colors.light.textGray,
    marginTop: Spacing.sm,
    textAlign: 'right',
  },
  formButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  button: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: BorderRadius.md,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cancelButtonText: {
    color: Colors.light.text,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: Spacing.md,
  },
  submitButton: {
    flex: 1,
  },
  submitGradient: {
    paddingVertical: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  reviewsList: {
    marginTop: Spacing.xl,
  },
  allReviewsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: Spacing.lg,
  },
  reviewItem: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reviewerName: {
    fontWeight: '700',
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.light.textGray,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: Spacing.sm,
  },
  reviewTitle: {
    fontWeight: '700',
    fontSize: 13,
    marginBottom: Spacing.sm,
  },
  reviewComment: {
    fontSize: 13,
    color: Colors.light.textGray,
    lineHeight: 18,
  },
});
