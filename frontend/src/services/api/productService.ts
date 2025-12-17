import { Product, ProductFilters, Category, Review, ProductStats } from '../../types/product.types';

// Local storage keys
const WISHLIST_KEY = 'bright-techmart-wishlist';
const RECENTLY_VIEWED_KEY = 'bright-techmart-recently-viewed';
const COMPARE_KEY = 'bright-techmart-compare';

// Generate mock products
const generateMockProducts = (): Product[] => {
  const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Lenovo', 'Asus', 'Microsoft', 'LG', 'Bose'];
  const categories = ['Laptops', 'Smartphones', 'Tablets', 'Monitors', 'Headphones', 'Keyboards', 'Mice', 'Speakers', 'Smartwatches', 'Cameras'];
  
  return Array.from({ length: 50 }, (_, index) => {
    const id = `product-${index + 1}`;
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 50000) + 5000;
    const originalPrice = Math.random() > 0.7 ? price * 1.3 : undefined;
    const rating = parseFloat((Math.random() * 3 + 2).toFixed(1)); // 2.0 to 5.0
    const reviewCount = Math.floor(Math.random() * 1000);
    const stock = Math.floor(Math.random() * 100);
    const soldToday = Math.floor(Math.random() * 50);
    
    return {
      id,
      name: `${brand} ${category.slice(0, -1)} ${index + 1000}`,
      description: `High-performance ${category.toLowerCase()} from ${brand} with premium features and excellent build quality.`,
      price,
      originalPrice,
      category,
      brand,
      image: `https://images.unsplash.com/photo-${1500000 + index}?auto=format&fit=crop&w=800`,
      rating,
      reviewCount,
      stock,
      tags: [brand.toLowerCase(), category.toLowerCase(), 'tech', 'electronics'],
      specifications: {
        brand,
        model: `MOD-${index + 1000}`,
        color: ['Black', 'Silver', 'White', 'Blue'][Math.floor(Math.random() * 4)],
        weight: `${(Math.random() * 2 + 0.5).toFixed(1)} kg`,
        warranty: '1 Year',
      },
      delivery: {
        free: Math.random() > 0.3,
        estimatedDays: Math.floor(Math.random() * 7) + 1,
        returnPeriod: 30,
      },
      isFeatured: Math.random() > 0.7,
      isHot: Math.random() > 0.8,
      isNew: Math.random() > 0.6,
      soldToday,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    };
  });
};

// Generate mock categories
const generateMockCategories = (): Category[] => {
  return [
    { id: 'laptops', name: 'Laptops', description: 'High-performance laptops for work and play', icon: '💻', productCount: 15 },
    { id: 'smartphones', name: 'Smartphones', description: 'Latest smartphones with cutting-edge features', icon: '📱', productCount: 12 },
    { id: 'tablets', name: 'Tablets', description: 'Tablets for productivity and entertainment', icon: '📟', productCount: 8 },
    { id: 'monitors', name: 'Monitors', description: 'High-resolution monitors for professionals', icon: '🖥️', productCount: 10 },
    { id: 'headphones', name: 'Headphones', description: 'Premium audio experience', icon: '🎧', productCount: 9 },
    { id: 'keyboards', name: 'Keyboards', description: 'Mechanical and membrane keyboards', icon: '⌨️', productCount: 7 },
    { id: 'mice', name: 'Mice', description: 'Gaming and productivity mice', icon: '🖱️', productCount: 6 },
    { id: 'speakers', name: 'Speakers', description: 'Bluetooth and wired speakers', icon: '🔊', productCount: 5 },
    { id: 'smartwatches', name: 'Smartwatches', description: 'Fitness and smart watches', icon: '⌚', productCount: 8 },
    { id: 'cameras', name: 'Cameras', description: 'DSLR and mirrorless cameras', icon: '📷', productCount: 4 },
  ];
};

