export interface AgeGroup {
  id: string;
  name: string;
  ageRange: string;
  color: string;
  icon?: string;
  itemCount: number;
}

export interface AgeWiseCategory {
  id: string;
  name: string;
  image?: string;
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

export const AGE_WISE_CATEGORIES: AgeWiseCategory[] = [
  { id: '1', name: 'Sweaters', color: '#E8B4B8', itemCount: 145 },
  { id: '2', name: 'Sweatshirts', color: '#D4A5A5', itemCount: 189 },
  { id: '3', name: 'Jackets', color: '#C96B63', itemCount: 267 },
  { id: '4', name: 'Thermals', color: '#4A90E2', itemCount: 123 },
  { id: '5', name: 'Winter Essentials', color: '#F5A962', itemCount: 234 },
];
