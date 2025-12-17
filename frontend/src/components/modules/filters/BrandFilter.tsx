import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  logo?: string;
  productCount?: number;
}

interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: string[];
  onBrandToggle: (brandId: string) => void;
  className?: string;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  selectedBrands,
  onBrandToggle,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {brands.map((brand) => {
        const isSelected = selectedBrands.includes(brand.id);
        
        return (
          <label
            key={brand.id}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onBrandToggle(brand.id)}
                className="sr-only peer"
              />
              <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-primary-600 border-primary-600'
                  : 'border-gray-300 group-hover:border-primary-400'
              }`}>
                {isSelected && (
                  <CheckCircle className="h-3.5 w-3.5 text-white" />
                )}
              </div>
            </div>
            
            <div className="flex items-center flex-1">
              {brand.logo && (
                <span className="text-xl mr-2">{brand.logo}</span>
              )}
              <span className="text-gray-700">{brand.name}</span>
            </div>
            
            {brand.productCount !== undefined && (
              <span className="text-sm text-gray-500">
                ({brand.productCount})
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default BrandFilter;