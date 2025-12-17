import React from 'react';
import { Heart, ShoppingCart, Star, Truck, Check } from 'lucide-react';
import { Product } from '../../../../types/product.types';
import { formatCurrency } from '../../../../utils/formatters';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import Badge from '../badges/Badge';

interface ProductCardCompactProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

const ProductCardCompact: React.FC<ProductCardCompactProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className = ''
}) => {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex p-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2">
            {discountPercentage > 0 && (
              <Badge variant="warning" size="xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 ml-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-primary-600">
                  {product.brand}
                </span>
                {product.isNew && (
                  <Badge variant="success" size="xs">
                    New
                  </Badge>
                )}
                {product.delivery?.free && (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    Free
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-primary-600 cursor-pointer">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
              
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                {/* Specifications */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.entries(product.specifications)
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <span
                        key={key}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
                      >
                        {value}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1">
                <IconButton
                  icon={Heart}
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddToWishlist?.(product)}
                  aria-label="Add to wishlist"
                />
              </div>
              
              <Button
                variant="primary"
                size="sm"
                icon={ShoppingCart}
                onClick={() => onAddToCart?.(product)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add'}
              </Button>
            </div>
          </div>
          
          {/* Stock Status */}
          <div className="mt-3">
            {product.stock > 0 ? (
              <div className="flex items-center text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-600 mr-1" />
                <span>
                  {product.stock < 10 ? `Only ${product.stock} left` : 'In Stock'}
                </span>
              </div>
            ) : (
              <div className="text-sm text-red-600">Out of Stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCompact;