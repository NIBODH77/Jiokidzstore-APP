
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  totalAmount: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  statusColor: string;
  items: {
    name: string;
    quantity: number;
    price: string;
    image: string;
  }[];
}

export default function OrderHistoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'delivered' | 'pending' | 'cancelled'>('all');

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD123456',
      date: '15 Nov 2024',
      totalAmount: '₹2,999',
      status: 'Delivered',
      statusColor: '#22C55E',
      items: [
        {
          name: 'Kids Winter Jacket',
          quantity: 1,
          price: '₹1,499',
          image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200',
        },
        {
          name: 'Baby Shoes',
          quantity: 2,
          price: '₹750',
          image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=200',
        },
      ],
    },
    {
      id: '2',
      orderNumber: 'ORD123457',
      date: '12 Nov 2024',
      totalAmount: '₹1,599',
      status: 'Shipped',
      statusColor: '#3B82F6',
      items: [
        {
          name: 'Educational Toy Set',
          quantity: 1,
          price: '₹1,599',
          image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200',
        },
      ],
    },
    {
      id: '3',
      orderNumber: 'ORD123458',
      date: '10 Nov 2024',
      totalAmount: '₹899',
      status: 'Processing',
      statusColor: '#F59E0B',
      items: [
        {
          name: 'Kids T-Shirt',
          quantity: 3,
          price: '₹899',
          image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200',
        },
      ],
    },
    {
      id: '4',
      orderNumber: 'ORD123459',
      date: '5 Nov 2024',
      totalAmount: '₹3,499',
      status: 'Cancelled',
      statusColor: '#EF4444',
      items: [
        {
          name: 'Baby Stroller',
          quantity: 1,
          price: '₹3,499',
          image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200',
        },
      ],
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'delivered') return order.status === 'Delivered';
    if (selectedFilter === 'pending') return order.status === 'Shipped' || order.status === 'Processing';
    if (selectedFilter === 'cancelled') return order.status === 'Cancelled';
    return true;
  });

  const handleOrderPress = (order: Order) => {
    navigation.navigate('OrderDetail', { orderId: order.id, order });
  };

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
              All Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'delivered' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('delivered')}
          >
            <Text style={[styles.filterText, selectedFilter === 'delivered' && styles.filterTextActive]}>
              Delivered
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'pending' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('pending')}
          >
            <Text style={[styles.filterText, selectedFilter === 'pending' && styles.filterTextActive]}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'cancelled' && styles.filterButtonActive]}
            onPress={() => setSelectedFilter('cancelled')}
          >
            <Text style={[styles.filterText, selectedFilter === 'cancelled' && styles.filterTextActive]}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color="#D1D5DB" />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          filteredOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => handleOrderPress(order)}
              activeOpacity={0.7}
            >
              {/* Order Header */}
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${order.statusColor}20` }]}>
                  <Text style={[styles.statusText, { color: order.statusColor }]}>
                    {order.status}
                  </Text>
                </View>
              </View>

              {/* Order Items Preview */}
              <View style={styles.itemsPreview}>
                {order.items.slice(0, 2).map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                  </View>
                ))}
                {order.items.length > 2 && (
                  <Text style={styles.moreItems}>
                    +{order.items.length - 2} more item(s)
                  </Text>
                )}
              </View>

              {/* Order Footer */}
              <View style={styles.orderFooter}>
                <View>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalAmount}>{order.totalAmount}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  onPress={() => handleOrderPress(order)}
                >
                  <Text style={styles.viewDetailsText}>View Details</Text>
                  <Ionicons name="chevron-forward" size={16} color="#FF6B00" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B00',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemsPreview: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  moreItems: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '500',
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B00',
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
});
