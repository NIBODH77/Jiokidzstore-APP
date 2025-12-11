// Kids Fashion Complete Data Structure with Season Management

export type Season = 'Summer' | 'Winter' | 'All Season';
export type Gender = 'Girls' | 'Boys';
export type AgeRange = '0-6 Months' | '6-24 Months' | '2-4 Years' | '4-6 Years' | '6-14 Years';

export interface KidsFashionProduct {
  product_id: string;
  product_name: string;
  age_group: AgeRange;
  gender: Gender;
  category: string;
  subcategory: string;
  season: Season;
  images: string[];
  sizes: string[];
  price: number;
  original_price: number;
  discount: number;
  material: string;
  description: string;
  brand: string;
  color: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
}

export interface KidsFashionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: string[];
  forGender: Gender[];
}

export interface AgeGenderGroup {
  id: string;
  gender: Gender;
  ageRange: AgeRange;
  label: string;
  color: string;
  bgColor: string;
}

// Get current season based on month
export const getCurrentSeason = (): Season => {
  const month = new Date().getMonth();
  // Winter: Nov-Feb (10, 11, 0, 1), Summer: Mar-Oct
  if (month >= 10 || month <= 1) return 'Winter';
  return 'Summer';
};

// Sort products by season priority
export const sortBySeasonPriority = (products: KidsFashionProduct[]): KidsFashionProduct[] => {
  const currentSeason = getCurrentSeason();
  return [...products].sort((a, b) => {
    // Current season products first
    const aMatch = a.season === currentSeason || a.season === 'All Season' ? 1 : 0;
    const bMatch = b.season === currentSeason || b.season === 'All Season' ? 1 : 0;
    if (bMatch !== aMatch) return bMatch - aMatch;
    // Then by rating
    return b.rating - a.rating;
  });
};

// Girls Age Groups
export const GIRLS_AGE_GROUPS: AgeGenderGroup[] = [
  { id: 'g1', gender: 'Girls', ageRange: '0-6 Months', label: '0–6\nMonths', color: '#FF69B4', bgColor: '#FFE5F0' },
  { id: 'g2', gender: 'Girls', ageRange: '6-24 Months', label: '6–24\nMonths', color: '#FF69B4', bgColor: '#FFE8D6' },
  { id: 'g3', gender: 'Girls', ageRange: '2-4 Years', label: '2–4\nYears', color: '#FF69B4', bgColor: '#FFC3E0' },
  { id: 'g4', gender: 'Girls', ageRange: '4-6 Years', label: '4–6\nYears', color: '#FF69B4', bgColor: '#FFB3D9' },
  { id: 'g5', gender: 'Girls', ageRange: '6-14 Years', label: '6–14\nYears', color: '#FF69B4', bgColor: '#FFA3D2' },
];

// Boys Age Groups
export const BOYS_AGE_GROUPS: AgeGenderGroup[] = [
  { id: 'b1', gender: 'Boys', ageRange: '0-6 Months', label: '0–6\nMonths', color: '#4169E1', bgColor: '#E3F2FD' },
  { id: 'b2', gender: 'Boys', ageRange: '6-24 Months', label: '6–24\nMonths', color: '#4169E1', bgColor: '#BBDEFB' },
  { id: 'b3', gender: 'Boys', ageRange: '2-4 Years', label: '2–4\nYears', color: '#4169E1', bgColor: '#90CAF9' },
  { id: 'b4', gender: 'Boys', ageRange: '4-6 Years', label: '4–6\nYears', color: '#4169E1', bgColor: '#64B5F6' },
  { id: 'b5', gender: 'Boys', ageRange: '6-14 Years', label: '6–14\nYears', color: '#4169E1', bgColor: '#42A5F5' },
];

// All Categories for Kids Fashion
export const KIDS_FASHION_CATEGORIES: KidsFashionCategory[] = [
  { id: 'tops', name: 'Tops / T-shirts', icon: '👕', color: '#FFE4EC', subcategories: ['Casual Tops', 'Printed T-shirts', 'Polo T-shirts', 'Tank Tops'], forGender: ['Girls', 'Boys'] },
  { id: 'shirts', name: 'Shirts', icon: '👔', color: '#E3F2FD', subcategories: ['Casual Shirts', 'Formal Shirts', 'Denim Shirts'], forGender: ['Girls', 'Boys'] },
  { id: 'frocks', name: 'Frocks / Dresses', icon: '👗', color: '#FCE4EC', subcategories: ['Casual Dresses', 'Party Dresses', 'Maxi Dresses', 'A-Line Dresses'], forGender: ['Girls'] },
  { id: 'jeggings', name: 'Jeggings / Jeans', icon: '👖', color: '#E8F5E9', subcategories: ['Slim Fit', 'Regular Fit', 'Distressed Jeans', 'Jeggings'], forGender: ['Girls', 'Boys'] },
  { id: 'winterwear', name: 'Winter Wear', icon: '🧥', color: '#FFF3E0', subcategories: ['Jackets', 'Sweaters', 'Hoodies', 'Thermals', 'Cardigans'], forGender: ['Girls', 'Boys'] },
  { id: 'bottomwear', name: 'Bottom Wear', icon: '🩳', color: '#F3E5F5', subcategories: ['Shorts', 'Trousers', 'Leggings', 'Capris', 'Track Pants'], forGender: ['Girls', 'Boys'] },
  { id: 'ethnicwear', name: 'Ethnic Wear', icon: '🥻', color: '#FFECB3', subcategories: ['Kurtas', 'Lehengas', 'Sherwanis', 'Salwar Sets'], forGender: ['Girls', 'Boys'] },
  { id: 'partywear', name: 'Party Wear', icon: '🎀', color: '#E1BEE7', subcategories: ['Party Dresses', 'Suits', 'Gowns', 'Tuxedos'], forGender: ['Girls', 'Boys'] },
  { id: 'footwear', name: 'Footwear', icon: '👟', color: '#B2DFDB', subcategories: ['Sneakers', 'Sandals', 'Boots', 'Casual Shoes', 'School Shoes'], forGender: ['Girls', 'Boys'] },
  { id: 'accessories', name: 'Accessories', icon: '🎒', color: '#DCEDC8', subcategories: ['Bags', 'Belts', 'Caps', 'Hair Accessories', 'Watches'], forGender: ['Girls', 'Boys'] },
];

