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

// Extended Products Data - 10+ products per age/gender group
export const KIDS_FASHION_PRODUCTS: KidsFashionProduct[] = [
  // Girls 0-6 Months (12 products)
  { product_id: 'gp001', product_name: 'Soft Cotton Romper Pink', age_group: '0-6 Months', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'Summer', images: [], sizes: ['0-3M', '3-6M'], price: 249, original_price: 499, discount: 50, material: 'Cotton', description: 'Soft breathable cotton romper perfect for summer days', brand: 'BabyKids', color: 'Pink', rating: 4.5, reviews_count: 45, in_stock: true },
  { product_id: 'gp002', product_name: 'Winter Fleece Onesie', age_group: '0-6 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Thermals', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 449, original_price: 899, discount: 50, material: 'Fleece', description: 'Warm cozy fleece onesie for cold winter nights', brand: 'WarmBaby', color: 'White', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'gp003', product_name: 'Floral Print Frock', age_group: '0-6 Months', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Casual Dresses', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 299, original_price: 599, discount: 50, material: 'Cotton Blend', description: 'Adorable floral print frock for your little princess', brand: 'TinyTots', color: 'Floral', rating: 4.3, reviews_count: 34, in_stock: true },
  { product_id: 'gp003a', product_name: 'Polka Dot Bodysuit', age_group: '0-6 Months', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 199, original_price: 399, discount: 50, material: 'Cotton', description: 'Cute polka dot bodysuit for everyday comfort', brand: 'BabyStyle', color: 'Pink/White', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'gp003b', product_name: 'Velvet Winter Dress', age_group: '0-6 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Thermals', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 399, original_price: 799, discount: 50, material: 'Velvet', description: 'Luxurious velvet dress for winter occasions', brand: 'LuxBaby', color: 'Maroon', rating: 4.7, reviews_count: 67, in_stock: true },
  { product_id: 'gp003c', product_name: 'Lace Party Frock', age_group: '0-6 Months', gender: 'Girls', category: 'Party Wear', subcategory: 'Party Dresses', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 499, original_price: 999, discount: 50, material: 'Lace', description: 'Delicate lace frock for special occasions', brand: 'PartyBaby', color: 'Ivory', rating: 4.6, reviews_count: 45, in_stock: true },
  { product_id: 'gp003d', product_name: 'Cotton Leggings Set', age_group: '0-6 Months', gender: 'Girls', category: 'Bottom Wear', subcategory: 'Leggings', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 249, original_price: 499, discount: 50, material: 'Cotton', description: 'Soft cotton leggings pack of 3', brand: 'ComfyBaby', color: 'Multi', rating: 4.5, reviews_count: 78, in_stock: true },
  { product_id: 'gp003e', product_name: 'Knit Booties', age_group: '0-6 Months', gender: 'Girls', category: 'Footwear', subcategory: 'Casual Shoes', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 199, original_price: 399, discount: 50, material: 'Knit', description: 'Adorable knitted booties to keep tiny feet warm', brand: 'TinyFeet', color: 'Pink', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'gp003f', product_name: 'Headband Set', age_group: '0-6 Months', gender: 'Girls', category: 'Accessories', subcategory: 'Hair Accessories', season: 'All Season', images: [], sizes: ['One Size'], price: 149, original_price: 299, discount: 50, material: 'Fabric', description: 'Set of 5 adorable headbands', brand: 'PrettyBaby', color: 'Multi', rating: 4.3, reviews_count: 34, in_stock: true },
  { product_id: 'gp003g', product_name: 'Thermal Sleep Suit', age_group: '0-6 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Thermals', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 349, original_price: 699, discount: 50, material: 'Thermal Cotton', description: 'Warm thermal sleep suit for cold nights', brand: 'SleepyBaby', color: 'Lavender', rating: 4.7, reviews_count: 56, in_stock: true },
  { product_id: 'gp003h', product_name: 'Ruffle Dress', age_group: '0-6 Months', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Party Dresses', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 399, original_price: 799, discount: 50, material: 'Cotton Blend', description: 'Beautiful ruffle dress for photoshoots', brand: 'PhotoReady', color: 'Peach', rating: 4.6, reviews_count: 67, in_stock: true },
  { product_id: 'gp003i', product_name: 'Striped T-shirt Set', age_group: '0-6 Months', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'Summer', images: [], sizes: ['0-3M', '3-6M'], price: 299, original_price: 599, discount: 50, material: 'Cotton', description: 'Pack of 3 striped t-shirts', brand: 'DailyWear', color: 'Multi', rating: 4.4, reviews_count: 45, in_stock: true },

  // Girls 6-24 Months (12 products)
  { product_id: 'gp004', product_name: 'Summer Cotton Dress', age_group: '6-24 Months', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Casual Dresses', season: 'Summer', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 349, original_price: 699, discount: 50, material: 'Cotton', description: 'Light and breezy summer dress', brand: 'CuteBaby', color: 'Yellow', rating: 4.6, reviews_count: 56, in_stock: true },
  { product_id: 'gp005', product_name: 'Knitted Cardigan', age_group: '6-24 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Cardigans', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 499, original_price: 999, discount: 50, material: 'Wool Blend', description: 'Soft knitted cardigan for cozy winter days', brand: 'WinterKids', color: 'Cream', rating: 4.7, reviews_count: 78, in_stock: true },
  { product_id: 'gp004a', product_name: 'Floral Jumpsuit', age_group: '6-24 Months', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Casual Dresses', season: 'Summer', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 399, original_price: 799, discount: 50, material: 'Cotton', description: 'Adorable floral jumpsuit for summer', brand: 'FlowerKids', color: 'Multi', rating: 4.5, reviews_count: 67, in_stock: true },
  { product_id: 'gp004b', product_name: 'Fleece Hoodie Set', age_group: '6-24 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 599, original_price: 1199, discount: 50, material: 'Fleece', description: 'Cozy fleece hoodie with matching pants', brand: 'CozyKids', color: 'Pink', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'gp004c', product_name: 'Denim Dungaree', age_group: '6-24 Months', gender: 'Girls', category: 'Jeggings / Jeans', subcategory: 'Jeggings', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 499, original_price: 999, discount: 50, material: 'Denim', description: 'Cute denim dungaree for playful days', brand: 'DenimBaby', color: 'Blue', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'gp004d', product_name: 'Party Tutu Dress', age_group: '6-24 Months', gender: 'Girls', category: 'Party Wear', subcategory: 'Party Dresses', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 649, original_price: 1299, discount: 50, material: 'Tulle', description: 'Sparkly tutu dress for birthday parties', brand: 'PartyPrincess', color: 'Purple', rating: 4.9, reviews_count: 112, in_stock: true },
  { product_id: 'gp004e', product_name: 'Cotton Shorts Pack', age_group: '6-24 Months', gender: 'Girls', category: 'Bottom Wear', subcategory: 'Shorts', season: 'Summer', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 299, original_price: 599, discount: 50, material: 'Cotton', description: 'Pack of 3 comfortable shorts', brand: 'SummerBaby', color: 'Multi', rating: 4.3, reviews_count: 45, in_stock: true },
  { product_id: 'gp004f', product_name: 'Ethnic Frock Set', age_group: '6-24 Months', gender: 'Girls', category: 'Ethnic Wear', subcategory: 'Lehengas', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 599, original_price: 1199, discount: 50, material: 'Cotton Silk', description: 'Traditional ethnic frock for festivals', brand: 'EthnicBaby', color: 'Red', rating: 4.7, reviews_count: 78, in_stock: true },
  { product_id: 'gp004g', product_name: 'Printed T-shirt Pack', age_group: '6-24 Months', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Printed T-shirts', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 399, original_price: 799, discount: 50, material: 'Cotton', description: 'Pack of 5 cute printed t-shirts', brand: 'PrintBaby', color: 'Multi', rating: 4.5, reviews_count: 67, in_stock: true },
  { product_id: 'gp004h', product_name: 'Velvet Winter Coat', age_group: '6-24 Months', gender: 'Girls', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 749, original_price: 1499, discount: 50, material: 'Velvet', description: 'Elegant velvet coat for winter outings', brand: 'WinterPrincess', color: 'Maroon', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'gp004i', product_name: 'Soft Sole Shoes', age_group: '6-24 Months', gender: 'Girls', category: 'Footwear', subcategory: 'Casual Shoes', season: 'All Season', images: [], sizes: ['3', '4', '5', '6'], price: 299, original_price: 599, discount: 50, material: 'Leather', description: 'Soft sole first walker shoes', brand: 'FirstSteps', color: 'White', rating: 4.6, reviews_count: 56, in_stock: true },
  { product_id: 'gp004j', product_name: 'Hair Clips Set', age_group: '6-24 Months', gender: 'Girls', category: 'Accessories', subcategory: 'Hair Accessories', season: 'All Season', images: [], sizes: ['One Size'], price: 149, original_price: 299, discount: 50, material: 'Plastic', description: 'Set of 10 colorful hair clips', brand: 'PrettyClips', color: 'Multi', rating: 4.4, reviews_count: 45, in_stock: true },

  // Girls 2-4 Years (12 products)
  { product_id: 'gp006', product_name: 'Princess Party Dress', age_group: '2-4 Years', gender: 'Girls', category: 'Party Wear', subcategory: 'Party Dresses', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 749, original_price: 1499, discount: 50, material: 'Satin', description: 'Beautiful princess dress for special occasions', brand: 'FairyTale', color: 'Pink', rating: 4.9, reviews_count: 120, in_stock: true },
  { product_id: 'gp007', product_name: 'Denim Jeggings', age_group: '2-4 Years', gender: 'Girls', category: 'Jeggings / Jeans', subcategory: 'Jeggings', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 399, original_price: 799, discount: 50, material: 'Denim Stretch', description: 'Comfortable stretch jeggings for active kids', brand: 'KidsDenim', color: 'Blue', rating: 4.4, reviews_count: 67, in_stock: true },
  { product_id: 'gp008', product_name: 'Woolen Sweater with Bow', age_group: '2-4 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Sweaters', season: 'Winter', images: [], sizes: ['2Y', '3Y', '4Y'], price: 599, original_price: 1199, discount: 50, material: 'Wool', description: 'Cute woolen sweater with decorative bow', brand: 'WarmKids', color: 'Red', rating: 4.6, reviews_count: 45, in_stock: true },
  { product_id: 'gp006a', product_name: 'Unicorn Print Dress', age_group: '2-4 Years', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Casual Dresses', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 449, original_price: 899, discount: 50, material: 'Cotton', description: 'Magical unicorn print dress', brand: 'MagicKids', color: 'Rainbow', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'gp006b', product_name: 'Puffer Jacket Pink', age_group: '2-4 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['2Y', '3Y', '4Y'], price: 799, original_price: 1599, discount: 50, material: 'Polyester', description: 'Warm puffer jacket for cold days', brand: 'WinterGirl', color: 'Pink', rating: 4.8, reviews_count: 98, in_stock: true },
  { product_id: 'gp006c', product_name: 'Ethnic Salwar Set', age_group: '2-4 Years', gender: 'Girls', category: 'Ethnic Wear', subcategory: 'Salwar Sets', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 649, original_price: 1299, discount: 50, material: 'Cotton', description: 'Traditional salwar set for festivals', brand: 'EthnicGirl', color: 'Green', rating: 4.5, reviews_count: 67, in_stock: true },
  { product_id: 'gp006d', product_name: 'Leggings Combo Pack', age_group: '2-4 Years', gender: 'Girls', category: 'Bottom Wear', subcategory: 'Leggings', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 349, original_price: 699, discount: 50, material: 'Cotton Lycra', description: 'Pack of 4 comfortable leggings', brand: 'ComfyGirl', color: 'Multi', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'gp006e', product_name: 'Polo T-shirt Set', age_group: '2-4 Years', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Polo T-shirts', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 399, original_price: 799, discount: 50, material: 'Cotton Pique', description: 'Classic polo t-shirts pack of 2', brand: 'PoloGirl', color: 'Pink/White', rating: 4.3, reviews_count: 45, in_stock: true },
  { product_id: 'gp006f', product_name: 'Ballet Flats', age_group: '2-4 Years', gender: 'Girls', category: 'Footwear', subcategory: 'Casual Shoes', season: 'All Season', images: [], sizes: ['5', '6', '7', '8'], price: 399, original_price: 799, discount: 50, material: 'PU Leather', description: 'Elegant ballet flats for little feet', brand: 'DanceGirl', color: 'Gold', rating: 4.6, reviews_count: 78, in_stock: true },
  { product_id: 'gp006g', product_name: 'Bow Headband Set', age_group: '2-4 Years', gender: 'Girls', category: 'Accessories', subcategory: 'Hair Accessories', season: 'All Season', images: [], sizes: ['One Size'], price: 199, original_price: 399, discount: 50, material: 'Fabric', description: 'Set of 6 bow headbands', brand: 'BowGirl', color: 'Multi', rating: 4.5, reviews_count: 56, in_stock: true },
  { product_id: 'fp001', product_name: 'Girls Sparkle Sandals', age_group: '2-4 Years', gender: 'Girls', category: 'Footwear', subcategory: 'Sandals', season: 'Summer', images: [], sizes: ['5', '6', '7', '8'], price: 399, original_price: 799, discount: 50, material: 'PU Leather', description: 'Sparkly sandals for little princesses', brand: 'KidsStep', color: 'Gold', rating: 4.6, reviews_count: 56, in_stock: true },
  { product_id: 'ap001', product_name: 'Girls Hair Accessories Set', age_group: '2-4 Years', gender: 'Girls', category: 'Accessories', subcategory: 'Hair Accessories', season: 'All Season', images: [], sizes: ['One Size'], price: 149, original_price: 299, discount: 50, material: 'Fabric', description: 'Beautiful hair clips and bands set', brand: 'PrettyKids', color: 'Mixed', rating: 4.5, reviews_count: 45, in_stock: true },

  // Girls 4-6 Years (12 products)
  { product_id: 'gp009', product_name: 'Cotton Lehenga Set', age_group: '4-6 Years', gender: 'Girls', category: 'Ethnic Wear', subcategory: 'Lehengas', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 999, original_price: 1999, discount: 50, material: 'Cotton Silk', description: 'Traditional lehenga set for festive occasions', brand: 'EthnicKids', color: 'Maroon', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'gp010', product_name: 'Summer Shorts Set', age_group: '4-6 Years', gender: 'Girls', category: 'Bottom Wear', subcategory: 'Shorts', season: 'Summer', images: [], sizes: ['4Y', '5Y', '6Y'], price: 299, original_price: 599, discount: 50, material: 'Cotton', description: 'Cool comfortable shorts set for summer play', brand: 'PlayKids', color: 'Orange', rating: 4.3, reviews_count: 34, in_stock: true },
  { product_id: 'gp009a', product_name: 'Sequin Party Dress', age_group: '4-6 Years', gender: 'Girls', category: 'Party Wear', subcategory: 'Party Dresses', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 899, original_price: 1799, discount: 50, material: 'Sequin', description: 'Stunning sequin dress for celebrations', brand: 'PartyQueen', color: 'Silver', rating: 4.9, reviews_count: 134, in_stock: true },
  { product_id: 'gp009b', product_name: 'Quilted Winter Jacket', age_group: '4-6 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['4Y', '5Y', '6Y'], price: 899, original_price: 1799, discount: 50, material: 'Polyester', description: 'Quilted jacket for extreme cold', brand: 'WinterPro', color: 'Purple', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'gp009c', product_name: 'Maxi Dress Floral', age_group: '4-6 Years', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'Maxi Dresses', season: 'Summer', images: [], sizes: ['4Y', '5Y', '6Y'], price: 549, original_price: 1099, discount: 50, material: 'Rayon', description: 'Flowing floral maxi dress', brand: 'FloralGirl', color: 'Multi', rating: 4.5, reviews_count: 67, in_stock: true },
  { product_id: 'gp009d', product_name: 'Slim Fit Jeans', age_group: '4-6 Years', gender: 'Girls', category: 'Jeggings / Jeans', subcategory: 'Slim Fit', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 499, original_price: 999, discount: 50, material: 'Denim', description: 'Trendy slim fit jeans', brand: 'DenimGirl', color: 'Dark Blue', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'gp009e', product_name: 'Printed T-shirts Pack', age_group: '4-6 Years', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Printed T-shirts', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 499, original_price: 999, discount: 50, material: 'Cotton', description: 'Pack of 5 trendy printed tees', brand: 'TeeGirl', color: 'Multi', rating: 4.6, reviews_count: 78, in_stock: true },
  { product_id: 'gp009f', product_name: 'Woolen Cardigan', age_group: '4-6 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Cardigans', season: 'Winter', images: [], sizes: ['4Y', '5Y', '6Y'], price: 599, original_price: 1199, discount: 50, material: 'Wool Blend', description: 'Classic woolen cardigan', brand: 'KnitGirl', color: 'Cream', rating: 4.5, reviews_count: 56, in_stock: true },
  { product_id: 'gp009g', product_name: 'Sports Sneakers', age_group: '4-6 Years', gender: 'Girls', category: 'Footwear', subcategory: 'Sneakers', season: 'All Season', images: [], sizes: ['8', '9', '10', '11'], price: 599, original_price: 1199, discount: 50, material: 'Mesh', description: 'Lightweight sports sneakers', brand: 'SportGirl', color: 'Pink/White', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'gp009h', product_name: 'Backpack Unicorn', age_group: '4-6 Years', gender: 'Girls', category: 'Accessories', subcategory: 'Bags', season: 'All Season', images: [], sizes: ['One Size'], price: 449, original_price: 899, discount: 50, material: 'Canvas', description: 'Cute unicorn themed backpack', brand: 'MagicBag', color: 'Pink', rating: 4.8, reviews_count: 112, in_stock: true },
  { product_id: 'gp009i', product_name: 'Formal Shirt', age_group: '4-6 Years', gender: 'Girls', category: 'Shirts', subcategory: 'Formal Shirts', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 399, original_price: 799, discount: 50, material: 'Cotton', description: 'Formal shirt for school events', brand: 'FormalGirl', color: 'White', rating: 4.3, reviews_count: 45, in_stock: true },
  { product_id: 'gp009j', product_name: 'Track Pants', age_group: '4-6 Years', gender: 'Girls', category: 'Bottom Wear', subcategory: 'Track Pants', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 349, original_price: 699, discount: 50, material: 'Polyester', description: 'Comfortable track pants for sports', brand: 'ActiveGirl', color: 'Navy', rating: 4.4, reviews_count: 56, in_stock: true },

  // Girls 6-14 Years (12 products)
  { product_id: 'gp011', product_name: 'Trendy Graphic T-shirt', age_group: '6-14 Years', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Printed T-shirts', season: 'Summer', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 299, original_price: 599, discount: 50, material: 'Cotton', description: 'Stylish graphic tee for trendy teens', brand: 'TeenStyle', color: 'White', rating: 4.5, reviews_count: 156, in_stock: true },
  { product_id: 'gp012', product_name: 'Winter Puffer Jacket', age_group: '6-14 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 1249, original_price: 2499, discount: 50, material: 'Polyester Fill', description: 'Warm puffer jacket for cold winter days', brand: 'WinterPro', color: 'Purple', rating: 4.7, reviews_count: 98, in_stock: true },
  { product_id: 'gp011a', product_name: 'Crop Top Set', age_group: '6-14 Years', gender: 'Girls', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'Summer', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 399, original_price: 799, discount: 50, material: 'Cotton', description: 'Trendy crop top with high-waist pants', brand: 'TrendyTeen', color: 'Black', rating: 4.6, reviews_count: 134, in_stock: true },
  { product_id: 'gp011b', product_name: 'Distressed Jeans', age_group: '6-14 Years', gender: 'Girls', category: 'Jeggings / Jeans', subcategory: 'Distressed Jeans', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 599, original_price: 1199, discount: 50, material: 'Denim', description: 'Fashionable distressed jeans', brand: 'DenimTeen', color: 'Blue', rating: 4.5, reviews_count: 89, in_stock: true },
  { product_id: 'gp011c', product_name: 'Party Gown', age_group: '6-14 Years', gender: 'Girls', category: 'Party Wear', subcategory: 'Gowns', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 1499, original_price: 2999, discount: 50, material: 'Satin', description: 'Elegant party gown for special occasions', brand: 'GlamGirl', color: 'Rose', rating: 4.9, reviews_count: 156, in_stock: true },
  { product_id: 'gp011d', product_name: 'Hoodie Pullover', age_group: '6-14 Years', gender: 'Girls', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 649, original_price: 1299, discount: 50, material: 'Cotton Fleece', description: 'Cozy hoodie pullover', brand: 'CozyTeen', color: 'Grey', rating: 4.6, reviews_count: 112, in_stock: true },
  { product_id: 'gp011e', product_name: 'Anarkali Suit', age_group: '6-14 Years', gender: 'Girls', category: 'Ethnic Wear', subcategory: 'Salwar Sets', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 999, original_price: 1999, discount: 50, material: 'Georgette', description: 'Beautiful anarkali suit for festivals', brand: 'EthnicTeen', color: 'Yellow', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'gp011f', product_name: 'Casual Shirt', age_group: '6-14 Years', gender: 'Girls', category: 'Shirts', subcategory: 'Casual Shirts', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 449, original_price: 899, discount: 50, material: 'Cotton', description: 'Trendy casual shirt', brand: 'CasualTeen', color: 'Check', rating: 4.4, reviews_count: 67, in_stock: true },
  { product_id: 'gp011g', product_name: 'Palazzo Pants', age_group: '6-14 Years', gender: 'Girls', category: 'Bottom Wear', subcategory: 'Trousers', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 399, original_price: 799, discount: 50, material: 'Rayon', description: 'Comfortable palazzo pants', brand: 'ComfyTeen', color: 'Navy', rating: 4.5, reviews_count: 78, in_stock: true },
  { product_id: 'gp011h', product_name: 'Running Shoes', age_group: '6-14 Years', gender: 'Girls', category: 'Footwear', subcategory: 'Sneakers', season: 'All Season', images: [], sizes: ['10', '11', '12', '13', '1', '2'], price: 799, original_price: 1599, discount: 50, material: 'Mesh', description: 'Lightweight running shoes', brand: 'RunTeen', color: 'Pink/Black', rating: 4.8, reviews_count: 134, in_stock: true },
  { product_id: 'gp011i', product_name: 'School Backpack', age_group: '6-14 Years', gender: 'Girls', category: 'Accessories', subcategory: 'Bags', season: 'All Season', images: [], sizes: ['One Size'], price: 649, original_price: 1299, discount: 50, material: 'Polyester', description: 'Spacious school backpack', brand: 'SchoolTeen', color: 'Multi', rating: 4.6, reviews_count: 112, in_stock: true },
  { product_id: 'gp011j', product_name: 'A-Line Dress', age_group: '6-14 Years', gender: 'Girls', category: 'Frocks / Dresses', subcategory: 'A-Line Dresses', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 549, original_price: 1099, discount: 50, material: 'Cotton', description: 'Classic A-line dress', brand: 'ClassicGirl', color: 'Blue', rating: 4.5, reviews_count: 78, in_stock: true },

  // Boys 0-6 Months (12 products)
  { product_id: 'bp001', product_name: 'Blue Cotton Romper', age_group: '0-6 Months', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'Summer', images: [], sizes: ['0-3M', '3-6M'], price: 249, original_price: 499, discount: 50, material: 'Cotton', description: 'Soft comfortable romper for baby boys', brand: 'BabyBoys', color: 'Blue', rating: 4.5, reviews_count: 52, in_stock: true },
  { product_id: 'bp002', product_name: 'Fleece Hoodie Onesie', age_group: '0-6 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 474, original_price: 949, discount: 50, material: 'Fleece', description: 'Warm hoodie onesie with cute ears', brand: 'CozyBaby', color: 'Grey', rating: 4.8, reviews_count: 76, in_stock: true },
  { product_id: 'bp001a', product_name: 'Striped Bodysuit Set', age_group: '0-6 Months', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 299, original_price: 599, discount: 50, material: 'Cotton', description: 'Pack of 3 striped bodysuits', brand: 'StripeBaby', color: 'Multi', rating: 4.4, reviews_count: 45, in_stock: true },
  { product_id: 'bp001b', product_name: 'Thermal Onesie', age_group: '0-6 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Thermals', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 349, original_price: 699, discount: 50, material: 'Thermal Cotton', description: 'Warm thermal onesie for cold nights', brand: 'WarmBoy', color: 'White', rating: 4.7, reviews_count: 67, in_stock: true },
  { product_id: 'bp001c', product_name: 'Denim Overall', age_group: '0-6 Months', gender: 'Boys', category: 'Jeggings / Jeans', subcategory: 'Regular Fit', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 399, original_price: 799, discount: 50, material: 'Denim', description: 'Cute denim overall for baby boys', brand: 'DenimBoy', color: 'Blue', rating: 4.5, reviews_count: 56, in_stock: true },
  { product_id: 'bp001d', product_name: 'Formal Romper', age_group: '0-6 Months', gender: 'Boys', category: 'Party Wear', subcategory: 'Suits', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 499, original_price: 999, discount: 50, material: 'Cotton Blend', description: 'Formal romper for special occasions', brand: 'FormalBaby', color: 'Navy', rating: 4.6, reviews_count: 45, in_stock: true },
  { product_id: 'bp001e', product_name: 'Cotton Pants Set', age_group: '0-6 Months', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Trousers', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 249, original_price: 499, discount: 50, material: 'Cotton', description: 'Pack of 3 soft cotton pants', brand: 'ComfyBoy', color: 'Multi', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'bp001f', product_name: 'Soft Booties Blue', age_group: '0-6 Months', gender: 'Boys', category: 'Footwear', subcategory: 'Casual Shoes', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 199, original_price: 399, discount: 50, material: 'Knit', description: 'Soft booties for tiny feet', brand: 'TinyFeet', color: 'Blue', rating: 4.7, reviews_count: 67, in_stock: true },
  { product_id: 'bp001g', product_name: 'Cap Set', age_group: '0-6 Months', gender: 'Boys', category: 'Accessories', subcategory: 'Caps', season: 'All Season', images: [], sizes: ['One Size'], price: 149, original_price: 299, discount: 50, material: 'Cotton', description: 'Set of 3 cute baby caps', brand: 'CapBaby', color: 'Multi', rating: 4.3, reviews_count: 34, in_stock: true },
  { product_id: 'bp001h', product_name: 'Velvet Jacket', age_group: '0-6 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['0-3M', '3-6M'], price: 399, original_price: 799, discount: 50, material: 'Velvet', description: 'Elegant velvet jacket for outings', brand: 'LuxBoy', color: 'Maroon', rating: 4.6, reviews_count: 45, in_stock: true },
  { product_id: 'bp001i', product_name: 'Printed Romper Pack', age_group: '0-6 Months', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Printed T-shirts', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 349, original_price: 699, discount: 50, material: 'Cotton', description: 'Pack of 3 printed rompers', brand: 'PrintBoy', color: 'Multi', rating: 4.5, reviews_count: 56, in_stock: true },
  { product_id: 'bp001j', product_name: 'Ethnic Kurta Set', age_group: '0-6 Months', gender: 'Boys', category: 'Ethnic Wear', subcategory: 'Kurtas', season: 'All Season', images: [], sizes: ['0-3M', '3-6M'], price: 449, original_price: 899, discount: 50, material: 'Cotton Silk', description: 'Traditional kurta set for festivals', brand: 'EthnicBoy', color: 'Cream', rating: 4.7, reviews_count: 67, in_stock: true },

  // Boys 6-24 Months (12 products)
  { product_id: 'bp003', product_name: 'Striped Polo T-shirt', age_group: '6-24 Months', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Polo T-shirts', season: 'Summer', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 274, original_price: 549, discount: 50, material: 'Cotton Pique', description: 'Classic striped polo for stylish babies', brand: 'BabyPolo', color: 'Navy', rating: 4.4, reviews_count: 43, in_stock: true },
  { product_id: 'bp004', product_name: 'Thermal Bodysuit Set', age_group: '6-24 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Thermals', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 399, original_price: 799, discount: 50, material: 'Thermal Cotton', description: 'Warm thermal bodysuit for winter protection', brand: 'WarmBoys', color: 'White', rating: 4.6, reviews_count: 67, in_stock: true },
  { product_id: 'bp003a', product_name: 'Denim Shirt', age_group: '6-24 Months', gender: 'Boys', category: 'Shirts', subcategory: 'Denim Shirts', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 399, original_price: 799, discount: 50, material: 'Denim', description: 'Trendy denim shirt for stylish babies', brand: 'DenimBoy', color: 'Blue', rating: 4.5, reviews_count: 56, in_stock: true },
  { product_id: 'bp003b', product_name: 'Fleece Jacket', age_group: '6-24 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 549, original_price: 1099, discount: 50, material: 'Fleece', description: 'Warm fleece jacket for cold days', brand: 'FleeceBoy', color: 'Navy', rating: 4.7, reviews_count: 78, in_stock: true },
  { product_id: 'bp003c', product_name: 'Cotton Joggers Set', age_group: '6-24 Months', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Track Pants', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 349, original_price: 699, discount: 50, material: 'Cotton', description: 'Comfortable joggers pack of 2', brand: 'JogBoy', color: 'Multi', rating: 4.4, reviews_count: 45, in_stock: true },
  { product_id: 'bp003d', product_name: 'Party Suit Set', age_group: '6-24 Months', gender: 'Boys', category: 'Party Wear', subcategory: 'Suits', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 799, original_price: 1599, discount: 50, material: 'Cotton Blend', description: 'Elegant party suit for celebrations', brand: 'PartyBoy', color: 'Black', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'bp003e', product_name: 'Kurta Pajama', age_group: '6-24 Months', gender: 'Boys', category: 'Ethnic Wear', subcategory: 'Kurtas', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 499, original_price: 999, discount: 50, material: 'Cotton', description: 'Traditional kurta pajama set', brand: 'EthnicBoy', color: 'Yellow', rating: 4.6, reviews_count: 67, in_stock: true },
  { product_id: 'bp003f', product_name: 'Casual T-shirt Pack', age_group: '6-24 Months', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Casual Tops', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 399, original_price: 799, discount: 50, material: 'Cotton', description: 'Pack of 5 casual t-shirts', brand: 'TeeBoy', color: 'Multi', rating: 4.5, reviews_count: 78, in_stock: true },
  { product_id: 'bp003g', product_name: 'Soft Sole Shoes', age_group: '6-24 Months', gender: 'Boys', category: 'Footwear', subcategory: 'Casual Shoes', season: 'All Season', images: [], sizes: ['3', '4', '5', '6'], price: 299, original_price: 599, discount: 50, material: 'Leather', description: 'First walker soft sole shoes', brand: 'WalkBoy', color: 'Brown', rating: 4.7, reviews_count: 67, in_stock: true },
  { product_id: 'bp003h', product_name: 'Sun Hat', age_group: '6-24 Months', gender: 'Boys', category: 'Accessories', subcategory: 'Caps', season: 'Summer', images: [], sizes: ['One Size'], price: 199, original_price: 399, discount: 50, material: 'Cotton', description: 'Protective sun hat for summer', brand: 'SunBoy', color: 'Blue', rating: 4.3, reviews_count: 34, in_stock: true },
  { product_id: 'bp003i', product_name: 'Jeans Regular Fit', age_group: '6-24 Months', gender: 'Boys', category: 'Jeggings / Jeans', subcategory: 'Regular Fit', season: 'All Season', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 449, original_price: 899, discount: 50, material: 'Denim', description: 'Classic regular fit jeans', brand: 'JeanBoy', color: 'Blue', rating: 4.5, reviews_count: 56, in_stock: true },
  { product_id: 'bp003j', product_name: 'Woolen Sweater', age_group: '6-24 Months', gender: 'Boys', category: 'Winter Wear', subcategory: 'Sweaters', season: 'Winter', images: [], sizes: ['6-12M', '12-18M', '18-24M'], price: 499, original_price: 999, discount: 50, material: 'Wool', description: 'Warm woolen sweater', brand: 'WoolBoy', color: 'Grey', rating: 4.6, reviews_count: 67, in_stock: true },

  // Boys 2-4 Years (12 products)
  { product_id: 'bp005', product_name: 'Denim Jeans Regular Fit', age_group: '2-4 Years', gender: 'Boys', category: 'Jeggings / Jeans', subcategory: 'Regular Fit', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 449, original_price: 899, discount: 50, material: 'Denim', description: 'Durable denim jeans for active boys', brand: 'DenimKids', color: 'Blue', rating: 4.5, reviews_count: 89, in_stock: true },
  { product_id: 'bp006', product_name: 'Cartoon Print Hoodie', age_group: '2-4 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['2Y', '3Y', '4Y'], price: 549, original_price: 1099, discount: 50, material: 'Cotton Fleece', description: 'Fun cartoon print hoodie for playful days', brand: 'ToonKids', color: 'Red', rating: 4.7, reviews_count: 112, in_stock: true },
  { product_id: 'bp007', product_name: 'Party Suit 3-Piece', age_group: '2-4 Years', gender: 'Boys', category: 'Party Wear', subcategory: 'Suits', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 1149, original_price: 2299, discount: 50, material: 'Polyester Blend', description: 'Elegant 3-piece suit for special occasions', brand: 'LittleGent', color: 'Navy', rating: 4.8, reviews_count: 78, in_stock: true },
  { product_id: 'bp005a', product_name: 'Polo T-shirt Pack', age_group: '2-4 Years', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Polo T-shirts', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 499, original_price: 999, discount: 50, material: 'Cotton Pique', description: 'Pack of 3 polo t-shirts', brand: 'PoloBoy', color: 'Multi', rating: 4.5, reviews_count: 67, in_stock: true },
  { product_id: 'bp005b', product_name: 'Winter Jacket', age_group: '2-4 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['2Y', '3Y', '4Y'], price: 799, original_price: 1599, discount: 50, material: 'Polyester', description: 'Warm winter jacket', brand: 'WinterBoy', color: 'Black', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'bp005c', product_name: 'Cotton Shorts Pack', age_group: '2-4 Years', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Shorts', season: 'Summer', images: [], sizes: ['2Y', '3Y', '4Y'], price: 349, original_price: 699, discount: 50, material: 'Cotton', description: 'Pack of 3 cotton shorts', brand: 'ShortBoy', color: 'Multi', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'bp005d', product_name: 'Casual Shirt', age_group: '2-4 Years', gender: 'Boys', category: 'Shirts', subcategory: 'Casual Shirts', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 399, original_price: 799, discount: 50, material: 'Cotton', description: 'Trendy casual shirt', brand: 'ShirtBoy', color: 'Check', rating: 4.5, reviews_count: 67, in_stock: true },
  { product_id: 'bp005e', product_name: 'Ethnic Kurta Set', age_group: '2-4 Years', gender: 'Boys', category: 'Ethnic Wear', subcategory: 'Kurtas', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 599, original_price: 1199, discount: 50, material: 'Cotton Silk', description: 'Traditional kurta set for festivals', brand: 'EthnicBoy', color: 'Cream', rating: 4.6, reviews_count: 78, in_stock: true },
  { product_id: 'bp005f', product_name: 'Sports Sneakers', age_group: '2-4 Years', gender: 'Boys', category: 'Footwear', subcategory: 'Sneakers', season: 'All Season', images: [], sizes: ['5', '6', '7', '8'], price: 499, original_price: 999, discount: 50, material: 'Mesh', description: 'Lightweight sports sneakers', brand: 'SpeedBoy', color: 'Blue/White', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'bp005g', product_name: 'Backpack Dino', age_group: '2-4 Years', gender: 'Boys', category: 'Accessories', subcategory: 'Bags', season: 'All Season', images: [], sizes: ['One Size'], price: 399, original_price: 799, discount: 50, material: 'Canvas', description: 'Dinosaur themed backpack', brand: 'DinoBag', color: 'Green', rating: 4.8, reviews_count: 112, in_stock: true },
  { product_id: 'bp005h', product_name: 'Track Pants', age_group: '2-4 Years', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Track Pants', season: 'All Season', images: [], sizes: ['2Y', '3Y', '4Y'], price: 299, original_price: 599, discount: 50, material: 'Polyester', description: 'Comfortable track pants', brand: 'TrackBoy', color: 'Navy', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'bp005i', product_name: 'Sweater Cable Knit', age_group: '2-4 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Sweaters', season: 'Winter', images: [], sizes: ['2Y', '3Y', '4Y'], price: 549, original_price: 1099, discount: 50, material: 'Wool Blend', description: 'Classic cable knit sweater', brand: 'KnitBoy', color: 'Grey', rating: 4.6, reviews_count: 67, in_stock: true },

  // Boys 4-6 Years (12 products)
  { product_id: 'bp008', product_name: 'Kurta Pajama Set', age_group: '4-6 Years', gender: 'Boys', category: 'Ethnic Wear', subcategory: 'Kurtas', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 699, original_price: 1399, discount: 50, material: 'Cotton', description: 'Traditional kurta pajama for festive wear', brand: 'DesiKids', color: 'Cream', rating: 4.6, reviews_count: 67, in_stock: true },
  { product_id: 'bp009', product_name: 'Sports Shorts Pack', age_group: '4-6 Years', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Shorts', season: 'Summer', images: [], sizes: ['4Y', '5Y', '6Y'], price: 374, original_price: 749, discount: 50, material: 'Polyester', description: 'Quick-dry sports shorts for active play', brand: 'SportsBoy', color: 'Multi', rating: 4.4, reviews_count: 45, in_stock: true },
  { product_id: 'fp002', product_name: 'Boys Sports Sneakers', age_group: '4-6 Years', gender: 'Boys', category: 'Footwear', subcategory: 'Sneakers', season: 'All Season', images: [], sizes: ['8', '9', '10', '11'], price: 599, original_price: 1199, discount: 50, material: 'Mesh', description: 'Lightweight sports sneakers for active boys', brand: 'SpeedKids', color: 'Blue/White', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'bp008a', product_name: 'Graphic T-shirt Pack', age_group: '4-6 Years', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Printed T-shirts', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 499, original_price: 999, discount: 50, material: 'Cotton', description: 'Pack of 5 graphic t-shirts', brand: 'GraphicBoy', color: 'Multi', rating: 4.5, reviews_count: 78, in_stock: true },
  { product_id: 'bp008b', product_name: 'Puffer Jacket', age_group: '4-6 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['4Y', '5Y', '6Y'], price: 899, original_price: 1799, discount: 50, material: 'Polyester', description: 'Warm puffer jacket for extreme cold', brand: 'PuffBoy', color: 'Navy', rating: 4.8, reviews_count: 112, in_stock: true },
  { product_id: 'bp008c', product_name: 'Slim Fit Jeans', age_group: '4-6 Years', gender: 'Boys', category: 'Jeggings / Jeans', subcategory: 'Slim Fit', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 549, original_price: 1099, discount: 50, material: 'Denim', description: 'Trendy slim fit jeans', brand: 'SlimBoy', color: 'Dark Blue', rating: 4.5, reviews_count: 67, in_stock: true },
  { product_id: 'bp008d', product_name: 'Party Blazer Set', age_group: '4-6 Years', gender: 'Boys', category: 'Party Wear', subcategory: 'Suits', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 1299, original_price: 2599, discount: 50, material: 'Cotton Blend', description: 'Elegant blazer set for parties', brand: 'BlazerBoy', color: 'Grey', rating: 4.7, reviews_count: 89, in_stock: true },
  { product_id: 'bp008e', product_name: 'Formal Shirt', age_group: '4-6 Years', gender: 'Boys', category: 'Shirts', subcategory: 'Formal Shirts', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 449, original_price: 899, discount: 50, material: 'Cotton', description: 'Formal shirt for special occasions', brand: 'FormalBoy', color: 'White', rating: 4.4, reviews_count: 56, in_stock: true },
  { product_id: 'bp008f', product_name: 'Hooded Sweatshirt', age_group: '4-6 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['4Y', '5Y', '6Y'], price: 599, original_price: 1199, discount: 50, material: 'Cotton Fleece', description: 'Comfortable hooded sweatshirt', brand: 'HoodieBoy', color: 'Grey', rating: 4.6, reviews_count: 78, in_stock: true },
  { product_id: 'bp008g', product_name: 'School Shoes', age_group: '4-6 Years', gender: 'Boys', category: 'Footwear', subcategory: 'School Shoes', season: 'All Season', images: [], sizes: ['8', '9', '10', '11'], price: 499, original_price: 999, discount: 50, material: 'Leather', description: 'Durable black school shoes', brand: 'SchoolBoy', color: 'Black', rating: 4.5, reviews_count: 89, in_stock: true },
  { product_id: 'bp008h', product_name: 'Belt Set', age_group: '4-6 Years', gender: 'Boys', category: 'Accessories', subcategory: 'Belts', season: 'All Season', images: [], sizes: ['One Size'], price: 199, original_price: 399, discount: 50, material: 'Leather', description: 'Pack of 2 belts', brand: 'BeltBoy', color: 'Black/Brown', rating: 4.3, reviews_count: 45, in_stock: true },
  { product_id: 'bp008i', product_name: 'Cargo Pants', age_group: '4-6 Years', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Trousers', season: 'All Season', images: [], sizes: ['4Y', '5Y', '6Y'], price: 449, original_price: 899, discount: 50, material: 'Cotton', description: 'Trendy cargo pants with pockets', brand: 'CargoBoy', color: 'Olive', rating: 4.5, reviews_count: 67, in_stock: true },

  // Boys 6-14 Years (12 products)
  { product_id: 'bp010', product_name: 'Graphic Print Shirt', age_group: '6-14 Years', gender: 'Boys', category: 'Shirts', subcategory: 'Casual Shirts', season: 'Summer', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 399, original_price: 799, discount: 50, material: 'Cotton', description: 'Cool graphic shirt for teens', brand: 'TeenBoy', color: 'Black', rating: 4.5, reviews_count: 134, in_stock: true },
  { product_id: 'bp011', product_name: 'Heavy Winter Jacket', age_group: '6-14 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Jackets', season: 'Winter', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 1349, original_price: 2699, discount: 50, material: 'Polyester Fill', description: 'Heavy duty winter jacket for extreme cold', brand: 'WinterBoy', color: 'Black', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'bp012', product_name: 'Track Pants Combo', age_group: '6-14 Years', gender: 'Boys', category: 'Bottom Wear', subcategory: 'Track Pants', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 499, original_price: 999, discount: 50, material: 'Cotton Blend', description: 'Comfortable track pants pack of 2', brand: 'ActiveBoy', color: 'Navy/Grey', rating: 4.4, reviews_count: 78, in_stock: true },
  { product_id: 'ap002', product_name: 'Boys Backpack School', age_group: '6-14 Years', gender: 'Boys', category: 'Accessories', subcategory: 'Bags', season: 'All Season', images: [], sizes: ['One Size'], price: 499, original_price: 999, discount: 50, material: 'Polyester', description: 'Durable school backpack with laptop compartment', brand: 'SchoolMate', color: 'Navy', rating: 4.6, reviews_count: 123, in_stock: true },
  { product_id: 'bp010a', product_name: 'Graphic T-shirt Pack', age_group: '6-14 Years', gender: 'Boys', category: 'Tops / T-shirts', subcategory: 'Printed T-shirts', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 599, original_price: 1199, discount: 50, material: 'Cotton', description: 'Pack of 5 graphic t-shirts', brand: 'GraphicTeen', color: 'Multi', rating: 4.6, reviews_count: 156, in_stock: true },
  { product_id: 'bp010b', product_name: 'Distressed Jeans', age_group: '6-14 Years', gender: 'Boys', category: 'Jeggings / Jeans', subcategory: 'Distressed Jeans', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 649, original_price: 1299, discount: 50, material: 'Denim', description: 'Trendy distressed jeans', brand: 'DistressBoy', color: 'Blue', rating: 4.5, reviews_count: 112, in_stock: true },
  { product_id: 'bp010c', product_name: 'Party Tuxedo', age_group: '6-14 Years', gender: 'Boys', category: 'Party Wear', subcategory: 'Tuxedos', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 1999, original_price: 3999, discount: 50, material: 'Polyester Blend', description: 'Elegant tuxedo for special occasions', brand: 'TuxBoy', color: 'Black', rating: 4.9, reviews_count: 134, in_stock: true },
  { product_id: 'bp010d', product_name: 'Pullover Hoodie', age_group: '6-14 Years', gender: 'Boys', category: 'Winter Wear', subcategory: 'Hoodies', season: 'Winter', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 699, original_price: 1399, discount: 50, material: 'Cotton Fleece', description: 'Stylish pullover hoodie', brand: 'HoodTeen', color: 'Grey', rating: 4.7, reviews_count: 112, in_stock: true },
  { product_id: 'bp010e', product_name: 'Sherwani Set', age_group: '6-14 Years', gender: 'Boys', category: 'Ethnic Wear', subcategory: 'Sherwanis', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 1499, original_price: 2999, discount: 50, material: 'Cotton Silk', description: 'Royal sherwani set for weddings', brand: 'RoyalBoy', color: 'Maroon', rating: 4.8, reviews_count: 89, in_stock: true },
  { product_id: 'bp010f', product_name: 'Formal Shirt Pack', age_group: '6-14 Years', gender: 'Boys', category: 'Shirts', subcategory: 'Formal Shirts', season: 'All Season', images: [], sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'], price: 699, original_price: 1399, discount: 50, material: 'Cotton', description: 'Pack of 3 formal shirts', brand: 'FormalTeen', color: 'Multi', rating: 4.5, reviews_count: 78, in_stock: true },
  { product_id: 'bp010g', product_name: 'Running Shoes', age_group: '6-14 Years', gender: 'Boys', category: 'Footwear', subcategory: 'Sneakers', season: 'All Season', images: [], sizes: ['10', '11', '12', '13', '1', '2'], price: 899, original_price: 1799, discount: 50, material: 'Mesh', description: 'High-performance running shoes', brand: 'RunTeen', color: 'Black/Red', rating: 4.8, reviews_count: 156, in_stock: true },
  { product_id: 'bp010h', product_name: 'Digital Watch', age_group: '6-14 Years', gender: 'Boys', category: 'Accessories', subcategory: 'Watches', season: 'All Season', images: [], sizes: ['One Size'], price: 499, original_price: 999, discount: 50, material: 'Plastic', description: 'Cool digital sports watch', brand: 'WatchBoy', color: 'Black', rating: 4.6, reviews_count: 112, in_stock: true },
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
