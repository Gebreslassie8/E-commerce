import { Link } from 'react-router-dom'
import { LucideIcon, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface CategoryCardProps {
  category: {
    id: string
    name: string
    icon: LucideIcon
    productCount: number
    image: string
    color: string
    description?: string
    trending?: boolean
  }
  variant?: 'default' | 'featured'
}

const CategoryCard = ({ category, variant = 'default' }: CategoryCardProps) => {
  const Icon = category.icon

  if (variant === 'featured') {
    return (
      <Link to={`/products?category=${category.id}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative overflow-hidden rounded-2xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20 group-hover:from-black/50 transition-all" />
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                <Icon className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {category.productCount}+ Products
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-white/90">{category.description}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Explore Now</span>
              <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
          {category.trending && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              TRENDING
            </div>
          )}
        </motion.div>
      </Link>
    )
  }

  return (
    <Link to={`/products?category=${category.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group"
      >
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all">
          {/* Icon */}
          <div className={`${category.color} p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform`}>
            <Icon className="h-8 w-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {category.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {category.productCount} Products
            </span>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </div>

          {/* Progress Bar (for featured categories) */}
          {category.trending && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Popular this week</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full" 
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}

export default CategoryCard