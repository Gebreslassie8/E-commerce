import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatCurrency } from '../../utils/formatters'

interface ProductCardCompactProps {
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
    brand: string
    isNew?: boolean
    isHot?: boolean
  }
}

const ProductCardCompact = ({ product }: ProductCardCompactProps) => {
  const discountPercentage = product.discount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  return (
    <motion.div whileHover={{ x: 4 }}>
      <Link to={`/products/${product.id}`}>
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-300 hover:shadow-md transition-all">
          <div className="flex items-start space-x-4">
            {/* Image */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                    NEW
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mb-2">
                    <span>{product.brand}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                    {product.isHot && (
                      <>
                        <span>•</span>
                        <span className="text-orange-500 font-medium">🔥 Hot</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Rating */}
                  <div className="hidden md:flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount})</span>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        // Add to wishlist
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        // Add to cart
                      }}
                      className="p-2 rounded-lg hover:bg-primary-50 text-primary-600 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description/Tags */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {product.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline space-x-3">
                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(product.price, 'ETB')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(product.originalPrice, 'ETB')}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="text-sm font-semibold text-red-600">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Stock Indicator */}
                  {product.stock < 10 && product.stock > 0 ? (
                    <span className="text-sm text-orange-600 font-medium">
                      Only {product.stock} left!
                    </span>
                  ) : product.stock === 0 ? (
                    <span className="text-sm text-red-600 font-medium">
                      Out of Stock
                    </span>
                  ) : (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>In Stock</span>
                    </div>
                  )}

                  {/* View Details Button */}
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCardCompact