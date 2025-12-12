import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import {
  Gender,
  AgeRange,
  getCategoriesForGender,
  KIDS_FASHION_CATEGORIES,
} from "@/data/kidsFashionData";
import { Spacing } from "@/constants/theme";

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width;

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

const BANNERS_DATA = [
  {
    id: "mom-sale",
    type: "MOM_SALE",
    gradientColors: ["#FFEEE8", "#FFE4D9"],
    title: "Mom Of All Sales",
    discount: "60",
    badgeColor: "#E53935",
  },
  {
    id: "summer-splash",
    type: "SUMMER_SPLASH",
    gradientColors: ["#FFF9E6", "#FFE9B3"],
    title: "Summer Splash",
    discount: "50",
    badgeColor: "#FF9800",
  },
  {
    id: "new-arrivals",
    type: "NEW_ARRIVALS",
    gradientColors: ["#E8F5E9", "#C8E6C9"],
    title: "New Arrivals",
    discount: "30",
    badgeColor: "#4CAF50",
  },
  {
    id: "festive-special",
    type: "FESTIVE_SPECIAL",
    gradientColors: ["#FCE4EC", "#F8BBD9"],
    title: "Festive Special",
    discount: "40",
    badgeColor: "#E91E63",
  },
  {
    id: "clearance-sale",
    type: "CLEARANCE_SALE",
    gradientColors: ["#E3F2FD", "#BBDEFB"],
    title: "Clearance Sale",
    discount: "70",
    badgeColor: "#2196F3",
  },
  {
    id: "bundle-offer",
    type: "BUNDLE_OFFER",
    gradientColors: ["#F3E5F5", "#E1BEE7"],
    title: "Bundle Offer",
    discount: "25",
    badgeColor: "#9C27B0",
  },
];

interface SeasonProduct {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: any;
  season: "winter" | "summer" | "monsoon" | "festive";
  isNew?: boolean;
}

const SEASONAL_PRODUCTS: SeasonProduct[] = [
  {
    id: "wp1",
    name: "Cozy Winter Jacket",
    originalPrice: 1999,
    discountedPrice: 999,
    discount: 50,
    image: require("../../attached_assets/generated_images/toddler_boy_navy_outfit.png"),
    season: "winter",
    isNew: true,
  },
  {
    id: "wp2",
    name: "Warm Woolen Sweater",
    originalPrice: 1499,
    discountedPrice: 749,
    discount: 50,
    image: require("../../attached_assets/generated_images/infant_baby_boy_blue_shirt.png"),
    season: "winter",
  },
  {
    id: "wp3",
    name: "Fleece Hoodie Set",
    originalPrice: 1799,
    discountedPrice: 899,
    discount: 50,
    image: require("../../attached_assets/generated_images/preschool_boy_blue_graphic_shirt.png"),
    season: "winter",
    isNew: true,
  },
  {
    id: "wp4",
    name: "Thermal Inner Wear",
    originalPrice: 899,
    discountedPrice: 449,
    discount: 50,
    image: require("../../attached_assets/generated_images/infant_baby_girl_striped_pink_shirt.png"),
    season: "winter",
  },
  {
    id: "sp1",
    name: "Cotton Summer Dress",
    originalPrice: 1299,
    discountedPrice: 649,
    discount: 50,
    image: require("../../attached_assets/generated_images/toddler_girl_purple_floral_dress.png"),
    season: "summer",
    isNew: true,
  },
  {
    id: "sp2",
    name: "Light Linen Romper",
    originalPrice: 999,
    discountedPrice: 499,
    discount: 50,
    image: require("../../attached_assets/generated_images/newborn_baby_girl_pink_onesie.png"),
    season: "summer",
  },
  {
    id: "mp1",
    name: "Waterproof Raincoat",
    originalPrice: 1599,
    discountedPrice: 799,
    discount: 50,
    image: require("../../attached_assets/generated_images/toddler_boy_navy_outfit.png"),
    season: "monsoon",
    isNew: true,
  },
  {
    id: "mp2",
    name: "Rain Boots Set",
    originalPrice: 1199,
    discountedPrice: 599,
    discount: 50,
    image: require("../../attached_assets/generated_images/infant_baby_boy_blue_shirt.png"),
    season: "monsoon",
  },
  {
    id: "fp1",
    name: "Ethnic Kurta Set",
    originalPrice: 2499,
    discountedPrice: 1249,
    discount: 50,
    image: require("../../attached_assets/generated_images/preschool_boy_blue_graphic_shirt.png"),
    season: "festive",
    isNew: true,
  },
  {
    id: "fp2",
    name: "Party Lehenga Dress",
    originalPrice: 2999,
    discountedPrice: 1499,
    discount: 50,
    image: require("../../attached_assets/generated_images/toddler_girl_purple_floral_dress.png"),
    season: "festive",
  },
];

const SEASONS = [
  { id: "winter", name: "Winter Collection", icon: "❄️", color: "#4FC3F7" },
  { id: "summer", name: "Summer Collection", icon: "☀️", color: "#FFB74D" },
  { id: "monsoon", name: "Monsoon Collection", icon: "🌧️", color: "#81C784" },
  { id: "festive", name: "Festive Collection", icon: "🎉", color: "#F48FB1" },
];

export default function AgeGenderLandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<RouteParams, "AgeGenderLanding">>();
  const { gender, ageRange, color } = route.params;

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);

  const categories = useMemo(() => getCategoriesForGender(gender), [gender]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % BANNERS_DATA.length;
        bannerScrollRef.current?.scrollTo({
          x: nextIndex * BANNER_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBannerScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / BANNER_WIDTH);
    setCurrentBannerIndex(index);
  };

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate("KidsCategoryProducts", {
      gender,
      ageRange,
      category: categoryName,
    });
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
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
      Dresses: require("../../attached_assets/generated_images/toddler_girl_purple_floral_dress.png"),
      "Tops & Tees": require("../../attached_assets/generated_images/infant_baby_girl_striped_pink_shirt.png"),
      Rompers: require("../../attached_assets/generated_images/newborn_baby_girl_pink_onesie.png"),
      Shirts: require("../../attached_assets/generated_images/infant_baby_boy_blue_shirt.png"),
      "T-Shirts": require("../../attached_assets/generated_images/preschool_boy_blue_graphic_shirt.png"),
      Pants: require("../../attached_assets/generated_images/toddler_boy_navy_outfit.png"),
    };
    return images[categoryName] || null;
  };

  const promoCategories: CategoryItem[] = [
    {
      id: "mom-of-all-sales",
      name: "Mom Of All Sales",
      icon: "",
      color: "#FFF",
      isPromo: true,
      promoLogo: "MOM_SALES",
    },
    {
      id: "winter-wonderland",
      name: "Winter Wonderland",
      icon: "",
      color: "#FFF",
      isPromo: true,
      promoLogo: "WINTER",
    },
  ];

  const getTitle = () => {
    const genderText = gender === "Girls" ? "Girl" : "Boy";
    return `${genderText} Fashion ${ageRange}`;
  };

  const renderPromoLogo = (type: string) => {
    if (type === "MOM_SALES") {
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
    if (type === "WINTER") {
      return (
        <View style={styles.winterLogoContainer}>
          <Text style={styles.winterText}>Winter</Text>
          <Text style={styles.wonderlandText}>WONDERLAND</Text>
        </View>
      );
    }
    return null;
  };

  const renderBanner = (banner: (typeof BANNERS_DATA)[0]) => (
    <View key={banner.id} style={[styles.bannerSlide, { width: BANNER_WIDTH }]}>
      <LinearGradient
        colors={banner.gradientColors as [string, string]}
        style={styles.saleBanner}
      >
        <View
          style={[styles.saleBadge, { backgroundColor: banner.badgeColor }]}
        >
          <Text style={styles.badgeDiscount}>{banner.discount}%</Text>
          <Text style={styles.badgeOff}>OFF</Text>
        </View>
        <Text style={styles.bannerTitle}>{banner.title}</Text>
        <View style={styles.bannerImageContainer}>
          <Image
            source={require("../../attached_assets/generated_images/newborn_baby_girl_pink_onesie.png")}
            style={styles.babyImage}
            resizeMode="contain"
          />
          <Image
            source={require("../../attached_assets/generated_images/infant_baby_girl_striped_pink_shirt.png")}
            style={[styles.babyImage, { marginLeft: -20 }]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.discountContainer}>
          <Text style={styles.uptoText}>UPTO</Text>
          <View style={styles.percentContainer}>
            <Text style={[styles.percentNumber, { color: banner.badgeColor }]}>
              {banner.discount}
            </Text>
            <Text style={[styles.percentSign, { color: banner.badgeColor }]}>
              %
            </Text>
          </View>
          <Text style={styles.offText}>OFF</Text>
        </View>
        <Pressable
          style={[styles.shopNowButton, { backgroundColor: banner.badgeColor }]}
        >
          <Text style={styles.shopNowText}>SHOP NOW</Text>
          <Feather name="chevron-right" size={14} color="#FFF" />
        </Pressable>
        <Text style={styles.tncText}>*T&C Apply</Text>
      </LinearGradient>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Auto-Scrolling Banner Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={bannerScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleBannerScroll}
          scrollEventThrottle={16}
        >
          {BANNERS_DATA.map(renderBanner)}
        </ScrollView>
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {BANNERS_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentBannerIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Winter Wonderland Banner */}
      <View style={styles.winterBannerContainer}>
        <LinearGradient
          colors={["#E8F4FC", "#D1E9F6"]}
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
                name={
                  expandedCategories.has(cat.id) ? "chevron-up" : "chevron-down"
                }
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
                {renderPromoLogo(promo.promoLogo || "")}
              </View>
              <Text style={styles.categoryItemName}>{promo.name}</Text>
            </View>
            <Pressable
              onPress={() => toggleExpand(promo.id)}
              style={styles.expandButton}
            >
              <Feather
                name={
                  expandedCategories.has(promo.id)
                    ? "chevron-up"
                    : "chevron-down"
                }
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
                name={
                  expandedCategories.has(cat.id) ? "chevron-up" : "chevron-down"
                }
                size={24}
                color="#999"
              />
            </Pressable>
          </Pressable>
        ))}
      </View>

      {/* Seasonal Products Section */}
      {SEASONS.map((season) => {
        const seasonProducts = SEASONAL_PRODUCTS.filter(
          (p) => p.season === season.id,
        );
        if (seasonProducts.length === 0) return null;

        return (
          <View key={season.id} style={styles.seasonSection}>
            <View style={styles.seasonHeader}>
              <View style={styles.seasonTitleRow}>
                <Text style={styles.seasonIcon}>{season.icon}</Text>
                <Text style={styles.seasonTitle}>{season.name}</Text>
              </View>
              <LinearGradient
                colors={["#FF8C00", "#FF6B00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.newOfferBadge}
              >
                <Text style={styles.newOfferText}>NEW OFFERS!</Text>
              </LinearGradient>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsRow}
            >
              {seasonProducts.map((product) => (
                <Pressable
                  key={product.id}
                  style={styles.productCard}
                  onPress={() =>
                    navigation.navigate("ProductDetail", { productId: product.id })
                  }
                >
                  <View style={styles.productImageContainer}>
                    <Image
                      source={product.image}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                    <View
                      style={[
                        styles.discountBadge,
                        { backgroundColor: season.color },
                      ]}
                    >
                      <Text style={styles.discountBadgeText}>
                        {product.discount}% OFF
                      </Text>
                    </View>
                    {product.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.productDetails}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <View style={styles.priceRow}>
                      <Text style={styles.discountedPrice}>
                        ₹{product.discountedPrice}
                      </Text>
                      <Text style={styles.originalPrice}>
                        ₹{product.originalPrice}
                      </Text>
                    </View>
                    <View style={styles.savingsRow}>
                      <Feather name="tag" size={12} color="#4CAF50" />
                      <Text style={styles.savingsText}>
                        Save ₹{product.originalPrice - product.discountedPrice}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        );
      })}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 75,
  },
  carouselContainer: {
    width: "100%",
  },
  bannerSlide: {
    width: BANNER_WIDTH,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    gap: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DDD",
  },
  paginationDotActive: {
    backgroundColor: "#FF8C00",
    width: 20,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
  badgeDiscount: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFF",
  },
  badgeOff: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFF",
  },
  bannerContainer: {
    paddingHorizontal: 0,
  },
  saleBanner: {
    padding: 16,
    position: "relative",
    minHeight: 200,
  },
  saleBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#E53935",
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  momLogoSmall: {
    flexDirection: "row",
    alignItems: "center",
  },
  momLogoM: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFF",
  },
  momLogoHeart: {
    fontSize: 10,
    color: "#FFF",
    marginHorizontal: 1,
  },
  momLogoOfAll: {
    fontSize: 8,
    fontWeight: "600",
    color: "#FFF",
  },
  momLogoSales: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFF",
  },
  bannerImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  babyImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 10,
  },
  uptoText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginRight: 8,
    marginBottom: 8,
  },
  percentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  percentNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: "#E53935",
    lineHeight: 50,
  },
  percentSign: {
    fontSize: 24,
    fontWeight: "700",
    color: "#E53935",
    marginTop: 5,
  },
  offText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginLeft: 8,
    marginBottom: 10,
  },
  shopNowButton: {
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 10,
    gap: 4,
  },
  shopNowText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFF",
  },
  tncText: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  winterBannerContainer: {
    paddingHorizontal: 0,
    marginTop: 2,
  },
  winterBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent: "space-between",
  },
  winterLogoSmall: {
    alignItems: "flex-start",
  },
  winterLogoText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#E53935",
    fontStyle: "italic",
  },
  winterLogoWonderland: {
    fontSize: 10,
    fontWeight: "700",
    color: "#E53935",
    letterSpacing: 1,
  },
  winterItemsRow: {
    flexDirection: "row",
    gap: 8,
  },
  winterItemCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  winterEmoji: {
    fontSize: 20,
  },
  winterPriceContainer: {
    alignItems: "flex-end",
  },
  startingAtText: {
    fontSize: 10,
    color: "#666",
    fontWeight: "600",
  },
  winterPrice: {
    fontSize: 32,
    fontWeight: "900",
    color: "#333",
    lineHeight: 34,
  },
  winterEssentials: {
    flexDirection: "row",
    alignItems: "center",
  },
  winterEssentialsText: {
    fontSize: 11,
    color: "#00BCD4",
    fontWeight: "600",
  },
  categoryTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 12,
  },
  categoryListContainer: {
    paddingHorizontal: 0,
  },
  categoryListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryImageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },
  expandButton: {
    padding: 8,
  },
  promoImageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  promoLogoContainer: {
    alignItems: "center",
  },
  momSalesLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  momSalesText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#E53935",
  },
  heartIcon: {
    marginHorizontal: 1,
  },
  heartText: {
    fontSize: 8,
    color: "#E53935",
  },
  momSalesSubText: {
    fontSize: 5,
    fontWeight: "600",
    color: "#E53935",
  },
  momSalesSalesText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#E53935",
  },
  winterLogoContainer: {
    alignItems: "center",
  },
  winterText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#E53935",
    fontStyle: "italic",
  },
  wonderlandText: {
    fontSize: 5,
    fontWeight: "700",
    color: "#E53935",
    letterSpacing: 0.5,
  },
  seasonSection: {
    marginTop: 20,
    paddingBottom: 16,
  },
  seasonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seasonTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  seasonIcon: {
    fontSize: 24,
  },
  seasonTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  newOfferBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  newOfferText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFF",
  },
  productsRow: {
    paddingHorizontal: 12,
    gap: 12,
  },
  productCard: {
    width: 160,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  productImageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "#F8F8F8",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFF",
  },
  newBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF8C00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFF",
  },
  productDetails: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF8C00",
  },
  originalPrice: {
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
  savingsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4CAF50",
  },
});
