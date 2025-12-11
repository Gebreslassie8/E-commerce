/**
 * Format currency in Ethiopian Birr
 */
export const formatCurrency = (amount: number, currency: string = 'ETB'): string => {
  const formatter = new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: currency === 'ETB' ? 'ETB' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  
  return formatter.format(amount)
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
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '+251 ' + match[1] + ' ' + match[2] + ' ' + match[3]
  }
  return phone
}