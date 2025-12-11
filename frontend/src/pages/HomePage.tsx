import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Headphones, 
  Tag, 
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  Smartphone,
  Laptop,
  Headphones as HeadphonesIcon,
  Gamepad,
  ChevronRight
} from 'lucide-react'
import HeroSlider from '../../src/components/widgets/HeroSlider'
import ProductCard from '../../src/components/core/ui/cards/ProductCard'
import CategoryCard from '../../src/components/core/ui/cards/CategoryCard'
import LoadingSpinner from '../../src/components/core/ui/loaders/Spinner'

// Mock data - Replace with API calls
const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    category: 'Smartphones',
    price: 45999,
    originalPrice: 52999,
    discount: 13,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800',
    tags: ['Best Seller', 'New'],
    stock: 15
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    category: 'Laptops',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800',
    tags: ['Latest', 'Premium'],
    stock: 8
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    category: 'Headphones',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    rating: 4.7,
    reviewCount: 256,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800',
    tags: ['Noise Cancelling', 'Wireless'],
    stock: 22
  },
  {
    id: '4',
    name: 'PlayStation 5',
    category: 'Gaming',
    price: 54999,
    originalPrice: 59999,
    discount: 8,
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800',
    tags: ['Gaming', 'Console'],
    stock: 5
  }
]

const categories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    icon: Smartphone,
    productCount: 156,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600',
    color: 'bg-blue-500'
  },
  {
    id: 'laptops',
    name: 'Laptops',
    icon: Laptop,
    productCount: 89,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w-600',
    color: 'bg-purple-500'
  },
  {
    id: 'headphones',
    name: 'Headphones',
    icon: HeadphonesIcon,
    productCount: 234,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600',
    color: 'bg-green-500'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad,
    productCount: 78,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600',
    color: 'bg-red-500'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Secure Shopping',
    description: '100% secure payments with Chapa & Telebirr',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery in Teppi Town for orders above ETB 1,000',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer support for all your queries',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    description: 'Orders processed within 24 hours',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
]

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [trendingProducts, setTrendingProducts] = useState(featuredProducts)
  const [flashDeals, setFlashDeals] = useState(featuredProducts.slice(0, 2))

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={60} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <HeroSlider />
        
        {/* Quick Stats */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-gray-600">Tech Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-gray-600">Secure Payment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">Free</div>
              <div className="text-sm text-gray-600">Teppi Delivery</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`${feature.bgColor} p-6 rounded-xl border border-gray-100`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${feature.color} bg-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="text-gray-600 mt-2">Find exactly what you need</p>
            </div>
            <Link 
              to="/categories" 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>View All Categories</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <CategoryCard category={category} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              </div>
              <p className="text-gray-600">Top-rated technology picks</p>
            </div>
            <Link 
              to="/products" 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
              <div className="md:w-1/2 text-white mb-8 md:mb-0 md:pr-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="h-6 w-6" />
                  <span className="font-semibold bg-white/20 px-3 py-1 rounded-full text-sm">
                    LIMITED TIME
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Flash Sale</h2>
                <p className="text-white/90 mb-6">
                  Up to 50% off on selected tech products. Offer ends soon!
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">02</div>
                    <div className="text-sm opacity-80">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">14</div>
                    <div className="text-sm opacity-80">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">38</div>
                    <div className="text-sm opacity-80">Minutes</div>
                  </div>
                </div>
                <Link 
                  to="/sale" 
                  className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <span>Shop Flash Sale</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  {flashDeals.map((product) => (
                    <div key={product.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-start justify-between mb-2">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          -{product.discount}%
                        </span>
                      </div>
                      <div className="text-white font-semibold mb-2">{product.name}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">ETB {product.price.toLocaleString()}</span>
                        <span className="text-sm line-through opacity-70">ETB {product.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
              </div>
              <p className="text-gray-600">What everyone is buying</p>
            </div>
            <Link 
              to="/products?sort=trending" 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>View Trending</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">ETB {product.price.toLocaleString()}</span>
                          {product.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              ETB {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(product.stock / 30) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{product.stock} left in stock</span>
                            <span>Sold: {124 - product.stock}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Bright TechMart?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're more than just a store - we're your technology partner in Teppi Town
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authentic Products</h3>
              <p className="text-gray-300">
                100% genuine products with manufacturer warranty. No fakes, no compromises.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Delivery</h3>
              <p className="text-gray-300">
                Fast and reliable delivery within Teppi Town. Same-day delivery available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-6">
                <Headphones className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-300">
                Our tech experts are here to help you choose the right product for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-primary-900 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Tech?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers in Teppi Town who trust us for their technology needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Shopping Now
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage