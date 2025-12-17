/**
 * Format currency in Ethiopian Birr or other currencies
 */
export const formatCurrency = (amount: number, currency: string = 'ETB'): string => {
  if (currency === 'ETB') {
    return `ETB ${amount.toLocaleString('en-ET')}`
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date to local Ethiopian format
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-ET', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Generate product slug
 */
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Format product rating with stars
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}

/**
 * Format phone number for Ethiopia
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '+251 ' + match[1] + ' ' + match[2] + ' ' + match[3]
  }
  return phone
}

export default {
  formatCurrency,
  formatDate,
  truncateText,
  calculateDiscount,
  generateSlug,
  formatRating,
  formatPhoneNumber
}