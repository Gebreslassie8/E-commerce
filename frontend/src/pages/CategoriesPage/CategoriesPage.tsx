import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Search, 
  Star, 
  TrendingUp, 
  ChevronRight,
  Smartphone,
  Home,
  Shirt,
  Book,
  Car,
  Heart,
  Monitor,
  CheckCircle,
  Award,
  Users,
  Shield,
  Package,
  Sparkles,
  Zap
} from 'lucide-react';
import Pagination from '@/components/core/shared/Pagination';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  productCount: number;
  rating: number;
  trending: boolean;
  featured: boolean;
  discount?: number;
  tags: string[];
  popularProducts: string[];
}

const CategoriesPage: React.FC = () => {
  // State
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular');
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default items per page

  // Tags for filtering
  const tags = [
    'All Categories',
    'Trending',
    'Featured',
    'On Sale',
    'New Arrivals',
    'Best Sellers',
    'Premium',
    'Eco-Friendly'
  ];

  // Mock data - public facing version
  const mockCategories: Category[] = [
    {
      id: '1',
      name: 'Electronics',
      description: 'Latest gadgets, smartphones, laptops and smart home devices',
      color: '#3B82F6',
      icon: 'smartphone',
      productCount: 245,
      rating: 4.8,
      trending: true,
      featured: true,
      discount: 20,
      tags: ['Trending', 'Featured', 'New Arrivals'],
      popularProducts: ['iPhone 15 Pro', 'MacBook Air', 'Samsung Galaxy Watch']
    },
    {
      id: '2',
      name: 'Fashion & Apparel',
      description: 'Stylish clothing, shoes and accessories for every occasion',
      color: '#EC4899',
      icon: 'shirt',
      productCount: 189,
      rating: 4.6,
      trending: true,
      featured: false,
      tags: ['Trending', 'Best Sellers'],
      popularProducts: ['Designer Jeans', 'Leather Jacket', 'Running Shoes']
    },
    {
      id: '3',
      name: 'Home & Kitchen',
      description: 'Smart appliances, furniture and kitchen essentials',
      color: '#10B981',
      icon: 'home',
      productCount: 156,
      rating: 4.7,
      trending: false,
      featured: true,
      discount: 15,
      tags: ['Featured', 'Eco-Friendly'],
      popularProducts: ['Air Fryer', 'Smart TV', 'Coffee Maker']
    },
    {
      id: '4',
      name: 'Books & Media',
      description: 'Best-selling books, movies, music and educational content',
      color: '#8B5CF6',
      icon: 'book',
      productCount: 98,
      rating: 4.9,
      trending: false,
      featured: false,
      tags: ['Premium'],
      popularProducts: ['Bestseller Novel', 'Music Album', 'Educational Course']
    },
    {
      id: '5',
      name: 'Sports & Outdoors',
      description: 'Equipment and gear for fitness, camping and adventure',
      color: '#F59E0B',
      icon: 'car',
      productCount: 76,
      rating: 4.5,
      trending: true,
      featured: false,
      discount: 30,
      tags: ['Trending', 'On Sale'],
      popularProducts: ['Yoga Mat', 'Camping Tent', 'Fitness Tracker']
    },
    {
      id: '6',
      name: 'Beauty & Wellness',
      description: 'Premium cosmetics, skincare and personal care products',
      color: '#F472B6',
      icon: 'heart',
      productCount: 134,
      rating: 4.7,
      trending: false,
      featured: true,
      tags: ['Featured', 'Premium'],
      popularProducts: ['Vitamin C Serum', 'Perfume', 'Hair Care Kit']
    },
    {
      id: '7',
      name: 'Toys & Games',
      description: 'Fun toys, board games and family entertainment',
      color: '#6366F1',
      icon: 'sparkles',
      productCount: 67,
      rating: 4.4,
      trending: true,
      featured: false,
      tags: ['Trending'],
      popularProducts: ['LEGO Set', 'Board Game', 'Educational Toy']
    },
    {
      id: '8',
      name: 'Automotive',
      description: 'Car accessories, tools and maintenance products',
      color: '#64748B',
      icon: 'car',
      productCount: 45,
      rating: 4.3,
      trending: false,
      featured: false,
      tags: ['Eco-Friendly'],
      popularProducts: ['Car Vacuum', 'Phone Holder', 'Car Wax']
    },
    // Additional categories for pagination demo
    {
      id: '9',
      name: 'Garden & Outdoor',
      description: 'Plants, gardening tools and outdoor furniture',
      color: '#059669',
      icon: 'sparkles',
      productCount: 89,
      rating: 4.2,
      trending: false,
      featured: true,
      discount: 10,
      tags: ['Featured', 'Eco-Friendly'],
      popularProducts: ['Gardening Kit', 'Outdoor Chair', 'Plant Seeds']
    },
    {
      id: '10',
      name: 'Pet Supplies',
      description: 'Food, toys and accessories for your pets',
      color: '#DC2626',
      icon: 'heart',
      productCount: 112,
      rating: 4.7,
      trending: true,
      featured: false,
      tags: ['Trending', 'Best Sellers'],
      popularProducts: ['Pet Food', 'Cat Tree', 'Dog Bed']
    },
    {
      id: '11',
      name: 'Office Supplies',
      description: 'Everything you need for your home office',
      color: '#7C3AED',
      icon: 'monitor',
      productCount: 78,
      rating: 4.1,
      trending: false,
      featured: false,
      tags: ['Premium'],
      popularProducts: ['Desk Organizer', 'Office Chair', 'Notebooks']
    },
    {
      id: '12',
      name: 'Health & Fitness',
      description: 'Supplements, equipment and wellness products',
      color: '#EA580C',
      icon: 'heart',
      productCount: 154,
      rating: 4.6,
      trending: true,
      featured: true,
      discount: 25,
      tags: ['Trending', 'Featured'],
      popularProducts: ['Protein Powder', 'Yoga Mat', 'Fitness Band']
    }
  ];

  // Load initial data
  useEffect(() => {
    const loadCategories = () => {
      setIsLoading(true);
      setTimeout(() => {
        setCategories(mockCategories);
        setFilteredCategories(mockCategories);
        setIsLoading(false);
      }, 800);
    };

    loadCategories();
  }, []);

  // Filter and sort categories
  useEffect(() => {
    let result = [...categories];

    // Filter by search
    if (searchQuery) {
      result = result.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by tag
    if (selectedTag && selectedTag !== 'All Categories') {
      result = result.filter(cat => cat.tags.includes(selectedTag));
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.productCount - a.productCount);
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredCategories(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [categories, searchQuery, selectedTag, sortBy]);

  // Calculate paginated categories
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage, itemsPerPage]);

  // Get icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'tag': <Tag className="h-5 w-5" />,
      'smartphone': <Smartphone className="h-5 w-5" />,
      'shirt': <Shirt className="h-5 w-5" />,
      'home': <Home className="h-5 w-5" />,
      'book': <Book className="h-5 w-5" />,
      'car': <Car className="h-5 w-5" />,
      'heart': <Heart className="h-5 w-5" />,
      'monitor': <Monitor className="h-5 w-5" />,
      'sparkles': <Sparkles className="h-5 w-5" />,
    };
    return iconMap[iconName] || <Tag className="h-5 w-5" />;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Shop by Category
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto"
            >
              Discover amazing products across {categories.length} curated categories
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-colors">
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-xl font-bold text-gray-900">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}+
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Top Rated</p>
                <p className="text-xl font-bold text-gray-900">
                  {categories.filter(c => c.rating >= 4.5).length} Categories
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Trending Now</p>
                <p className="text-xl font-bold text-gray-900">
                  {categories.filter(c => c.trending).length} Hot
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Award className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-xl font-bold text-gray-900">
                  {categories.filter(c => c.featured).length} Picks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Browse Categories</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === 'All Categories' ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  (tag === 'All Categories' && !selectedTag) || selectedTag === tag
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Count & Page Size Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredCategories.length)} of {filteredCategories.length} categories
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={4}>4 per page</option>
              <option value={8}>8 per page</option>
              <option value={12}>12 per page</option>
              <option value={16}>16 per page</option>
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
                  className={`bg-white rounded-2xl shadow-sm border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                    activeCategory === category.id 
                      ? 'border-primary-500 shadow-lg' 
                      : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
                  }`}
                >
                  {/* Category Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-3 rounded-xl"
                          style={{ 
                            backgroundColor: `${category.color}20`,
                            border: `2px solid ${category.color}40`
                          }}
                        >
                          <div style={{ color: category.color }}>
                            {getIconComponent(category.icon)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{category.rating}</span>
                            <span className="text-xs text-gray-500">({category.productCount}+ products)</span>
                          </div>
                        </div>
                      </div>
                      
                      {category.trending && (
                        <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Trending
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Popular Products Preview */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Popular products:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.popularProducts.slice(0, 3).map((product, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        {category.discount && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                            -{category.discount}% OFF
                          </span>
                        )}
                        {category.featured && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold text-sm">
                        Shop Now
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-100 bg-gray-50 p-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Why Shop Here?</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              Verified quality products
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              Fast shipping available
                            </li>
                            <li className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-green-500" />
                              Trusted by thousands
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Customer Reviews</h4>
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center gap-2 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < Math.floor(category.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="font-medium">{category.rating}/5</span>
                            </div>
                            <p className="italic">"Great selection and quality!"</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {filteredCategories.length > itemsPerPage && (
              <div className="mt-8 mb-12">
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredCategories.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  showInfo={true}
                  showPageSize={true}
                  pageSizeOptions={[4, 8, 12, 16]}
                  onPageSizeChange={handlePageSizeChange}
                  siblingCount={1}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                  compact={false}
                />
              </div>
            )}

            {/* Bottom CTA */}
            {!searchQuery && !selectedTag && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Can't find what you're looking for?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We're constantly adding new categories and products. Sign up for updates to be the first to know about new arrivals and exclusive offers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                      Browse All Products
                    </button>
                    <button className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                      Contact Support
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Footer Note */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">Shop with Confidence</h4>
            <p className="text-gray-400 text-sm">
              All categories feature verified sellers, secure payment options, and 30-day return policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;