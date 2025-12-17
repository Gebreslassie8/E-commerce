import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Tag,
  Clock,
  Shield,
  Truck,
  RefreshCw,
  Star,
  Check,
  ArrowRight,
  ChevronRight,
  Zap,
  Award,
  Users,
  TrendingUp,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Gamepad2,
  Filter,
  Grid,
  List,
} from 'lucide-react';

// Import your existing ProductCard
import ProductCard from '../../components/core/ui/cards/ProductCard';

// Mock data - Replace with your actual API data
const featuredProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'Latest iPhone with A17 Pro chip',
    category: 'Smartphones',
    price: 159999,
    originalPrice: 179999,
    discount: 11,
    rating: 4.8,
    reviewCount: 247,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500'
    ],
    isNew: true,
    inStock: true,
    stock: 45,
    tags: ['BEST SELLER', 'NEW'],
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    description: '16-inch MacBook Pro with M3 Pro chip',
    category: 'Laptops',
    price: 299999,
    originalPrice: 329999,
    discount: 9,
    rating: 4.9,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500'
    ],
    isNew: true,
    inStock: true,
    stock: 32,
    tags: ['NEW', 'PREMIUM'],
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    description: 'Noise cancelling wireless headphones',
    category: 'Headphones',
    price: 54999,
    originalPrice: 64999,
    discount: 15,
    rating: 4.7,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500'
    ],
    isNew: false,
    inStock: true,
    stock: 78,
    tags: ['TRENDING', 'BEST VALUE'],
  },
  {
    id: 4,
    name: 'Canon EOS R6',
    description: 'Full-frame mirrorless camera',
    category: 'Cameras',
    price: 419999,
    originalPrice: 459999,
    discount: 9,
    rating: 4.6,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=500'
    ],
    isNew: true,
    inStock: true,
    stock: 15,
    tags: ['LIMITED EDITION'],
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24',
    description: 'AI-powered smartphone',
    category: 'Smartphones',
    price: 129999,
    originalPrice: 149999,
    discount: 13,
    rating: 4.5,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500'
    ],
    isNew: true,
    inStock: true,
    stock: 67,
    tags: ['FLASH DEAL'],
  },
  {
    id: 6,
    name: 'iPad Pro M2',
    description: '12.9-inch iPad Pro with M2 chip',
    category: 'Tablets',
    price: 189999,
    originalPrice: 209999,
    discount: 10,
    rating: 4.8,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500'
    ],
    isNew: true,
    inStock: true,
    stock: 42,
    tags: ['NEW'],
  },
  {
    id: 7,
    name: 'PlayStation 5',
    description: 'Next-gen gaming console',
    category: 'Gaming',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    rating: 4.9,
    reviewCount: 421,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500'
    ],
    isNew: false,
    inStock: true,
    stock: 28,
    tags: ['BEST SELLER'],
  },
  {
    id: 8,
    name: 'Dell XPS 15',
    description: '15-inch premium laptop',
    category: 'Laptops',
    price: 239999,
    originalPrice: 259999,
    discount: 8,
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500',
    images: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=500'
    ],
    isNew: false,
    inStock: true,
    stock: 36,
    tags: ['EDITORS CHOICE'],
  },
];

const flashDeals = [
  {
    id: 9,
    name: 'Apple Watch Series 9',
    category: 'Wearables',
    price: 69999,
    originalPrice: 79999,
    discount: 12,
    timeLeft: '02:15:30',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400',
    sold: 45,
    total: 100,
  },
  {
    id: 10,
    name: 'Bose QuietComfort 45',
    category: 'Headphones',
    price: 42999,
    originalPrice: 49999,
    discount: 14,
    timeLeft: '05:45:12',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400',
    sold: 32,
    total: 75,
  },
  {
    id: 11,
    name: 'Xbox Series X',
    category: 'Gaming',
    price: 84999,
    originalPrice: 94999,
    discount: 11,
    timeLeft: '01:30:45',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400',
    sold: 78,
    total: 100,
  },
];

const categories = [
  { icon: Smartphone, label: 'Smartphones', count: 245, color: 'bg-blue-500' },
  { icon: Laptop, label: 'Laptops', count: 189, color: 'bg-purple-500' },
  { icon: Headphones, label: 'Audio', count: 312, color: 'bg-green-500' },
  { icon: Camera, label: 'Cameras', count: 156, color: 'bg-red-500' },
  { icon: Gamepad2, label: 'Gaming', count: 278, color: 'bg-yellow-500' },
];

const SalesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Filter products based on category
  const filteredProducts = selectedCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Products Sold', value: '50,000+', icon: ShoppingBag },
    { label: 'Positive Reviews', value: '98%', icon: Star },
    { label: 'Annual Growth', value: '45%', icon: TrendingUp },
  ];

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mega Tech Sale
              <span className="block text-primary-200">Up to 70% OFF</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Shop the latest technology at unbeatable prices. Limited stock available!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="#flash-deals"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Shop Flash Deals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
              >
                Browse All Categories
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/10 rounded-full translate-y-48 -translate-x-48"></div>
      </section>

      {/* Flash Deals Timer */}
      <section id="flash-deals" className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Flash Deals
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Limited time offers ending soon. Don't miss out!
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Deal ends in:</div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Hours</div>
                </div>
                <div className="text-2xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Minutes</div>
                </div>
                <div className="text-2xl text-gray-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Flash Deal Products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flashDeals.map((deal) => (
              <div
                key={deal.id}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    -{deal.discount}%
                  </span>
                </div>
                
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                      {deal.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{deal.category}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ETB {deal.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ETB {deal.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Sold: {deal.sold}/{deal.total}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                        style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {deal.timeLeft}
                    </div>
                    <Link
                      to={`/product/${deal.id}`}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse through our wide range of technology categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.label}
                onClick={() => setSelectedCategory(category.label)}
                className={`group relative bg-white dark:bg-gray-800 border rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                  selectedCategory === category.label
                    ? 'border-primary-500 dark:border-primary-500 ring-2 ring-primary-500/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {category.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count} products
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {selectedCategory === 'all' 
                ? 'All our featured products' 
                : `Featured ${selectedCategory}`}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            
            <Link
              to="/products"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
            >
              View All
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            : 'space-y-6'
          }>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                layout={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No products found in this category.
            </p>
          </div>
        )}
      </section>

      {/* Value Propositions */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the best in technology shopping with our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'Free delivery on all orders over ETB 5,000',
                color: 'text-green-600 dark:text-green-400',
                bg: 'bg-green-100 dark:bg-green-900/30',
              },
              {
                icon: Shield,
                title: 'Secure Payments',
                description: '100% secure payment processing',
                color: 'text-blue-600 dark:text-blue-400',
                bg: 'bg-blue-100 dark:bg-blue-900/30',
              },
              {
                icon: RefreshCw,
                title: '30-Day Returns',
                description: 'Easy returns within 30 days',
                color: 'text-purple-600 dark:text-purple-400',
                bg: 'bg-purple-100 dark:bg-purple-900/30',
              },
              {
                icon: Award,
                title: 'Quality Guaranteed',
                description: 'Authentic products with warranty',
                color: 'text-yellow-600 dark:text-yellow-400',
                bg: 'bg-yellow-100 dark:bg-yellow-900/30',
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className={`${feature.bg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-200 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their technology needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Contact Sales Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesPage;