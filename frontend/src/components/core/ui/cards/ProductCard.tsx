import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Eye, 
  Zap, 
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    id: string
    name: string
    category: string
    price: number
    originalPrice?: number
    discount?: number
    rating: number
    reviewCount: number
    image: string
    tags?: string[]
    stock: number
    isNew?: boolean
    isHot?: boolean
  }
  variant?: 'default' | 'compact' | 'featured'
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const discountPercentage = product.discount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const isLowStock = product.stock < 10
  const isOutOfStock = product.stock === 0

  if (variant === 'compact') {
    return (
      <Link to={`/products/${product.id}`}>
        <div className="flex items-center space-x-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="font-semibold text-gray-900">
                ETB {product.price.toLocaleString()}
              </span>
              {product.discount && (
                <span className="text-xs text-red-600 font-medium">
                  -{discountPercentage}%
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <Link to={`/products/${product.id}`}>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.discount && (
                <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                  -{discountPercentage}%
                </span>
              )}
              {product.isNew && (
                <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                  NEW
                </span>
              )}
              {product.isHot && (
                <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                  HOT
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`} 
                />
              </button>
              <button
                onClick={(e) => e.preventDefault()}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Stock Indicator */}
            {isLowStock && !isOutOfStock && (
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded text-center">
                  Only {product.stock} left!
                </div>
              </div>
            )}

            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="bg-white px-4 py-2 rounded-lg font-semibold text-gray-900">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">
                {product.category}
              </span>
              {product.tags?.includes('Best Seller') && (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
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
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  ETB {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ETB {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discountPercentage > 20 && (
                <Zap className="h-4 w-4 text-orange-500" />
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                // Add to cart logic
              }}
              disabled={isOutOfStock}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg font-medium transition-colors ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>

            {/* Features */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Warranty</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard