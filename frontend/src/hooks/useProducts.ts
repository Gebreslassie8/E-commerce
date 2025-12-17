import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/api/productService';
import { Product, ProductFilters, Category, Review } from '../types/product.types';
// Main hook for products with filters
export const useProducts = (filters: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProducts(filters);
      
      setProducts(response.items);
      setTotalProducts(response.total);
      setTotalPages(response.totalPages);
      setHasNext(response.hasNext);
      setHasPrevious(response.hasPrevious);
      
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { 
    products, 
    loading, 
    error, 
    totalProducts,
    totalPages,
    hasNext,
    hasPrevious,
    refetch: fetchProducts 
  };
};

// Hook for single product
export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProductById(id);
      
      if (response.success) {
        setProduct(response.data);
      } else {
        setError(response.message || 'Product not found');
      }
    } catch (err) {
      setError('Failed to load product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};

// Hook for categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getCategories();
      
      if (response.success) {
        setCategories(response.data);
      } else {
        setError(response.message || 'Failed to load categories');
      }
    } catch (err) {
      setError('Failed to load categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
};

// Hook for featured products
export const useFeaturedProducts = (limit: number = 8) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getFeaturedProducts(limit);
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to load featured products');
      }
    } catch (err) {
      setError('Failed to load featured products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return { products, loading, error, refetch: fetchFeaturedProducts };
};

// Hook for trending products
export const useTrendingProducts = (limit: number = 8) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getTrendingProducts(limit);
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to load trending products');
      }
    } catch (err) {
      setError('Failed to load trending products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTrendingProducts();
  }, [fetchTrendingProducts]);

  return { products, loading, error, refetch: fetchTrendingProducts };
};

// Hook for new arrivals
export const useNewArrivals = (limit: number = 8) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewArrivals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getNewArrivals(limit);
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to load new arrivals');
      }
    } catch (err) {
      setError('Failed to load new arrivals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchNewArrivals();
  }, [fetchNewArrivals]);

  return { products, loading, error, refetch: fetchNewArrivals };
};

// Hook for best sellers
export const useBestSellers = (limit: number = 8) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBestSellers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getBestSellers(limit);
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to load best sellers');
      }
    } catch (err) {
      setError('Failed to load best sellers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchBestSellers();
  }, [fetchBestSellers]);

  return { products, loading, error, refetch: fetchBestSellers };
};

// Hook for wishlist
export const useWishlist = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getWishlist();
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to load wishlist');
      }
    } catch (err) {
      setError('Failed to load wishlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId: string) => {
    try {
      await productService.addToWishlist(productId);
      fetchWishlist(); // Refresh
      return { success: true };
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
      return { success: false, error: err };
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await productService.removeFromWishlist(productId);
      fetchWishlist(); // Refresh
      return { success: true };
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
      return { success: false, error: err };
    }
  };

  const isInWishlist = (productId: string) => {
    return productService.isInWishlist(productId);
  };

  return { 
    products, 
    loading, 
    error, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    refetch: fetchWishlist 
  };
};

// Hook for recently viewed products
export const useRecentlyViewed = (limit: number = 8) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentlyViewed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getRecentlyViewed(limit);
      
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || 'Failed to load recently viewed');
      }
    } catch (err) {
      setError('Failed to load recently viewed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRecentlyViewed();
  }, [fetchRecentlyViewed]);

  return { products, loading, error, refetch: fetchRecentlyViewed };
};

// Hook for search
export const useProductSearch = (query: string, limit: number = 10) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.searchProducts(query, limit);
      
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.message || 'No results found');
      }
    } catch (err) {
      setError('Failed to search products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, limit]);

  useEffect(() => {
    searchProducts();
  }, [searchProducts]);

  return { results, loading, error, refetch: searchProducts };
};

// Hook for product reviews
export const useProductReviews = (productId: string | undefined, page: number = 1, limit: number = 10) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchReviews = useCallback(async () => {
    if (!productId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProductReviews(productId, page, limit);
      
      setReviews(response.items);
      setTotalReviews(response.total);
      setTotalPages(response.totalPages);
      
    } catch (err) {
      setError('Failed to load reviews');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [productId, page, limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, error, totalReviews, totalPages, refetch: fetchReviews };
};

// Export everything for easier imports
export default {
  useProducts,
  useProduct,
  useCategories,
  useFeaturedProducts,
  useTrendingProducts,
  useNewArrivals,
  useBestSellers,
  useWishlist,
  useRecentlyViewed,
  useProductSearch,
  useProductReviews,
};