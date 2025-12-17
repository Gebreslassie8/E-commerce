export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  category: string;
  subCategory?: string;
  brand: string;
  tags: string[];
  stock: number;
  specifications: Record<string, string>;
  features: string[];
  isNew: boolean;
  isHot: boolean;
  isFeatured: boolean;
  delivery?: {
    free: boolean;
    time: string;
    express: boolean;
  };
  warranty?: string;
  returnPolicy?: string;
  soldToday?: number;
  viewed?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category: string;
  search: string;
  brands: string[];
  priceRange: string | null;
  minRating: number | null;
  features: string[];
  inStock: boolean;
  sortBy: string;
  page: number;
  limit: number;
}

export interface SortOption {
  id: string;
  label: string;
  field: string;
  direction: 'asc' | 'desc';
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
  subCategories?: Category[];
}