import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Bell,
  Moon,
  Sun,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
  Search,
  Home,
} from 'lucide-react'
import Logo from './Logo'

interface DashboardHeaderProps {
  role: 'admin' | 'vendor' | 'customer'
  userName?: string
  userAvatar?: string
  onMenuToggle?: () => void
}

const ROLE_BADGE = {
  admin: { label: 'Admin', color: 'bg-blue-600 text-white' },
  vendor: { label: 'Seller', color: 'bg-green-600 text-white' },
  customer: { label: 'Customer', color: 'bg-purple-600 text-white' },
}

const ROLE_HOME = {
  admin: '/admin',
  vendor: '/vendor',
  customer: '/account',
}

const DashboardHeader = ({
  role,
  userName = 'Gebreslassie',
  userAvatar,
  onMenuToggle,
}: DashboardHeaderProps) => {
  const navigate = useNavigate()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  // ============ Dark Mode ============
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsUserMenuOpen(false)
    navigate('/login')
  }

  const badge = ROLE_BADGE[role]
  const homePath = ROLE_HOME[role]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div className="px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ============ Left: Menu + Logo + Role badge ============ */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu toggle */}
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>

            <Link to={homePath} className="flex items-center">
              <Logo size="sm" showTagline={false} />
            </Link>

            <span
              className={`hidden md:inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${badge.color}`}
            >
              {badge.label}
            </span>
          </div>

          {/* ============ Right: Quick actions + user menu ============ */}
          <div className="flex items-center space-x-2">
            {/* Search (optional) */}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden md:inline-flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Back to store */}
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Store</span>
            </Link>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Notifications
                    </p>
                  </div>
                  <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                    No new notifications
                  </div>
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-500"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-200 max-w-24 truncate">
                  {userName}
                </span>
                <ChevronDown
                  className={`hidden lg:inline h-4 w-4 transition-transform ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {badge.label}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to={`${homePath}/profile`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to={`${homePath}/settings`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader