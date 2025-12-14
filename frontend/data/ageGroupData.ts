export interface AgeGroup {
  id: string;
  name: string;
  ageRange: string;
  color: string;
  icon?: string;
  itemCount: number;
  image?: string;
}

export interface AgeWiseCategory {
  id: string;
  name: string;
  image?: any;
  color: string;
  itemCount: number;
}

export const AGE_GROUPS: AgeGroup[] = [
  { id: '1', name: 'Newborn', ageRange: '0-6 Months', color: '#E3F2FD', itemCount: 234 },
  { id: '2', name: 'Infant', ageRange: '6-24 Months', color: '#FCE4EC', itemCount: 312 },
  { id: '3', name: 'Toddler', ageRange: '2-4 Years', color: '#FFF3E0', itemCount: 456 },
  { id: '4', name: 'Preschool', ageRange: '4-6 Years', color: '#F3E5F5', itemCount: 567 },
  { id: '5', name: 'Kids', ageRange: '6-14 Years', color: '#E8F5E9', itemCount: 678 },
];

export const GIRLS_AGE_GROUPS: AgeGroup[] = [
  { id: 'g1', name: 'Newborn', ageRange: '0-6 Months', color: '#FFE5E5', itemCount: 234 },
  { id: 'g2', name: 'Infant', ageRange: '6-24 Months', color: '#FFE8D6', itemCount: 312 },
  { id: 'g3', name: 'Toddler', ageRange: '2-4 Years', color: '#FFC3E0', itemCount: 456 },
  { id: 'g4', name: 'Preschool', ageRange: '4-6 Years', color: '#FFB3D9', itemCount: 567 },
  { id: 'g5', name: 'Kids', ageRange: '6-14 Years', color: '#FFA3D2', itemCount: 678 },
];

export const BOYS_AGE_GROUPS: AgeGroup[] = [
  { id: 'b1', name: 'Newborn', ageRange: '0-6 Months', color: '#E3F2FD', itemCount: 234 },
  { id: 'b2', name: 'Infant', ageRange: '6-24 Months', color: '#BBDEFB', itemCount: 312 },
  { id: 'b3', name: 'Toddler', ageRange: '2-4 Years', color: '#90CAF9', itemCount: 456 },
  { id: 'b4', name: 'Preschool', ageRange: '4-6 Years', color: '#64B5F6', itemCount: 567 },
  { id: 'b5', name: 'Kids', ageRange: '6-14 Years', color: '#42A5F5', itemCount: 678 },
];

export const AGE_WISE_CATEGORIES: AgeWiseCategory[] = [
  { id: '1', name: 'Sweaters', color: '#E8B4B8', itemCount: 145 },
  { id: '2', name: 'Sweatshirts', color: '#D4A5A5', itemCount: 189 },
  { id: '3', name: 'Jackets', color: '#C96B63', itemCount: 267 },
  { id: '4', name: 'Thermals', color: '#4A90E2', itemCount: 123 },
  { id: '5', name: 'Winter Essentials', color: '#F5A962', itemCount: 234 },
];