// Generate mock reviews
const generateMockReviews = (productCount: number = 50): Review[] => {
  const users = [
    { id: 'user1', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: 'user2', name: 'Sam Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=100' },
    { id: 'user3', name: 'Taylor Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    { id: 'user4', name: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: 'user5', name: 'Casey Kim', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  ];
  
  const reviews: Review[] = [];
  
  for (let i = 0; i < 200; i++) {
    const productId = `product-${Math.floor(Math.random() * productCount) + 1}`;
    const user = users[Math.floor(Math.random() * users.length)];
    
    reviews.push({
      id: `review-${i + 1}`,
      productId,
      userId: user.id,
      user,
      rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
      title: ['Great product!', 'Good value', 'Highly recommended', 'Works as expected', 'Could be better'][Math.floor(Math.random() * 5)],
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      verified: Math.random() > 0.5,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      helpful: Math.floor(Math.random() * 50),
    });
  }
  
  return reviews;
};

// Initialize mock data
let mockProducts: Product[] = [];
let mockCategories: Category[] = [];
let mockReviews: Review[] = [];

// Generate data on first use
const initializeMockData = () => {
  if (mockProducts.length === 0) {
    mockProducts = generateMockProducts();
    mockCategories = generateMockCategories();
    mockReviews = generateMockReviews(mockProducts.length);
  }
};

// Helper function to get price range from ID
const getPriceRange = (rangeId: string): { min: number; max: number } | null => {
  const ranges: Record<string, { min: number; max: number }> = {
    'under-10k': { min: 0, max: 10000 },
    '10k-30k': { min: 10000, max: 30000 },
    '30k-60k': { min: 30000, max: 60000 },
    'above-60k': { min: 60000, max: 1000000 },
  };
  
  return ranges[rangeId] || null;
};

export const productService = {
  // Get all products with filters
  async getProducts(filters: ProductFilters): Promise<PaginatedResponse<Product>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      
      let filteredProducts = [...mockProducts];
      
      // Apply filters
      if (filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(p => 
          p.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      if (filters.search) {
        const query = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      if (filters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
          filters.brands.includes(p.brand.toLowerCase())
        );
      }
      
      if (filters.priceRange) {
        const range = getPriceRange(filters.priceRange);
        if (range) {
          filteredProducts = filteredProducts.filter(p => 
            p.price >= range.min && p.price <= range.max
          );
        }
      }
      
      if (filters.minRating) {
        filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating!);
      }
      
      if (filters.features.includes('free-shipping')) {
        filteredProducts = filteredProducts.filter(p => p.delivery?.free === true);
      }
      
      if (filters.features.includes('in-stock')) {
        filteredProducts = filteredProducts.filter(p => p.stock > 0);
      }
      
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(p => p.stock > 0);
      }
      
      // Apply sorting
      filteredProducts.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'discount':
            const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
            const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
            return discountB - discountA;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'popularity':
            return (b.soldToday || 0) - (a.soldToday || 0);
          default: // featured
            const scoreA = (a.isFeatured ? 10 : 0) + (a.isHot ? 8 : 0) + (a.isNew ? 6 : 0) + a.rating * 2;
            const scoreB = (b.isFeatured ? 10 : 0) + (b.isHot ? 8 : 0) + (b.isNew ? 6 : 0) + b.rating * 2;
            return scoreB - scoreA;
        }
      });
      
      // Pagination
      const total = filteredProducts.length;
      const start = (filters.page - 1) * filters.limit;
      const end = start + filters.limit;
      const items = filteredProducts.slice(start, end);
      
      return {
        items,
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit),
        hasNext: end < total,
        hasPrevious: start > 0,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const product = mockProducts.find(p => p.id === id);
      
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      
      // Track view
      this.trackProductView(id);
      
      return {
        success: true,
        data: product,
        message: 'Product fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Get related products
  async getRelatedProducts(productId: string, limit: number = 4): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const product = mockProducts.find(p => p.id === productId);
      if (!product) {
        return {
          success: true,
          data: [],
          message: 'No related products found',
          timestamp: new Date().toISOString(),
        };
      }
      
      // Find products in same category and brand
      const related = mockProducts
        .filter(p => 
          p.id !== productId && 
          (p.category === product.category || p.brand === product.brand)
        )
        .slice(0, limit);
      
      return {
        success: true,
        data: related,
        message: 'Related products fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error fetching related products for ${productId}:`, error);
      throw error;
    }
  },

  // Get trending products
  async getTrendingProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const trending = mockProducts
        .filter(p => p.isHot)
        .sort((a, b) => (b.soldToday || 0) - (a.soldToday || 0))
        .slice(0, limit);
      
      return {
        success: true,
        data: trending,
        message: 'Trending products fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching trending products:', error);
      throw error;
    }
  },

  // Get featured products
  async getFeaturedProducts(limit: number = 8): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const featured = mockProducts
        .filter(p => p.isFeatured)
        .slice(0, limit);
      
      return {
        success: true,
        data: featured,
        message: 'Featured products fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  // Get new arrivals
  async getNewArrivals(limit: number = 8): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const newArrivals = mockProducts
        .filter(p => p.isNew)
        .slice(0, limit);
      
      return {
        success: true,
        data: newArrivals,
        message: 'New arrivals fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },

  // Get best sellers
  async getBestSellers(limit: number = 8): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const bestSellers = mockProducts
        .sort((a, b) => (b.soldToday || 0) - (a.soldToday || 0))
        .slice(0, limit);
      
      return {
        success: true,
        data: bestSellers,
        message: 'Best sellers fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  },

  // Get products on sale
  async getProductsOnSale(limit: number = 8): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const onSale = mockProducts
        .filter(p => p.originalPrice && p.originalPrice > p.price)
        .sort((a, b) => {
          const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
          const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
          return discountB - discountA;
        })
        .slice(0, limit);
      
      return {
        success: true,
        data: onSale,
        message: 'Products on sale fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching products on sale:', error);
      throw error;
    }
  },

  // Get all categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return {
        success: true,
        data: mockCategories,
        message: 'Categories fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get products by category
  async getProductsByCategory(
    categoryId: string, 
    filters: Partial<ProductFilters> = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredProducts = mockProducts.filter(p => 
        p.category.toLowerCase() === categoryId.toLowerCase()
      );
      
      // Apply additional filters
      if (filters.search) {
        const query = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
        );
      }
      
      if (filters.brands?.length) {
        filteredProducts = filteredProducts.filter(p => 
          filters.brands!.includes(p.brand.toLowerCase())
        );
      }
      
      if (filters.sortBy) {
        filteredProducts.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'rating':
              return b.rating - a.rating;
            default:
              return 0;
          }
        });
      }
      
      // Pagination
      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const total = filteredProducts.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const items = filteredProducts.slice(start, end);
      
      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: end < total,
        hasPrevious: start > 0,
      };
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  },

  // Get product reviews
  async getProductReviews(
    productId: string, 
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<Review>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const reviews = mockReviews.filter(r => r.productId === productId);
      const total = reviews.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const items = reviews.slice(start, end);
      
      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: end < total,
        hasPrevious: start > 0,
      };
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error);
      throw error;
    }
  },

  // Add product review
  async addProductReview(
    productId: string, 
    review: Omit<Review, 'id' | 'createdAt' | 'user' | 'verified'>
  ): Promise<ApiResponse<Review>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newReview: Review = {
        id: `review_${Date.now()}`,
        productId,
        userId: 'current-user',
        user: {
          id: 'current-user',
          name: 'Current User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100'
        },
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        verified: false,
        createdAt: new Date().toISOString(),
        helpful: 0,
      };
      
      // Add to mock reviews
      mockReviews.unshift(newReview);
      
      return {
        success: true,
        data: newReview,
        message: 'Review added successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error adding review for product ${productId}:`, error);
      throw error;
    }
  },

  // Search products
  async searchProducts(
    query: string, 
    limit: number = 10
  ): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const searchQuery = query.toLowerCase();
      const results = mockProducts
        .filter(p => 
          p.name.toLowerCase().includes(searchQuery) ||
          p.description?.toLowerCase().includes(searchQuery) ||
          p.brand.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        )
        .slice(0, limit);
      
      return {
        success: true,
        data: results,
        message: 'Search results fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error searching products for query "${query}":`, error);
      throw error;
    }
  },

  // Get product statistics
  async getProductStats(): Promise<ApiResponse<ProductStats>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const totalProducts = mockProducts.length;
      const activeProducts = mockProducts.filter(p => p.stock > 0).length;
      const outOfStock = mockProducts.filter(p => p.stock === 0).length;
      const lowStock = mockProducts.filter(p => p.stock > 0 && p.stock < 10).length;
      
      // Calculate average rating
      const totalRating = mockProducts.reduce((sum, p) => sum + p.rating, 0);
      const averageRating = totalRating / totalProducts;
      
      // Calculate total reviews
      const totalReviews = mockProducts.reduce((sum, p) => sum + p.reviewCount, 0);
      
      // Calculate monthly sales (mock data)
      const monthlySales = mockProducts.reduce((sum, p) => sum + (p.soldToday || 0), 0) * 30;
      
      // Calculate monthly revenue
      const monthlyRevenue = mockProducts.reduce((sum, p) => 
        sum + (p.price * (p.soldToday || 0) * 30), 0
      );
      
      // Get top categories
      const categoryCounts: Record<string, number> = {};
      const categoryRevenue: Record<string, number> = {};
      
      mockProducts.forEach(p => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
        categoryRevenue[p.category] = (categoryRevenue[p.category] || 0) + (p.price * (p.soldToday || 0) * 30);
      });
      
      const topCategories = Object.entries(categoryCounts)
        .map(([category, count]) => ({
          category,
          count,
          revenue: categoryRevenue[category] || 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      // Get top brands
      const brandCounts: Record<string, number> = {};
      const brandRevenue: Record<string, number> = {};
      
      mockProducts.forEach(p => {
        brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
        brandRevenue[p.brand] = (brandRevenue[p.brand] || 0) + (p.price * (p.soldToday || 0) * 30);
      });
      
      const topBrands = Object.entries(brandCounts)
        .map(([brand, count]) => ({
          brand,
          count,
          revenue: brandRevenue[brand] || 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      const stats: ProductStats = {
        totalProducts,
        activeProducts,
        outOfStock,
        lowStock,
        totalCategories: mockCategories.length,
        totalBrands: Object.keys(brandCounts).length,
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews,
        monthlySales,
        monthlyRevenue,
        topCategories,
        topBrands,
      };
      
      return {
        success: true,
        data: stats,
        message: 'Product statistics fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching product statistics:', error);
      throw error;
    }
  },

  // Track product view
  async trackProductView(productId: string): Promise<ApiResponse<void>> {
    try {
      // Get recently viewed from localStorage
      const recentlyViewed = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
      
      // Add product ID to beginning and remove duplicates
      const updated = [productId, ...recentlyViewed.filter((id: string) => id !== productId)].slice(0, 20);
      
      // Save back to localStorage
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      
      return {
        success: true,
        data: undefined,
        message: 'Product view tracked successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error tracking view for product ${productId}:`, error);
      throw error;
    }
  },

  // Add to wishlist (local storage)
  async addToWishlist(productId: string): Promise<ApiResponse<void>> {
    try {
      // Get wishlist from localStorage
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      
      // Add product ID if not already in wishlist
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      }
      
      return {
        success: true,
        data: undefined,
        message: 'Product added to wishlist',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error adding product ${productId} to wishlist:`, error);
      throw error;
    }
  },

  // Remove from wishlist (local storage)
  async removeFromWishlist(productId: string): Promise<ApiResponse<void>> {
    try {
      // Get wishlist from localStorage
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      
      // Remove product ID from wishlist
      const updated = wishlist.filter((id: string) => id !== productId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      
      return {
        success: true,
        data: undefined,
        message: 'Product removed from wishlist',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error removing product ${productId} from wishlist:`, error);
      throw error;
    }
  },

  // Get wishlist products
  async getWishlist(): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Get wishlist from localStorage
      const wishlistIds = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      
      // Get products by IDs
      const products = mockProducts.filter(p => wishlistIds.includes(p.id));
      
      return {
        success: true,
        data: products,
        message: 'Wishlist fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },

  // Check if product is in wishlist
  isInWishlist(productId: string): boolean {
    try {
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      return wishlist.includes(productId);
    } catch (error) {
      console.error('Error checking wishlist:', error);
      return false;
    }
  },

  // Add to compare list
  async addToCompare(productId: string): Promise<ApiResponse<void>> {
    try {
      // Get compare list from localStorage
      const compareList = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
      
      // Add product ID if not already in compare list and limit to 4
      if (!compareList.includes(productId) && compareList.length < 4) {
        compareList.push(productId);
        localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
      }
      
      return {
        success: true,
        data: undefined,
        message: 'Product added to compare',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error adding product ${productId} to compare:`, error);
      throw error;
    }
  },

  // Remove from compare list
  async removeFromCompare(productId: string): Promise<ApiResponse<void>> {
    try {
      // Get compare list from localStorage
      const compareList = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
      
      // Remove product ID from compare list
      const updated = compareList.filter((id: string) => id !== productId);
      localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
      
      return {
        success: true,
        data: undefined,
        message: 'Product removed from compare',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error removing product ${productId} from compare:`, error);
      throw error;
    }
  },

  // Get compare list products
  async getCompareList(): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Get compare list from localStorage
      const compareIds = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
      
      // Get products by IDs
      const products = mockProducts.filter(p => compareIds.includes(p.id));
      
      return {
        success: true,
        data: products,
        message: 'Compare list fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching compare list:', error);
      throw error;
    }
  },

  // Get recently viewed products
  async getRecentlyViewed(limit: number = 8): Promise<ApiResponse<Product[]>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Get recently viewed from localStorage
      const recentlyViewedIds = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
      
      // Get products by IDs
      const products = mockProducts
        .filter(p => recentlyViewedIds.includes(p.id))
        .slice(0, limit);
      
      return {
        success: true,
        data: products,
        message: 'Recently viewed products fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching recently viewed products:', error);
      throw error;
    }
  },

  // Check product stock
  async checkStock(productId: string, quantity: number = 1): Promise<ApiResponse<{ inStock: boolean, availableQuantity: number }>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const product = mockProducts.find(p => p.id === productId);
      
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      
      const inStock = product.stock >= quantity;
      const availableQuantity = product.stock;
      
      return {
        success: true,
        data: { inStock, availableQuantity },
        message: 'Stock check completed',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error checking stock for product ${productId}:`, error);
      throw error;
    }
  },

  // Get product specifications
  async getProductSpecifications(productId: string): Promise<ApiResponse<Record<string, any>>> {
    try {
      initializeMockData();
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const product = mockProducts.find(p => p.id === productId);
      
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      
      return {
        success: true,
        data: product.specifications,
        message: 'Specifications fetched successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Error fetching specifications for product ${productId}:`, error);
      throw error;
    }
  },
};

export default productService;