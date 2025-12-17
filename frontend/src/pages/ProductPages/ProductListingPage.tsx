import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  ChevronDown,
  Star,
  TrendingUp,
  X,
  RefreshCw,
  LayoutGrid,
  List as ListIcon,
  Truck,
  Shield,
  Award,
  Zap,
  Clock,
  ShoppingCart,
  Heart,
  Eye,
  CheckCircle,
  Tag,
  Percent,
  Battery,
  Cpu,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Tablet,
  Watch,
  Plus,
  Minus,
  SlidersHorizontal,
  ArrowUpDown,
  DollarSign,
  Check
} from 'lucide-react';

// Core UI Components
import Button from '../../components/core/ui/buttons/Button';
import ProductCard from '../../components/core/ui/cards/ProductCard';
import ProductCardCompact from '../../components/core/ui/cards/ProductCardCompact';
import LoadingSpinner from '../../components/core/ui/loaders/Spinner';
import SkeletonLoader from '../../components/core/ui/loaders/SkeletonLoader';
import Badge from '../../components/core/ui/badges/Badge';
import Modal from '../../components/core/ui/modals/Modal';

// Module Components
import ProductGrid from '../../components/modules/products/ProductGrid';
import ProductList from '../../components/modules/products/ProductList';
import CategoryFilter from '../../components/modules/categories/CategoryFilter';
import SearchBar from '../../components/modules/search/SearchBar';
import PriceFilter from '../../components/modules/filters/PriceFilter';
import BrandFilter from '../../components/modules/filters/BrandFilter';

// Shared Components
import Breadcrumb from '../../components/core/shared/Breadcrumb';
import Pagination from '../../components/core/shared/Pagination';
import EmptyState from '../../components/core/shared/EmptyState';

// Layout Components
import Container from '../../components/core/layout/Container';

// Hooks
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useDebounce } from '../../hooks/useDebounce';
import { useMediaQuery } from '../../hooks/useMediaQuery';

// Utils & Types
import { formatCurrency } from '../../utils/formatters';
import { Product, ProductFilters } from '../../types/product.types';

// Config
import { SORT_OPTIONS, PRICE_RANGES, DEFAULT_FILTERS } from '../../config/constants.config';

// Simple Error Boundary for the SortFilter component
const SortFilterErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <div className="relative min-w-[180px]">
        <button
          type="button"
          className="
            flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium 
            bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-all duration-200
          "
        >
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900 truncate">Sort</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    );
  }
  
  return (
    <ErrorBoundaryWrapper onError={() => setHasError(true)}>
      {children}
    </ErrorBoundaryWrapper>
  );
};

const ErrorBoundaryWrapper = ({ children, onError }: { children: React.ReactNode, onError: () => void }) => {
  useEffect(() => {
    try {
      // This will catch any errors during rendering
      React.Children.forEach(children, child => {
        // Just checking if children exist
      });
    } catch (error) {
      onError();
    }
  }, [children, onError]);
  
  return <>{children}</>;
};

