
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Review {
  id: string;
  productName: string;
  productImage: string;
  rating: number;
  title: string;
  description: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export default function MyReviewsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      productName: 'Wireless Bluetooth Headphones Pro',
      productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      rating: 5,
      title: 'Exceptional Sound Quality and Comfort!',
      description: 'These headphones have completely exceeded my expectations. The bass is incredibly deep and punchy, the mids are crystal clear, and the highs are crisp without being harsh.',
      date: '2025-12-05',
      verified: true,
      helpful: 47,
    },
    {
      id: '2',
      productName: 'Smart Watch Series 7 - GPS + Cellular',
      productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      rating: 4,
      title: 'Great Features but Battery Life Could Be Better',
      description: 'I absolutely love the fitness tracking features and the AMOLED display is stunning. The heart rate monitor is accurate, and the GPS tracking is spot-on.',
      date: '2025-11-28',
      verified: true,
      helpful: 32,
    },
    {
      id: '3',
      productName: 'Premium Laptop Backpack with USB Charging Port',
      productImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      rating: 3,
      title: 'Functional but Material Quality is Average',
      description: 'The backpack is quite functional and has plenty of compartments for organizing my laptop, charger, and other accessories.',
      date: '2025-11-15',
      verified: true,
      helpful: 18,
    },
  ]);

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    rating: 5,
    title: '',
    description: '',
  });

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';
  const totalHelpful = reviews.reduce((sum, r) => sum + r.helpful, 0);

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setEditForm({
      rating: review.rating,
      title: review.title,
      description: review.description,
    });
  };

  const handleSaveEdit = () => {
    if (!editingReview) return;
    
    setReviews(reviews.map(review => 
      review.id === editingReview.id
        ? { ...review, ...editForm }
        : review
    ));
    setEditingReview(null);
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    setDeleteConfirmId(null);
  };

  const renderStars = (rating: number, onRatingChange?: (rating: number) => void, interactive: boolean = false) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => interactive && onRatingChange && onRatingChange(star)}
            disabled={!interactive}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={20}
              color={star <= rating ? '#FBBF24' : '#D1D5DB'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Reviews</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Dashboard */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Total Reviews</Text>
              <Text style={styles.statValue}>{totalReviews}</Text>
            </View>
            <View style={[styles.statIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="file-tray-full" size={24} color="#2563EB" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Average Rating</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.statValue}>{averageRating}</Text>
                <Ionicons name="star" size={20} color="#FBBF24" />
              </View>
            </View>
            <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="star" size={24} color="#D97706" />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Helpful Votes</Text>
              <Text style={styles.statValue}>{totalHelpful}</Text>
            </View>
            <View style={[styles.statIcon, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="thumbs-up" size={24} color="#059669" />
            </View>
          </View>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {reviews.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="file-tray-outline" size={48} color="#9CA3AF" />
              </View>
              <Text style={styles.emptyTitle}>No Reviews Yet</Text>
              <Text style={styles.emptyText}>Start reviewing products you have purchased to help others!</Text>
            </View>
          ) : (
            reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewContent}>
                  {/* Product Image */}
                  <Image
                    source={{ uri: review.productImage }}
                    style={styles.productImage}
                  />

                  {/* Review Details */}
                  <View style={styles.reviewDetails}>
                    <Text style={styles.productName} numberOfLines={2}>{review.productName}</Text>
                    
                    <View style={styles.reviewMeta}>
                      {renderStars(review.rating)}
                      {review.verified && (
                        <View style={styles.verifiedBadge}>
                          <Ionicons name="checkmark-circle" size={14} color="#059669" />
                          <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.reviewTitle}>{review.title}</Text>
                    <Text style={styles.reviewDescription} numberOfLines={3}>{review.description}</Text>

                    <View style={styles.reviewFooter}>
                      <View style={styles.dateContainer}>
                        <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                        <Text style={styles.dateText}>{formatDate(review.date)}</Text>
                      </View>
                      <View style={styles.helpfulContainer}>
                        <Ionicons name="thumbs-up-outline" size={14} color="#6B7280" />
                        <Text style={styles.helpfulText}>{review.helpful} helpful</Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        onPress={() => handleEditClick(review)}
                        style={styles.editBtn}
                      >
                        <Ionicons name="create-outline" size={16} color="#2563EB" />
                        <Text style={styles.editBtnText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setDeleteConfirmId(review.id)}
                        style={styles.deleteBtn}
                      >
                        <Ionicons name="trash-outline" size={16} color="#DC2626" />
                        <Text style={styles.deleteBtnText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={!!editingReview} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Review</Text>
              <TouchableOpacity onPress={() => setEditingReview(null)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {editingReview && (
                <>
                  <View style={styles.editProductInfo}>
                    <Image source={{ uri: editingReview.productImage }} style={styles.editProductImage} />
                    <View style={styles.editProductDetails}>
                      <Text style={styles.editProductName}>{editingReview.productName}</Text>
                      {editingReview.verified && (
                        <View style={styles.verifiedBadge}>
                          <Ionicons name="checkmark-circle" size={14} color="#059669" />
                          <Text style={styles.verifiedText}>Verified Purchase</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Your Rating *</Text>
                    {renderStars(editForm.rating, (rating) => setEditForm({ ...editForm, rating }), true)}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Review Title *</Text>
                    <TextInput
                      value={editForm.title}
                      onChangeText={(text) => setEditForm({ ...editForm, title: text })}
                      style={styles.input}
                      placeholder="Summarize your experience"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Review Description *</Text>
                    <TextInput
                      value={editForm.description}
                      onChangeText={(text) => setEditForm({ ...editForm, description: text })}
                      style={[styles.input, styles.textArea]}
                      placeholder="Share your detailed experience"
                      multiline
                      numberOfLines={6}
                      textAlignVertical="top"
                    />
                  </View>

                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      onPress={handleSaveEdit}
                      disabled={!editForm.title.trim() || !editForm.description.trim()}
                      style={[styles.saveBtn, (!editForm.title.trim() || !editForm.description.trim()) && styles.saveBtnDisabled]}
                    >
                      <Text style={styles.saveBtnText}>Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEditingReview(null)} style={styles.cancelBtn}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={!!deleteConfirmId} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>
            <View style={styles.deleteIcon}>
              <Ionicons name="trash" size={32} color="#DC2626" />
            </View>
            <Text style={styles.deleteTitle}>Delete Review?</Text>
            <Text style={styles.deleteText}>Are you sure you want to delete this review? This action cannot be undone.</Text>
            
            <View style={styles.deleteActions}>
              <TouchableOpacity
                onPress={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                style={styles.confirmDeleteBtn}
              >
                <Text style={styles.confirmDeleteText}>Yes, Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDeleteConfirmId(null)} style={styles.cancelDeleteBtn}>
                <Text style={styles.cancelDeleteText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewsList: {
    padding: 16,
    gap: 16,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 48,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewContent: {
    flexDirection: 'row',
    gap: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  reviewDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '500',
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  reviewDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  helpfulContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helpfulText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  editBtnText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  deleteBtnText: {
    fontSize: 13,
    color: '#DC2626',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalBody: {
    padding: 20,
  },
  editProductInfo: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 20,
  },
  editProductImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  editProductDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  editProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalActions: {
    gap: 12,
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#D1D5DB',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    alignItems: 'center',
  },
  deleteIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  deleteText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  deleteActions: {
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },
  confirmDeleteBtn: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelDeleteBtn: {
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelDeleteText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});
