import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  ShoppingBag,
  Tag,
  Phone,
  Info,
  X,
  ShoppingCart,
  Search,
  Heart,
  User,
  Truck,
  FileText,
  Shield,
  LogIn,
  UserPlus,
  Flame,
} from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  cartCount?: number
  wishlistCount?: number
}

const MobileMenu = ({
  isOpen,
  onClose,
  cartCount = 3,      // ← fallback; connect to Redux later
  wishlistCount = 2,  // ← fallback
}: MobileMenuProps) => {
  // Main navigation — customer focused
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Shop', icon: ShoppingBag },
    { path: '/categories', label: 'Categories', icon: Tag },
    { path: '/sales', label: 'Hot Deals', icon: Flame },
    { path: '/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  // Information / policy pages
  const infoItems = [
    { path: '/shipping', label: 'Shipping Info', icon: Truck },
    { path: '/returns', label: 'Return Policy', icon: FileText },
    { path: '/privacy', label: 'Privacy Policy', icon: Shield },
    { path: '/terms', label: 'Terms of Service', icon: FileText },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Sidebar panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white dark:bg-gray-900 shadow-2xl md:hidden overflow-y-auto flex flex-col"
          >
            {/* ============ Header ============ */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Welcome!
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sign in to your account
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ============ Auth Buttons ============ */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-2">
                <NavLink
                  to="/login"
                  onClick={onClose}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={onClose}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="text-sm font-medium">Register</span>
                </NavLink>
              </div>
            </div>

            {/* ============ Quick Actions ============ */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-3">
                <NavLink
                  to="/cart"
                  onClick={onClose}
                  className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium mt-2 text-gray-700 dark:text-gray-300">
                    Cart
                  </span>
                </NavLink>
                <NavLink
                  to="/wishlist"
                  onClick={onClose}
                  className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="relative">
                    <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium mt-2 text-gray-700 dark:text-gray-300">
                    Wishlist
                  </span>
                </NavLink>
              </div>
            </div>

            {/* ============ Search ============ */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* ============ Main Navigation ============ */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </div>

            {/* ============ Information Links ============ */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Information
              </h3>
              <nav className="space-y-1">
                {infoItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm">{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </div>

            {/* ============ Contact & Support ============ */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Support
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+251123456789"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Call Support
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                      +251 123 456 789
                    </p>
                  </div>
                </a>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Business Hours
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    8:00 AM - 8:00 PM
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Every day
                  </p>
                </div>
              </div>
            </div>

            {/* ============ Footer ============ */}
            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                © {new Date().getFullYear()} Bright TechMart
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                Technology Marketplace
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu