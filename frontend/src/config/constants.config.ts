// ============================================================
// Shop Filters
// ============================================================
export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'discount', label: 'Best Discount' },
]

export const PRICE_RANGES = [
  { id: 'under-10k', label: 'Under ETB 10,000', min: 0, max: 10000 },
  { id: '10k-30k', label: 'ETB 10,000 - 30,000', min: 10000, max: 30000 },
  { id: '30k-60k', label: 'ETB 30,000 - 60,000', min: 30000, max: 60000 },
  { id: 'above-60k', label: 'ETB 60,000+', min: 60000, max: 1000000 },
]

export const DEFAULT_FILTERS = {
  category: 'all',
  search: '',
  brands: [],
  priceRange: null,
  minRating: null,
  features: [],
  inStock: false,
  sortBy: 'featured',
  page: 1,
  limit: 12,
}

// ============================================================
// Brand / Company Info
// ============================================================
export const BRIGHT_TECHMART = {
  NAME: 'Bright TechMart',
  TAGLINE: 'Discover the latest tech at unbeatable prices',
  CURRENCY: 'ETB',
  DELIVERY_AREA: 'Teppi Town',
  CONTACT: {
    PHONE: '+251-911-234567',              // ⚠️ Fix the placeholder
    EMAIL: 'support@brighttechmart.com',
    ADDRESS: 'Teppi Town, Ethiopia',
    HOURS: '8:00 AM – 8:00 PM Daily',
  },
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/brighttechmart',
    TWITTER: 'https://twitter.com/brighttechmart',
    INSTAGRAM: 'https://instagram.com/brighttechmart',
  },
}

// ============================================================
// Order Status
// ============================================================
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export const ORDER_STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  pending: 'Your order has been received',
  confirmed: 'Payment verified and order confirmed',
  processing: 'Your items are being prepared',
  shipped: 'Package handed to carrier',
  delivered: 'Package delivered to your address',
  cancelled: 'Order was cancelled',
}

export const DEFAULT_CARRIER = 'EthioPost Express'

// ============================================================
// Pagination
// ============================================================
export const DEFAULT_PAGE_SIZE = 12
export const PAGE_SIZE_OPTIONS = [12, 24, 48, 96]