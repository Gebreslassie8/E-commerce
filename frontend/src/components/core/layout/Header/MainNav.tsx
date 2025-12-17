import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, Tag, Phone, Info, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MainNav = () => {
  const [cartItems] = useState(3) // This should come from your cart store

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: ShoppingBag },
    { path: '/categories', label: 'Categories', icon: Tag },
    { path: '/sales', label: 'Sale', icon: Tag }, // Recommended
    { 
      path: '/cart', 
      label: 'Cart', 
      icon: ShoppingCart,
      badge: cartItems > 0 ? cartItems : null
    },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  return (
    <nav className="flex items-center space-x-2">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.path} className="relative">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50/50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </div>
        )
      })}
    </nav>
  )
}

export default MainNav