import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { 
  Gender, 
  AgeRange, 
  getCategoriesForGender, 
  KIDS_FASHION_CATEGORIES
} from '@/data/kidsFashionData';
import { Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

type RouteParams = {
  AgeGenderLanding: {
    gender: Gender;
    ageRange: AgeRange;
    color: string;
  };
};

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  image?: any;
  isPromo?: boolean;
  promoLogo?: string;
}

export default function AgeGenderLandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<RouteParams, 'AgeGenderLanding'>>();
  const { gender, ageRange, color } = route.params;
  
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  const categories = useMemo(() => getCategoriesForGender(gender), [gender]);

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('KidsCategoryProducts', {
      gender,
      ageRange,
      category: categoryName,
    });
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const getCategoryImage = (categoryName: string) => {
    const images: { [key: string]: any } = {
      'Dresses': require('../../attached_assets/generated_images/toddler_girl_purple_floral_dress.png'),
      'Tops & Tees': require('../../attached_assets/generated_images/infant_baby_girl_striped_pink_shirt.png'),
      'Rompers': require('../../attached_assets/generated_images/newborn_baby_girl_pink_onesie.png'),
      'Shirts': require('../../attached_assets/generated_images/infant_baby_boy_blue_shirt.png'),
      'T-Shirts': require('../../attached_assets/generated_images/preschool_boy_blue_graphic_shirt.png'),
      'Pants': require('../../attached_assets/generated_images/toddler_boy_navy_outfit.png'),
    };
    return images[categoryName] || null;
  };

  const promoCategories: CategoryItem[] = [
    {
      id: 'mom-of-all-sales',
      name: 'Mom Of All Sales',
      icon: '',
      color: '#FFF',
      isPromo: true,
      promoLogo: 'MOM_SALES'
    },
    {
      id: 'winter-wonderland',
      name: 'Winter Wonderland',
      icon: '',
      color: '#FFF',
      isPromo: true,
      promoLogo: 'WINTER'
    }
  ];

  const getTitle = () => {
    const genderText = gender === 'Girls' ? 'Girl' : 'Boy';
    return `${genderText} Fashion ${ageRange}`;
  };

  const renderPromoLogo = (type: string) => {
    if (type === 'MOM_SALES') {
      return (
        <View style={styles.promoLogoContainer}>
          <View style={styles.momSalesLogo}>
            <Text style={styles.momSalesText}>M</Text>
            <View style={styles.heartIcon}>
              <Text style={styles.heartText}>♥</Text>
            </View>
            <Text style={styles.momSalesText}>M</Text>
          </View>
          <Text style={styles.momSalesSubText}>OF ALL</Text>
          <Text style={styles.momSalesSalesText}>SALES</Text>
        </View>
      );
    }
    if (type === 'WINTER') {
      return (
        <View style={styles.winterLogoContainer}>
          <Text style={styles.winterText}>Winter</Text>
          <Text style={styles.wonderlandText}>WONDERLAND</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Mom Of All Sales Banner */}
      <View style={styles.bannerContainer}>
        <LinearGradient
          colors={['#FFEEE8', '#FFE4D9']}
          style={styles.saleBanner}
        >
          <View style={styles.saleBadge}>
            <View style={styles.momLogoSmall}>
              <Text style={styles.momLogoM}>M</Text>
              <Text style={styles.momLogoHeart}>♥</Text>
              <Text style={styles.momLogoM}>M</Text>
            </View>
            <Text style={styles.momLogoOfAll}>OF ALL</Text>
            <Text style={styles.momLogoSales}>SALES</Text>
          </View>
          <View style={styles.bannerImageContainer}>
            <Image 
              source={require('../../attached_assets/generated_images/newborn_baby_girl_pink_onesie.png')}
              style={styles.babyImage}
              resizeMode="contain"
            />
            <Image 
              source={require('../../attached_assets/generated_images/infant_baby_girl_striped_pink_shirt.png')}
              style={[styles.babyImage, { marginLeft: -20 }]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.discountContainer}>
            <Text style={styles.uptoText}>UPTO</Text>
            <View style={styles.percentContainer}>
              <Text style={styles.percentNumber}>60</Text>
              <Text style={styles.percentSign}>%</Text>
            </View>
            <Text style={styles.offText}>OFF</Text>
          </View>
          <Pressable style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>SHOP NOW</Text>
            <Feather name="chevron-right" size={14} color="#FFF" />
          </Pressable>
          <Text style={styles.tncText}>*T&C Apply</Text>
        </LinearGradient>
      </View>

      {/* Winter Wonderland Banner */}
      <View style={styles.winterBannerContainer}>
        <LinearGradient
          colors={['#E8F4FC', '#D1E9F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.winterBanner}
        >
          <View style={styles.winterLogoSmall}>
            <Text style={styles.winterLogoText}>Winter</Text>
            <Text style={styles.winterLogoWonderland}>WONDERLAND</Text>
          </View>
          <View style={styles.winterItemsRow}>
            <View style={styles.winterItemCircle}>
              <Text style={styles.winterEmoji}>🧢</Text>
            </View>
            <View style={styles.winterItemCircle}>
              <Text style={styles.winterEmoji}>🧣</Text>
            </View>
            <View style={styles.winterItemCircle}>
              <Text style={styles.winterEmoji}>🧤</Text>
            </View>
          </View>
          <View style={styles.winterPriceContainer}>
            <Text style={styles.startingAtText}>STARTING AT ₹</Text>
            <Text style={styles.winterPrice}>99</Text>
            <View style={styles.winterEssentials}>
              <Text style={styles.winterEssentialsText}>Winter Essentials</Text>
              <Feather name="chevron-right" size={14} color="#666" />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Category Title */}
      <View style={styles.categoryTitleContainer}>
        <Text style={styles.categoryTitle}>{getTitle()}</Text>
        <View style={styles.divider} />
      </View>

      {/* Category List with Baby Clothes */}
      <View style={styles.categoryListContainer}>
        {categories.slice(0, 3).map((cat) => (
          <Pressable 
            key={cat.id}
            style={styles.categoryListItem}
            onPress={() => handleCategoryPress(cat.name)}
          >
            <View style={styles.categoryItemLeft}>
              <View style={styles.categoryImageCircle}>
                {getCategoryImage(cat.name) ? (
                  <Image 
                    source={getCategoryImage(cat.name)} 
                    style={styles.categoryItemImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.categoryItemIcon}>{cat.icon}</Text>
                )}
              </View>
              <Text style={styles.categoryItemName}>{cat.name}</Text>
            </View>
            <Pressable 
              onPress={() => toggleExpand(cat.id)}
              style={styles.expandButton}
            >
              <Feather 
                name={expandedCategories.has(cat.id) ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#999" 
              />
            </Pressable>
          </Pressable>
        ))}

        {/* Promo Categories */}
        {promoCategories.map((promo) => (
          <Pressable 
            key={promo.id}
            style={styles.categoryListItem}
            onPress={() => {}}
          >
            <View style={styles.categoryItemLeft}>
              <View style={styles.promoImageCircle}>
                {renderPromoLogo(promo.promoLogo || '')}
              </View>
              <Text style={styles.categoryItemName}>{promo.name}</Text>
            </View>
            <Pressable 
              onPress={() => toggleExpand(promo.id)}
              style={styles.expandButton}
            >
              <Feather 
                name={expandedCategories.has(promo.id) ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#999" 
              />
            </Pressable>
          </Pressable>
        ))}

        {/* Remaining Categories */}
        {categories.slice(3).map((cat) => (
          <Pressable 
            key={cat.id}
            style={styles.categoryListItem}
            onPress={() => handleCategoryPress(cat.name)}
          >
            <View style={styles.categoryItemLeft}>
              <View style={styles.categoryImageCircle}>
                {getCategoryImage(cat.name) ? (
                  <Image 
                    source={getCategoryImage(cat.name)} 
                    style={styles.categoryItemImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.categoryItemIcon}>{cat.icon}</Text>
                )}
              </View>
              <Text style={styles.categoryItemName}>{cat.name}</Text>
            </View>
            <Pressable 
              onPress={() => toggleExpand(cat.id)}
              style={styles.expandButton}
            >
              <Feather 
                name={expandedCategories.has(cat.id) ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#999" 
              />
            </Pressable>
          </Pressable>
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bannerContainer: {
    paddingHorizontal: 0,
  },
  saleBanner: {
    padding: 16,
    position: 'relative',
    minHeight: 200,
  },
  saleBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E53935',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  momLogoSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  momLogoM: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFF',
  },
  momLogoHeart: {
    fontSize: 10,
    color: '#FFF',
    marginHorizontal: 1,
  },
  momLogoOfAll: {
    fontSize: 8,
    fontWeight: '600',
    color: '#FFF',
  },
  momLogoSales: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFF',
  },
  bannerImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  babyImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
  },
  uptoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginRight: 8,
    marginBottom: 8,
  },
  percentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  percentNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#E53935',
    lineHeight: 50,
  },
  percentSign: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E53935',
    marginTop: 5,
  },
  offText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
    marginBottom: 10,
  },
  shopNowButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 10,
    gap: 4,
  },
  shopNowText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  tncText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  winterBannerContainer: {
    paddingHorizontal: 0,
    marginTop: 2,
  },
  winterBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
  },
  winterLogoSmall: {
    alignItems: 'flex-start',
  },
  winterLogoText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E53935',
    fontStyle: 'italic',
  },
  winterLogoWonderland: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E53935',
    letterSpacing: 1,
  },
  winterItemsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  winterItemCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  winterEmoji: {
    fontSize: 20,
  },
  winterPriceContainer: {
    alignItems: 'flex-end',
  },
  startingAtText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  winterPrice: {
    fontSize: 32,
    fontWeight: '900',
    color: '#333',
    lineHeight: 34,
  },
  winterEssentials: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  winterEssentialsText: {
    fontSize: 11,
    color: '#00BCD4',
    fontWeight: '600',
  },
  categoryTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginTop: 12,
  },
  categoryListContainer: {
    paddingHorizontal: 0,
  },
  categoryListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryImageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 14,
  },
  categoryItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryItemIcon: {
    fontSize: 24,
  },
  categoryItemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  expandButton: {
    padding: 8,
  },
  promoImageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  promoLogoContainer: {
    alignItems: 'center',
  },
  momSalesLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  momSalesText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#E53935',
  },
  heartIcon: {
    marginHorizontal: 1,
  },
  heartText: {
    fontSize: 8,
    color: '#E53935',
  },
  momSalesSubText: {
    fontSize: 5,
    fontWeight: '600',
    color: '#E53935',
  },
  momSalesSalesText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#E53935',
  },
  winterLogoContainer: {
    alignItems: 'center',
  },
  winterText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#E53935',
    fontStyle: 'italic',
  },
  wonderlandText: {
    fontSize: 5,
    fontWeight: '700',
    color: '#E53935',
    letterSpacing: 0.5,
  },
});
