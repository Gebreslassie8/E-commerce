import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Search,
  Truck,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  BRIGHT_TECHMART,
  ORDER_STATUS_FLOW,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_DESCRIPTIONS,
  DEFAULT_CARRIER,
  type OrderStatus,
} from '../../config/constants.config'

interface OrderInfo {
  orderNumber: string
  status: OrderStatus
  estimatedDelivery: string
  carrier: string
  trackingNumber: string
  items: number
  total: number
  shippingAddress: string
  recipient: string
  phone: string
}

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<OrderInfo | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim() || !email.trim()) {
      toast.error('Please enter both order number and email')
      return
    }

    setIsLoading(true)

    // ⚠️ Mock — replace with real API call later
    setTimeout(() => {
      setOrder({
        orderNumber: orderNumber.toUpperCase(),
        status: 'shipped',
        estimatedDelivery: 'November 8, 2026',
        carrier: DEFAULT_CARRIER,
        trackingNumber: 'ETP-' + orderNumber.toUpperCase().slice(-6),
        items: 3,
        total: 2450,
        shippingAddress: 'Bole Road, House 123, Addis Ababa, Ethiopia',
        recipient: 'Gebreslassie Dessie',
        phone: BRIGHT_TECHMART.CONTACT.PHONE,
      })
      setIsLoading(false)
      toast.success('Order found!')
    }, 1200)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const currentStatusIndex = order ? ORDER_STATUS_FLOW.indexOf(order.status) : -1

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">Track Order</span>
        </nav>

        {/* Page title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <Package className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Enter your order number and email to see real-time delivery updates.
          </p>
        </div>

        {/* ============ Search Form ============ */}
        {!order && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Order Number *
                </label>
                <input
                  id="orderNumber"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., ORD-2024-001"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Track Order</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                You can find your order number in the confirmation email we sent you.
              </p>
            </form>
          </div>
        )}

        {/* ============ Order Found ============ */}
        {order && (
          <div className="space-y-6">
            {/* Success banner */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">
                  Order found!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Estimated delivery: <strong>{order.estimatedDelivery}</strong>
                </p>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Order Number
                  </p>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                      {order.orderNumber}
                    </h2>
                    <button
                      onClick={() => handleCopy(order.orderNumber)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      aria-label="Copy order number"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full w-fit">
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Items</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.items}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Total</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.total.toLocaleString()} {BRIGHT_TECHMART.CURRENCY}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Carrier</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {order.carrier}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Tracking #</p>
                  <p className="font-mono text-xs font-medium text-gray-900 dark:text-gray-100">
                    {order.trackingNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline — built from constants */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-6">
                Delivery Timeline
              </h3>

              <div className="relative">
                {ORDER_STATUS_FLOW.map((status, i) => {
                  const isCompleted = i <= currentStatusIndex
                  const isCurrent = i === currentStatusIndex
                  const isLast = i === ORDER_STATUS_FLOW.length - 1

                  return (
                    <div key={status} className="relative flex gap-4 pb-8 last:pb-0">
                      {/* Vertical line */}
                      {!isLast && (
                        <div
                          className={`absolute left-5 top-10 w-0.5 h-full ${
                            i < currentStatusIndex
                              ? 'bg-primary-600 dark:bg-primary-400'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-primary-600 dark:bg-primary-500 text-white'
                            : isCurrent
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 ring-4 ring-primary-100 dark:ring-primary-900/20'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                        }`}
                      >
                        {status === 'shipped' ? (
                          <Truck className="h-5 w-5" />
                        ) : status === 'processing' ? (
                          <Package className="h-5 w-5" />
                        ) : (
                          <CheckCircle className="h-5 w-5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <h4
                          className={`font-medium ${
                            isCompleted || isCurrent
                              ? 'text-gray-900 dark:text-gray-100'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {ORDER_STATUS_LABELS[status]}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          {ORDER_STATUS_DESCRIPTIONS[status]}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Address + help */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                  Shipping Address
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.recipient}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {order.shippingAddress}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {order.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                  Need Help?
                </h3>
                <div className="space-y-2 text-sm">
                  <a
                    href={`tel:${BRIGHT_TECHMART.CONTACT.PHONE}`}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {BRIGHT_TECHMART.CONTACT.PHONE}
                  </a>
                  <a
                    href={`mailto:${BRIGHT_TECHMART.CONTACT.EMAIL}`}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {BRIGHT_TECHMART.CONTACT.EMAIL}
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium mt-2"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setOrder(null)
                  setOrderNumber('')
                  setEmail('')
                }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Track Another Order
              </button>
              <Link
                to="/products"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackOrder