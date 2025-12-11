import React from 'react';
import { ChevronRight } from 'lucide-react-native';

interface CategoryCard {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

const BabyKidsFashion: React.FC = () => {
  const girlsCategories: CategoryCard[] = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=350&fit=crop',
      title: '0-6',
      subtitle: 'Months'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=350&fit=crop',
      title: '6-24',
      subtitle: 'Months'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=350&fit=crop',
      title: '2-4',
      subtitle: 'Years'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=300&h=350&fit=crop',
      title: '4-6',
      subtitle: 'Years'
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1595429407249-ec50c3cb5f1c?w=300&h=350&fit=crop',
      title: '6-14',
      subtitle: 'Years'
    }
  ];

  const boysCategories: CategoryCard[] = [
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=350&fit=crop',
      title: '0-6',
      subtitle: 'Months'
    },
    {
      id: '7',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&h=350&fit=crop',
      title: '6-24',
      subtitle: 'Months'
    },
    {
      id: '8',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=350&fit=crop',
      title: '2-4',
      subtitle: 'Years'
    },
    {
      id: '9',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=350&fit=crop',
      title: '4-6',
      subtitle: 'Years'
    },
    {
      id: '10',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=350&fit=crop',
      title: '6-14',
      subtitle: 'Years'
    }
  ];

  const productCategories: CategoryCard[] = [
    {
      id: '11',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=350&fit=crop',
      title: 'Sweaters',
      subtitle: ''
    },
    {
      id: '12',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=350&fit=crop',
      title: 'Sweatshirts',
      subtitle: ''
    },
    {
      id: '13',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=350&fit=crop',
      title: 'Jackets',
      subtitle: ''
    },
    {
      id: '14',
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=300&h=350&fit=crop',
      title: 'Thermals',
      subtitle: ''
    },
    {
      id: '15',
      image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e7?w=300&h=350&fit=crop',
      title: 'Winter',
      subtitle: 'Essentials'
    }
  ];

  const CategoryCard: React.FC<{ card: CategoryCard }> = ({ card }) => (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-100 to-blue-50 w-full h-52 mb-3 transition-transform group-hover:scale-105">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 leading-none">{card.title}</h3>
        <div className="flex items-center justify-center mt-0.5">
          <p className="text-sm text-gray-700 font-medium">{card.subtitle}</p>
          <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-6 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 tracking-tight">
          BABY & KIDS FASHION
        </h1>

        {/* Girls Age Categories - First Row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {girlsCategories.map((card) => (
            <CategoryCard key={card.id} card={card} />
          ))}
        </div>

        {/* Boys Age Categories - Second Row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {boysCategories.map((card) => (
            <CategoryCard key={card.id} card={card} />
          ))}
        </div>

        {/* Product Categories - Third Row */}
        <div className="grid grid-cols-5 gap-4">
          {productCategories.map((card) => (
            <CategoryCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BabyKidsFashion;