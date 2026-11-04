import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, Tag, Phone, Info, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

const MainNav = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: ShoppingBag },
    { path: '/categories', label: 'Categories', icon: Tag },
    { path: '/sales', label: 'Sale', icon: Flame },
    { path: '/about', label: 'About ', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  return (
    <nav className="flex items-center space-x-1" aria-label="Main navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.path} className="relative">
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative flex items-center space-x-2 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50/50 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50/50 dark:hover:bg-gray-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
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