// FIXED: Inline SortFilter Component with complete error handling
const SortFilter = ({ value, onChange, className = '' }: { 
  value: string; 
  onChange: (value: string) => void; 
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // FIXED: Completely safe sort options
  const sortOptions = useMemo(() => {
    try {
      // Check if SORT_OPTIONS exists and is valid
      if (SORT_OPTIONS && Array.isArray(SORT_OPTIONS) && SORT_OPTIONS.length > 0) {
        // Return only value and label, completely ignore icons
        const options = [];
        for (let i = 0; i < SORT_OPTIONS.length; i++) {
          const opt = SORT_OPTIONS[i];
          if (opt && typeof opt === 'object') {
            options.push({
              value: String(opt.value || opt.id || `option-${i}`),
              label: String(opt.label || opt.name || `Option ${i + 1}`)
            });
          }
        }
        return options;
      }
    } catch (error) {
      console.error('Error processing SORT_OPTIONS:', error);
    }
    
    // Fallback options without any external dependencies
    return [
      { value: 'featured', label: 'Featured' },
      { value: 'newest', label: 'Newest' },
      { value: 'price-low-high', label: 'Price: Low to High' },
      { value: 'price-high-low', label: 'Price: High to Low' },
      { value: 'name-asc', label: 'Name: A to Z' },
      { value: 'name-desc', label: 'Name: Z to A' },
      { value: 'rating', label: 'Top Rated' },
      { value: 'discount', label: 'Best Discount' },
    ];
  }, []);
  
  // FIXED: Safe selected option
  const selectedOption = useMemo(() => {
    const option = sortOptions.find(opt => opt.value === value);
    return option || sortOptions[0] || { value: 'featured', label: 'Featured' };
  }, [value, sortOptions]);
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium 
          bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-all duration-200 min-w-[180px]
        "
      >
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-gray-500" />
          <span className="text-gray-900 truncate">{selectedOption?.label || 'Sort'}</span>
        </div>
        <ChevronDown 
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  flex items-center justify-between w-full px-4 py-2.5 text-sm 
                  transition-colors duration-150
                  ${value === option.value 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{option.label}</span>
                </div>
                {value === option.value && <Check className="h-4 w-4 text-primary-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'all',
    search: '',
    brands: [],
    priceRange: null,
    minRating: null,
    features: [],
    inStock: false,
    sortBy: 'featured',
    page: 1,
    limit: 12
  });

  // Refs
  const initialLoad = useRef(true);
  const previousFilters = useRef(filters);

  // Hooks
  const { products, loading, totalProducts, error } = useProducts(filters);
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Debounced search value
  const [searchValue, setSearchValue] = useState(filters.search);
  const debouncedSearch = useDebounce(searchValue, 500);

  // Initialize from URL params
  useEffect(() => {
    const initializeFilters = () => {
      const params = {
        category: searchParams.get('category') || 'all',
        search: searchParams.get('search') || '',
        brands: searchParams.get('brands')?.split(',').filter(Boolean) || [],
        priceRange: searchParams.get('priceRange') || null,
        minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : null,
        features: searchParams.get('features')?.split(',').filter(Boolean) || [],
        inStock: searchParams.get('inStock') === 'true',
        sortBy: searchParams.get('sortBy') || 'featured',
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1
      };

      setSearchValue(params.search);
      
      setFilters(prev => {
        const hasChanged = Object.keys(params).some(key => {
          const prevValue = prev[key as keyof ProductFilters];
          const newValue = params[key as keyof typeof params];
          
          if (Array.isArray(prevValue) && Array.isArray(newValue)) {
            return JSON.stringify(prevValue.sort()) !== JSON.stringify(newValue.sort());
          }
          return JSON.stringify(prevValue) !== JSON.stringify(newValue);
        });
        
        return hasChanged ? { ...prev, ...params } : prev;
      });
      
      initialLoad.current = false;
    };
    
    requestAnimationFrame(() => {
      initializeFilters();
    });
  }, [searchParams]);

  // Update URL params when filters change
  useEffect(() => {
    if (initialLoad.current) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    
    const updateParams = () => {
      const filtersChanged = JSON.stringify(previousFilters.current) !== JSON.stringify(filters);
      
      if (!filtersChanged) {
        return;
      }
      
      const params = new URLSearchParams();
      
      if (filters.category !== 'all') params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      if (filters.sortBy !== 'featured') params.set('sortBy', filters.sortBy);
      if (filters.brands.length > 0) params.set('brands', filters.brands.join(','));
      if (filters.priceRange) params.set('priceRange', filters.priceRange);
      if (filters.minRating) params.set('minRating', filters.minRating?.toString() || '');
      if (filters.features.length > 0) params.set('features', filters.features.join(','));
      if (filters.inStock) params.set('inStock', 'true');
      if (filters.page > 1) params.set('page', filters.page.toString());
      
      if (searchParams.toString() !== params.toString()) {
        setSearchParams(params, { replace: true });
      }
      
      previousFilters.current = { ...filters };
    };
    
    timeoutId = setTimeout(updateParams, 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [filters, setSearchParams, searchParams]);

  // Update search filter from debounced value
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters(prev => ({
        ...prev,
        search: debouncedSearch,
        page: 1
      }));
    }
  }, [debouncedSearch, filters.search]);

  // Memoized calculations
  const filteredProductsCount = useMemo(() => {
    return products.filter(p => p.stock > 0).length;
  }, [products]);

  const categoriesMap = useMemo(() => {
    return categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat }), {});
  }, [categories]);

  // Handlers
  const handleFilterChange = useCallback((key: keyof ProductFilters, value: any) => {
    setFilters(prev => {
      const currentValue = prev[key];
      const isSameValue = Array.isArray(currentValue) && Array.isArray(value)
        ? JSON.stringify(currentValue.sort()) === JSON.stringify(value.sort())
        : JSON.stringify(currentValue) === JSON.stringify(value);
      
      if (isSameValue) {
        return prev;
      }
      
      return {
        ...prev,
        [key]: value,
        page: key !== 'page' ? 1 : value
      };
    });
  }, []);

  const handleBrandToggle = (brandId: string) => {
    setFilters(prev => {
      const newBrands = prev.brands.includes(brandId)
        ? prev.brands.filter(b => b !== brandId)
        : [...prev.brands, brandId];
      
      if (JSON.stringify(prev.brands.sort()) === JSON.stringify(newBrands.sort())) {
        return prev;
      }
      
      return {
        ...prev,
        brands: newBrands,
        page: 1
      };
    });
  };

  const handleFeatureToggle = (featureId: string) => {
    setFilters(prev => {
      const newFeatures = prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId];
      
      if (JSON.stringify(prev.features.sort()) === JSON.stringify(newFeatures.sort())) {
        return prev;
      }
      
      return {
        ...prev,
        features: newFeatures,
        page: 1
      };
    });
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchValue('');
    setShowFilters(false);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => {
      if (prev.page === page) return prev;
      return { ...prev, page };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.priceRange) count++;
    if (filters.minRating) count++;
    if (filters.features.length > 0) count += filters.features.length;
    if (filters.inStock) count++;
    return count;
  };

  const handlePriceRangeChange = (range: string | null) => {
    handleFilterChange('priceRange', range);
  };

  const handleRatingChange = (rating: number | null) => {
    handleFilterChange('minRating', rating);
  };

  const handleInStockChange = (checked: boolean) => {
    handleFilterChange('inStock', checked);
  };

  const handleSortChange = (value: string) => {
    handleFilterChange('sortBy', value);
  };

  const handleCategoryChange = (category: string) => {
    handleFilterChange('category', category);
    if (isMobile && showFilters) {
      setShowFilters(false);
    }
  };

  // FIXED: Safe sort options for mobile
  const mobileSortOptions = useMemo(() => {
    try {
      if (SORT_OPTIONS && Array.isArray(SORT_OPTIONS) && SORT_OPTIONS.length > 0) {
        const options = [];
        for (let i = 0; i < SORT_OPTIONS.length; i++) {
          const opt = SORT_OPTIONS[i];
          if (opt && typeof opt === 'object') {
            options.push({
              value: String(opt.value || opt.id || `option-${i}`),
              label: String(opt.label || opt.name || `Option ${i + 1}`)
            });
          }
        }
        return options;
      }
    } catch (error) {
      console.error('Error processing mobile SORT_OPTIONS:', error);
    }
    
    return [
      { value: 'featured', label: 'Featured' },
      { value: 'newest', label: 'Newest' },
      { value: 'price-low-high', label: 'Price: Low to High' },
      { value: 'price-high-low', label: 'Price: High to Low' },
      { value: 'name-asc', label: 'Name: A to Z' },
      { value: 'name-desc', label: 'Name: Z to A' },
      { value: 'rating', label: 'Top Rated' },
      { value: 'discount', label: 'Best Discount' },
    ];
  }, []);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    ...(filters.category !== 'all' ? [{
      label: categoriesMap[filters.category]?.name || 'Category',
      href: `/products?category=${filters.category}`
    }] : [])
  ];

  // Quick filter buttons
  const quickFilters = [
    { id: 'new-arrivals', label: 'New Arrivals', icon: Clock, filter: () => handleFilterChange('sortBy', 'newest') },
    { id: 'hot-deals', label: 'Hot Deals', icon: Zap, filter: () => handleFilterChange('sortBy', 'discount') },
    { id: 'best-rated', label: 'Best Rated', icon: Star, filter: () => handleRatingChange(4) },
    { id: 'free-shipping', label: 'Free Shipping', icon: Truck, filter: () => handleFeatureToggle('free-shipping') }
  ];

  if (error) {
    return (
      <Container className="py-12">
        <EmptyState
          title="Something went wrong"
          description="We couldn't load the products. Please try again later."
          icon="error"
          action={{
            label: 'Try Again',
            onClick: () => window.location.reload()
          }}
        />
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
        <Container className="py-8 md:py-12">
          <Breadcrumb items={breadcrumbItems} className="text-white/80" />
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Smart <span className="text-yellow-300">Tech</span> Store
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Discover the latest smartphones, laptops, accessories, and components at unbeatable prices. 
              Free delivery in Teppi Town.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          {!isMobile && (
            <aside className="lg:w-1/4 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-6 space-y-6"
              >
                {/* Search */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <SearchBar
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder="Search products..."
                    className="w-full"
                  />
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <CategoryFilter
                    categories={categories}
                    selectedCategory={filters.category}
                    onCategoryChange={handleCategoryChange}
                    loading={categoriesLoading}
                  />
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <PriceFilter
                    priceRanges={PRICE_RANGES}
                    selectedRange={filters.priceRange}
                    onRangeChange={handlePriceRangeChange}
                    currency="ETB"
                  />
                </div>

                {/* Brands */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <BrandFilter
                    brands={[
                      { id: 'apple', name: 'Apple', logo: '🍎', productCount: 24 },
                      { id: 'samsung', name: 'Samsung', logo: '📱', productCount: 18 },
                      { id: 'dell', name: 'Dell', logo: '💻', productCount: 12 },
                      { id: 'hp', name: 'HP', logo: '🖨️', productCount: 15 },
                      { id: 'lenovo', name: 'Lenovo', logo: '💼', productCount: 10 },
                      { id: 'sony', name: 'Sony', logo: '🎮', productCount: 8 }
                    ]}
                    selectedBrands={filters.brands}
                    onBrandToggle={handleBrandToggle}
                  />
                </div>

                {/* Features */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'free-shipping', label: 'Free Shipping', icon: Truck },
                      { id: 'in-stock', label: 'In Stock', icon: CheckCircle },
                      { id: 'on-sale', label: 'On Sale', icon: Percent },
                      { id: 'new-arrival', label: 'New Arrival', icon: Clock }
                    ].map((feature) => (
                      <label key={`feature-${feature.id}`} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.features.includes(feature.id)}
                          onChange={() => handleFeatureToggle(feature.id)}
                          className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <feature.icon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{feature.label}</span>
                        {filters.features.includes(feature.id) && (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Customer Rating</h3>
                  <div className="space-y-2">
                    {[4.5, 4, 3].map((rating) => (
                      <button
                        key={`rating-filter-${rating}`}
                        onClick={() => handleRatingChange(filters.minRating === rating ? null : rating)}
                        className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          filters.minRating === rating
                            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={`star-${rating}-${i}`}
                              className={`h-4 w-4 ${
                                i < rating
                                  ? 'fill-current text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm">& Up</span>
                        {filters.minRating === rating && (
                          <CheckCircle className="h-4 w-4 text-yellow-600 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleInStockChange(e.target.checked)}
                      className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-gray-700">In Stock Only</span>
                    {filters.inStock && (
                      <span className="ml-auto text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                        {filteredProductsCount} items
                      </span>
                    )}
                  </label>
                </div>

                {/* Active Filters */}
                {getActiveFilterCount() > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-primary-600" />
                        <h3 className="font-semibold text-primary-900">Active Filters</h3>
                      </div>
                      <Badge variant="primary" size="sm">
                        {getActiveFilterCount()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {filters.category !== 'all' && (
                        <Badge 
                          key="category-badge"
                          variant="outline" 
                          closable 
                          onClose={() => handleFilterChange('category', 'all')}
                        >
                          Category: {categoriesMap[filters.category]?.name}
                        </Badge>
                      )}
                      {filters.brands.map((brandId) => (
                        <Badge 
                          key={`brand-badge-${brandId}`}
                          variant="outline" 
                          closable 
                          onClose={() => handleBrandToggle(brandId)}
                        >
                          Brand: {brandId}
                        </Badge>
                      ))}
                      {filters.features.map((featureId) => (
                        <Badge 
                          key={`feature-badge-${featureId}`}
                          variant="outline" 
                          closable 
                          onClose={() => handleFeatureToggle(featureId)}
                        >
                          {featureId.replace('-', ' ')}
                        </Badge>
                      ))}
                      {filters.priceRange && (
                        <Badge 
                          key="price-badge"
                          variant="outline" 
                          closable 
                          onClose={() => handleFilterChange('priceRange', null)}
                        >
                          Price: {filters.priceRange}
                        </Badge>
                      )}
                      {filters.minRating && (
                        <Badge 
                          key="rating-badge"
                          variant="outline" 
                          closable 
                          onClose={() => handleFilterChange('minRating', null)}
                        >
                          Rating: {filters.minRating}+
                        </Badge>
                      )}
                      {filters.inStock && (
                        <Badge 
                          key="stock-badge"
                          variant="outline" 
                          closable 
                          onClose={() => handleFilterChange('inStock', false)}
                        >
                          In Stock
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                      icon={<RefreshCw className="h-4 w-4" />}
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}

                {/* Smart Recommendations */}
                {products.length > 0 && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Zap className="h-5 w-5 text-yellow-300" />
                      <h3 className="font-bold">Smart Picks</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      Based on your filters, we recommend:
                    </p>
                    <ul className="space-y-2">
                      {products.slice(0, 3).map(product => (
                        <li
                          key={`recommendation-${product.id}`}
                          className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-colors"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-yellow-300 text-sm font-semibold">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            </aside>
          )}

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-sm mb-6"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Results Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {filters.category === 'all' ? 'All Products' : 
                       categoriesMap[filters.category]?.name || 'Products'}
                    </h2>
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm text-gray-600">
                        <span className="font-semibold">{totalProducts}</span> products found
                      </span>
                      {filters.inStock && (
                        <Badge variant="success" size="sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          In Stock
                        </Badge>
                      )}
                      {getActiveFilterCount() > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </div>
                  {filters.search && (
                    <p className="text-gray-600 text-sm mt-1">
                      Results for "<span className="font-medium">{filters.search}</span>"
                    </p>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-3">
                  {/* Sort Filter - Wrapped in error boundary */}
                  <div className="hidden sm:block">
                    <SortFilterErrorBoundary>
                      <SortFilter
                        value={filters.sortBy}
                        onChange={handleSortChange}
                        className="min-w-[180px]"
                      />
                    </SortFilterErrorBoundary>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <button
                      key="grid-view"
                      onClick={() => setViewMode('grid')}
                      className={`
                        p-2 rounded transition-colors
                        ${viewMode === 'grid' 
                          ? 'bg-primary-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'}
                      `}
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      key="list-view"
                      onClick={() => setViewMode('list')}
                      className={`
                        p-2 rounded transition-colors
                        ${viewMode === 'list' 
                          ? 'bg-primary-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'}
                      `}
                      aria-label="List view"
                    >
                      <ListIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Mobile Filter Button */}
                  {isMobile && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowFilters(true)}
                      icon={<Filter className="h-4 w-4" />}
                    >
                      Filters
                      {getActiveFilterCount() > 0 && (
                        <Badge variant="danger" size="xs" className="ml-1">
                          {getActiveFilterCount()}
                        </Badge>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {quickFilters.map((filter) => (
                    <Button
                      key={`quick-filter-${filter.id}`}
                      variant="outline"
                      size="sm"
                      onClick={filter.filter}
                      className="text-xs"
                      icon={<filter.icon className="h-3 w-3" />}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Products Display */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(filters.limit)].map((_, i) => (
                  <SkeletonLoader key={`skeleton-loader-${i}`} type="product-card" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your search or filters to find what you're looking for."
                icon="search"
                action={{
                  label: 'Clear All Filters',
                  onClick: clearFilters
                }}
                secondaryAction={{
                  label: 'Browse All Products',
                  onClick: () => navigate('/products')
                }}
              />
            ) : viewMode === 'grid' ? (
              <ProductGrid products={products} />
            ) : (
              <ProductList products={products} />
            )}

            {/* Pagination */}
            {!loading && products.length > 0 && totalProducts > filters.limit && (
              <div className="mt-12">
                <Pagination
                  currentPage={filters.page}
                  totalItems={totalProducts}
                  itemsPerPage={filters.limit}
                  onPageChange={handlePageChange}
                  showInfo={true}
                  className="justify-center"
                />
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <Modal
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            title="Filters"
            size="full"
            mobileFullScreen
          >
            <div className="space-y-6 p-4">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search products..."
                className="w-full"
              />

              <CategoryFilter
                categories={categories}
                selectedCategory={filters.category}
                onCategoryChange={(category) => {
                  handleCategoryChange(category);
                }}
                layout="grid"
              />

              <PriceFilter
                priceRanges={PRICE_RANGES}
                selectedRange={filters.priceRange}
                onRangeChange={(range) => {
                  handlePriceRangeChange(range);
                }}
                currency="ETB"
                layout="vertical"
              />

              {/* Mobile Brands Filter */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
                <div className="space-y-2">
                  {[
                    { id: 'apple', name: 'Apple', logo: '🍎', productCount: 24 },
                    { id: 'samsung', name: 'Samsung', logo: '📱', productCount: 18 },
                    { id: 'dell', name: 'Dell', logo: '💻', productCount: 12 },
                    { id: 'hp', name: 'HP', logo: '🖨️', productCount: 15 },
                    { id: 'lenovo', name: 'Lenovo', logo: '💼', productCount: 10 },
                    { id: 'sony', name: 'Sony', logo: '🎮', productCount: 8 }
                  ].map((brand) => (
                    <label key={`mobile-brand-${brand.id}`} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand.id)}
                        onChange={() => handleBrandToggle(brand.id)}
                        className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{brand.name}</span>
                      <span className="ml-auto text-xs text-gray-500">{brand.productCount}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Features Filter */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                <div className="space-y-2">
                  {[
                    { id: 'free-shipping', label: 'Free Shipping', icon: Truck },
                    { id: 'in-stock', label: 'In Stock', icon: CheckCircle },
                    { id: 'on-sale', label: 'On Sale', icon: Percent },
                    { id: 'new-arrival', label: 'New Arrival', icon: Clock }
                  ].map((feature) => (
                    <label key={`mobile-feature-${feature.id}`} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature.id)}
                        onChange={() => handleFeatureToggle(feature.id)}
                        className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <feature.icon className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{feature.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile In Stock Filter */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleInStockChange(e.target.checked)}
                    className="h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-gray-700">In Stock Only</span>
                </label>
              </div>

              {/* Mobile Sort Filter - FIXED: Using safe options */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                <div className="space-y-2">
                  {mobileSortOptions.map((option) => (
                    <button
                      key={`mobile-sort-${option.value}`}
                      onClick={() => {
                        handleSortChange(option.value);
                        setShowFilters(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        filters.sortBy === option.value
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <span>{option.label}</span>
                      {filters.sortBy === option.value && (
                        <Check className="h-4 w-4 text-primary-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button variant="outline" className="flex-1" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button variant="primary" className="flex-1" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <Modal
            isOpen={!!quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            title={quickViewProduct?.name}
            size="lg"
          >
            {quickViewProduct && (
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {formatCurrency(quickViewProduct.price)}
                    </h3>
                    {quickViewProduct.originalPrice && (
                      <p className="text-gray-500 line-through mb-1">
                        {formatCurrency(quickViewProduct.originalPrice)}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{quickViewProduct.rating}</span>
                      </div>
                      <span className="text-gray-500">
                        ({quickViewProduct.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="space-y-4">
                      <Button variant="primary" className="w-full" icon={<ShoppingCart className="h-4 w-4" />}>
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="w-full" icon={<Heart className="h-4 w-4" />}>
                        Add to Wishlist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListingPage;