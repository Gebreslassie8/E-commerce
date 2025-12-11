// App Constants
export const APP_NAME = 'Bright TechMart'
export const APP_DESCRIPTION = 'Technology E-commerce Platform for Teppi Town'
export const APP_VERSION = '1.0.0'

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    CATEGORIES: '/products/categories',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: '/cart/remove',
    CLEAR: '/cart/clear',
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    TRACK: '/orders/:id/track',
  },
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY: '/payments/verify',
    WEBHOOK: '/payments/webhook',
  },
}

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'smartphones', name: 'Smartphones', icon: '📱' },
  { id: 'laptops', name: 'Laptops', icon: '💻' },
  { id: 'tablets', name: 'Tablets', icon: '📱' },
  { id: 'accessories', name: 'Accessories', icon: '🎧' },
  { id: 'components', name: 'Components', icon: '⚙️' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'networking', name: 'Networking', icon: '📡' },
  { id: 'storage', name: 'Storage', icon: '💾' },
]

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'chapa', name: 'Chapa', icon: '💳', description: 'Cards & Mobile Money' },
  { id: 'telebirr', name: 'Telebirr', icon: '📱', description: 'Telebirr Mobile Money' },
  { id: 'cbe-birr', name: 'CBE Birr', icon: '🏦', description: 'Commercial Bank of Ethiopia' },
  { id: 'hello-cash', name: 'HelloCash', icon: '💰', description: 'HelloCash Mobile Money' },
  { id: 'stripe', name: 'Stripe', icon: '💳', description: 'International Cards' },
]

// Order Status
export const ORDER_STATUS = {
  PENDING: { label: 'Pending', color: 'yellow' },
  PROCESSING: { label: 'Processing', color: 'blue' },
  SHIPPED: { label: 'Shipped', color: 'purple' },
  DELIVERED: { label: 'Delivered', color: 'green' },
  CANCELLED: { label: 'Cancelled', color: 'red' },
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART_ITEMS: 'cart_items',
  THEME: 'theme',
  LANGUAGE: 'language',
}