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
  UserPlus
} from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Main navigation - customer focused only
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Shop', icon: ShoppingBag },
    { path: '/categories', label: 'Categories', icon: Tag },
    { path: '/deals', label: 'Hot Deals', icon: Tag },
    { path: '/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  // Information/Policy pages
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

          {/* Left Sidebar Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-2xl md:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Welcome!</p>
                  <p className="text-xs text-gray-500">Sign in to your account</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Auth Actions */}
            <div className="p-4 border-b">
              <div className="grid grid-cols-2 gap-2">
                <NavLink
                  to="/login"
                  onClick={onClose}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <LogIn className="h-4 w-4 text-primary-600" />
                  <span className="text-sm font-medium text-primary-600">Sign In</span>
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={onClose}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <UserPlus className="h-4 w-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Register</span>
                </NavLink>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b">
              <div className="grid grid-cols-2 gap-3">
                <NavLink
                  to="/cart"
                  onClick={onClose}
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                      3
                    </span>
                  </div>
                  <span className="text-xs font-medium mt-2">Cart</span>
                </NavLink>
                <NavLink
                  to="/wishlist"
                  onClick={onClose}
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative">
                    <Heart className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                      2
                    </span>
                  </div>
                  <span className="text-xs font-medium mt-2">Wishlist</span>
                </NavLink>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Main Navigation */}
            <div className="p-4 border-b">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-50'
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

            {/* Information Links */}
            <div className="p-4 border-b">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
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
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{item.label}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </div>

            {/* Contact & Support */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Support
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+251123456789"
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Call Support</p>
                    <p className="text-sm text-primary-600 font-semibold">+251 123 456 789</p>
                  </div>
                </a>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Business Hours</p>
                  <p className="text-sm font-medium text-gray-900">8:00 AM - 8:00 PM</p>
                  <p className="text-xs text-gray-500">Every day</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50 mt-auto">
              <p className="text-xs text-gray-500 text-center">
                © {new Date().getFullYear()} Bright TechMart
              </p>
              <p className="text-xs text-gray-500 text-center mt-1">
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