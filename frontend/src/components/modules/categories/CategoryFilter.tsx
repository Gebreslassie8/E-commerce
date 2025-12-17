import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '../../../types/product.types'
import SkeletonLoader from '../../core/ui/loaders/SkeletonLoader';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  loading?: boolean;
  layout?: 'vertical' | 'grid';
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  loading = false,
  layout = 'vertical',
  className = ''
}) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <SkeletonLoader key={i} type="text" lines={1} />
        ))}
      </div>
    );
  }

  const allCategories = [
    { id: 'all', name: 'All Products', count: categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0) },
    ...categories
  ];

  if (layout === 'grid') {
    return (
      <div className={`grid grid-cols-2 gap-2 ${className}`}>
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`p-3 text-left rounded-lg border transition-all ${
              selectedCategory === category.id
                ? 'border-primary-500 bg-primary-50 text-primary-600'
                : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="font-medium">{category.name}</div>
            <div className="text-sm text-gray-500 mt-1">
              {category.count || 0} products
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {allCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
            selectedCategory === category.id
              ? 'bg-primary-50 text-primary-600 border border-primary-200'
              : 'text-gray-700 hover:bg-gray-50 border border-transparent'
          }`}
        >
          <span className="font-medium">{category.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {category.count || 0}
            </span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;