// Sample Products Data
export const KIDS_FASHION_PRODUCTS: KidsFashionProduct[] = [
  // Girls 0-6 Months
  { product_id: 'gp001', product_name: 'Soft Cotton Romper Pink', age_group: '0-6 Months', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'Summer', images: [], sizes: ['0-3M', '3-6M'], price: 299, original_price: 499, discount: 40, material: 'Cotton', description: 'Soft breathable cotton romper perfect for summer days', brand: 'BabyKids', color: 'Pink', rating: 4.5, reviews_count: 45, in_stock: true },
  { product_id: 'gp002', product_name: 'Winter Fleece Onesie', age_group: '0-6 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Thermals', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 599, original_price: 899, discount: 33, material: 'Fleece', description: 'Warm cozy fleece onesie for cold winter nights', brand: 'WarmBaby', color: 'White', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'gp003', product_name: 'Floral Print Frock', age_group: '0-6 Months', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Casual Dresses', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 399, original_price: 599, discount: 33, material: 'Cotton Blend', description: 'Adorable floral print frock for your little princess', brand: 'TinyTots', color: 'Floral', rating: 4.3, reviews_count: 34, in_stock: true },
  
  // Girls 6-24 Months
  { product_id: 'gp004', product_name: 'Summer Cotton Dress', age_group: '6-24 Months', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Casual Dresses', season: 'Summer', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 449, original_price: 699, discount: 36, material: 'Cotton', description: 'Light and breezy summer dress', brand: 'CuteBaby', color: 'Yellow', rating: 4.6, reviews_count: 56, in_stock: true },
  { product_id: 'gp005', product_name: 'Knitted Cardigan', age_group: '6-24 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Cardigans', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 699, original_price: 999, discount: 30, material: 'Wool Blend', description: 'Soft knitted cardigan for cozy winter days', brand: 'WinterKids', color: 'Cream', rating: 4.7, reviews_count: 78, in_stock: true },
  
  // Girls 2-4 Years
  { product_id: 'gp006', product_name: 'Princess Party Dress', age_group: '2-4 Years', gender: 'Girls', category: 'Party Wear', subcategory: 'Party Dresses', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 999, original_price: 1499, discount: 33, material: 'Satin', description: 'Beautiful princess dress for special occasions', brand: 'FairyTale', color: 'Pink', rating: 4.9, reviews_count: 120, in_stock: true },
  { product_id: 'gp007', product_name: 'Denim Jeggings', age_group: '2-4 Years', gender: 'Girls', category: 'Jeggings / Jeans', subcategory: 'Jeggings', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 549, original_price: 799, discount: 31, material: 'Denim Stretch', description: 'Comfortable stretch jeggings for active kids', brand: 'KidsDenim', color: 'Blue', rating: 4.4, reviews_count: 67, in_stock: true },
  { product_id: 'gp008', product_name: 'Woolen Sweater with Bow', age_group: '2-4 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Sweaters', season: 'Winter', images: [], sizes: ['2Y', '3Y', '4Y'], price: 799, original_price: 1199, discount: 33, material: 'Wool', description: 'Cute woolen sweater with decorative bow', brand: 'WarmKids', color: 'Red', rating: 4.6, reviews_count: 45, in_stock: true },
  
  // Girls 4-6 Years
  { product_id: 'gp009', product_name: 'Cotton Lehenga Set', age_group: '4-6 Years', gender: 'Girls', category: 'Ethnic Wear', subcategory: 'Lehengas', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 1299, original_price: 1999, discount: 35, material: 'Cotton Silk', description: 'Traditional lehenga set for festive occasions', brand: 'EthnicKids', color: 'Maroon', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'gp010', product_name: 'Summer Shorts Set', age_group: '4-6 Years', gender: 'Girls', category: 'Bottom Wear', subcategory: 'Shorts', season: 'Summer', images: [], sizes: ['4Y', '5Y', '6Y'], price: 449, original_price: 649, discount: 31, material: 'Cotton', description: 'Cool comfortable shorts set for summer play', brand: 'PlayKids', color: 'Orange', rating: 4.3, reviews_count: 34, in_stock: true },
  
  // Girls 6-14 Years
  { product_id: 'gp011', product_name: 'Trendy Graphic T-shirt', age_group: '6-14 Years', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Printed T-shirts', season: 'Summer', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 399, original_price: 599, discount: 33, material: 'Cotton', description: 'Stylish graphic tee for trendy teens', brand: 'TeenStyle', color: 'White', rating: 4.5, reviews_count: 156, in_stock: true },
  { product_id: 'gp012', product_name: 'Winter Puffer Jacket', age_group: '6-14 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 1499, original_price: 2499, discount: 40, material: 'Polyester Fill', description: 'Warm puffer jacket for cold winter days', brand: 'WinterPro', color: 'Purple', rating: 4.7, reviews_count: 98, in_stock: true },
  
  // Boys 0-6 Months
  { product_id: 'bp001', product_name: 'Blue Cotton Romper', age_group: '0-6 Months', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'Summer', images: [], sizes: ['0-3M', '3-6M'], price: 299, original_price: 499, discount: 40, material: 'Cotton', description: 'Soft comfortable romper for baby boys', brand: 'BabyBoys', color: 'Blue', rating: 4.5, reviews_count: 52, in_stock: true },
  { product_id: 'bp002', product_name: 'Fleece Hoodie Onesie', age_group: '0-6 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 649, original_price: 949, discount: 32, material: 'Fleece', description: 'Warm hoodie onesie with cute ears', brand: 'CozyBaby', color: 'Grey', rating: 4.8, reviews_count: 76, in_stock: true },
  
  // Boys 6-24 Months
  { product_id: 'bp003', product_name: 'Striped Polo T-shirt', age_group: '6-24 Months', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Polo T-shirts', season: 'Summer', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 349, original_price: 549, discount: 36, material: 'Cotton Pique', description: 'Classic striped polo for stylish babies', brand: 'BabyPolo', color: 'Navy', rating: 4.4, reviews_count: 43, in_stock: true },
  { product_id: 'bp004', product_name: 'Thermal Bodysuit Set', age_group: '6-24 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Thermals', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 549, original_price: 799, discount: 31, material: 'Thermal Cotton', description: 'Warm thermal bodysuit for winter protection', brand: 'WarmBoys', color: 'White', rating: 4.6, reviews_count: 67, in_stock: true },
  
  // Boys 2-4 Years
  { product_id: 'bp005', product_name: 'Denim Jeans Regular Fit', age_group: '2-4 Years', gender: 'Boys', category: 'Jeggings / Jeans', subcategory: 'Regular Fit', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 599, original_price: 899, discount: 33, material: 'Denim', description: 'Durable denim jeans for active boys', brand: 'DenimKids', color: 'Blue', rating: 4.5, reviews_count: 89, in_stock: true },
  { product_id: 'bp006', product_name: 'Cartoon Print Hoodie', age_group: '2-4 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['2Y', '3Y', '4Y'], price: 699, original_price: 1099, discount: 36, material: 'Cotton Fleece', description: 'Fun cartoon print hoodie for playful days', brand: 'ToonKids', color: 'Red', rating: 4.7, reviews_count: 112, in_stock: true },
  { product_id: 'bp007', product_name: 'Party Suit 3-Piece', age_group: '2-4 Years', gender: 'Boys', category: 'Party Wear', subcategory: 'Suits', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 1499, original_price: 2299, discount: 35, material: 'Polyester Blend', description: 'Elegant 3-piece suit for special occasions', brand: 'LittleGent', color: 'Navy', rating: 4.8, reviews_count: 78, in_stock: true },
  
  // Boys 4-6 Years
  { product_id: 'bp008', product_name: 'Kurta Pajama Set', age_group: '4-6 Years', gender: 'Boys', category: 'Ethnic Wear', subcategory: 'Kurtas', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 899, original_price: 1399, discount: 36, material: 'Cotton', description: 'Traditional kurta pajama for festive wear', brand: 'DesiKids', color: 'Cream', rating: 4.6, reviews_count: 67, in_stock: true },
  { product_id: 'bp009', product_name: 'Sports Shorts Pack', age_group: '4-6 Years', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Shorts', season: 'Summer', images: [], sizes: ['4Y', '5Y', '6Y'], price: 499, original_price: 749, discount: 33, material: 'Polyester', description: 'Quick-dry sports shorts for active play', brand: 'SportsBoy', color: 'Multi', rating: 4.4, reviews_count: 45, in_stock: true },
  
  // Boys 6-14 Years
  { product_id: 'bp010', product_name: 'Graphic Print Shirt', age_group: '6-14 Years', gender: 'Boys', category: 'Shirts', subcategory: 'Casual Shirts', season: 'Summer', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 499, original_price: 799, discount: 38, material: 'Cotton', description: 'Cool graphic shirt for teens', brand: 'TeenBoy', color: 'Black', rating: 4.5, reviews_count: 134, in_stock: true },
  { product_id: 'bp011', product_name: 'Heavy Winter Jacket', age_group: '6-14 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 1699, original_price: 2699, discount: 37, material: 'Polyester Fill', description: 'Heavy duty winter jacket for extreme cold', brand: 'WinterBoy', color: 'Black', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'bp012', product_name: 'Track Pants Combo', age_group: '6-14 Years', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Track Pants', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 699, original_price: 999, discount: 30, material: 'Cotton Blend', description: 'Comfortable track pants pack of 2', brand: 'ActiveBoy', color: 'Navy/Grey', rating: 4.4, reviews_count: 78, in_stock: true },
  
  // Footwear
  { product_id: 'fp001', product_name: 'Girls Sparkle Sandals', age_group: '2-4 Years', gender: 'Girls', category: 'Footwear', subcategory: 'Sandals', season: 'Summer', images: [], sizes: ['5', '6', '7', '8'], price: 499, original_price: 799, discount: 38, material: 'PU Leather', description: 'Sparkly sandals for little princesses', brand: 'KidsStep', color: 'Gold', rating: 4.6, reviews_count: 56, in_stock: true },
  { product_id: 'fp002', product_name: 'Boys Sports Sneakers', age_group: '4-6 Years', gender: 'Boys', category: 'Footwear', subcategory: 'Sneakers', season: 'All Season', images: [], sizes: ['8', '9', '10', '11'], price: 799, original_price: 1199, discount: 33, material: 'Mesh', description: 'Lightweight sports sneakers for active boys', brand: 'SpeedKids', color: 'Blue/White', rating: 4.7, reviews_count: 89, in_stock: true },
  
  // Accessories
  { product_id: 'ap001', product_name: 'Girls Hair Accessories Set', age_group: '2-4 Years', gender: 'Girls', category: 'Accessories', subcategory: 'Hair Accessories', season: 'All Season', images: [], sizes: ['One Size'], price: 199, original_price: 299, discount: 33, material: 'Fabric', description: 'Beautiful hair clips and bands set', brand: 'PrettyKids', color: 'Mixed', rating: 4.5, reviews_count: 45, in_stock: true },
  { product_id: 'ap002', product_name: 'Boys Backpack School', age_group: '6-14 Years', gender: 'Boys', category: 'Accessories', subcategory: 'Bags', season: 'All Season', images: [], sizes: ['One Size'], price: 699, original_price: 999, discount: 30, material: 'Polyester', description: 'Durable school backpack with laptop compartment', brand: 'SchoolMate', color: 'Navy', rating: 4.6, reviews_count: 123, in_stock: true },
];

// Filter products by age and gender
export const getProductsByAgeGender = (age: AgeRange, gender: Gender): KidsFashionProduct[] => {
  return KIDS_FASHION_PRODUCTS.filter(p => p.age_group === age && p.gender === gender);
};

// Filter products by category
export const getProductsByCategory = (age: AgeRange, gender: Gender, category: string): KidsFashionProduct[] => {
  return KIDS_FASHION_PRODUCTS.filter(p => 
    p.age_group === age && 
    p.gender === gender && 
    p.category === category
  );
};

// Get categories for gender
export const getCategoriesForGender = (gender: Gender): KidsFashionCategory[] => {
  return KIDS_FASHION_CATEGORIES.filter(c => c.forGender.includes(gender));
};

// Get unique brands
export const getUniqueBrands = (products: KidsFashionProduct[]): string[] => {
  return [...new Set(products.map(p => p.brand))];
};

// Get unique colors
export const getUniqueColors = (products: KidsFashionProduct[]): string[] => {
  return [...new Set(products.map(p => p.color))];
};

// Price ranges for filtering
export const PRICE_RANGES = [
  { id: '1', label: 'Under ₹300', min: 0, max: 300 },
  { id: '2', label: '₹300 - ₹500', min: 300, max: 500 },
  { id: '3', label: '₹500 - ₹1000', min: 500, max: 1000 },
  { id: '4', label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { id: '5', label: 'Above ₹2000', min: 2000, max: 99999 },
];

// Sort options
export const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest First' },
  { id: 'rating', label: 'Best Rating' },
  { id: 'discount', label: 'Best Discount' },
];
