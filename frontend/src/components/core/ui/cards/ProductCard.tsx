import React from 'react';
import { Heart, ShoppingCart, Eye, Star, Truck } from 'lucide-react';
import { Product } from '../../../../types/product.types';
import { formatCurrency } from '../../../../utils/formatters';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import Badge from '../badges/Badge';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
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
    <div className={`group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 space-y-1">
        {product.isNew && (
          <Badge variant="success" size="sm">
            New
          </Badge>
        )}

        {product.isHot && (
          <Badge variant="danger" size="sm">
            Hot
          </Badge>
        )}

        {discountPercentage > 0 && (
          <Badge variant="warning" size="sm">
            -{discountPercentage}%
          </Badge>
        )}

        {product.stock < 5 && (
          <Badge variant="secondary" size="sm">
            Low Stock
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10">
        <IconButton
          icon={<Heart className="h-4 w-4" />}
          variant="ghost"
          size="sm"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={() => onAddToWishlist?.(product)}
        />
      </div>

      {/* Product Image */}
      <div className="relative h-48 md:h-56 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="primary"
            size="sm"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => onQuickView?.(product)}
          >
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5">
        
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase font-medium">
            {product.category}
          </span>

          <span className="text-xs font-semibold text-primary-600">
            {product.brand}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
          <span className="text-xs text-gray-500 ml-1">• {product.reviewCount} reviews</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>

            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {product.delivery?.free && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Free delivery
            </p>
          )}
        </div>

        {/* Specifications — FIXED ❗ */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {Object.entries(product.specifications ?? {})
              .slice(0, 3)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                >
                  {value}
                </span>
              ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            icon={<ShoppingCart className="h-4 w-4" />}
            onClick={() => onAddToCart?.(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          <IconButton
            icon={<Eye className="h-4 w-4" />}
            variant="outline"
            size="sm"
            onClick={() => onQuickView?.(product)}
            aria-label="Quick view"
          />
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
