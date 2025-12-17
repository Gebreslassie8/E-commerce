import React from 'react';
import { Product } from '../../../types/product.types';
import ProductCardCompact from '../../core/ui/cards/ProductCardCompact';

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {products.map((product) => (
        <ProductCardCompact
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductList;