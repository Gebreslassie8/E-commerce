import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  Globe,
  Moon,
  Sun,
  ChevronDown,
  Phone,
  Package,
  LogOut,
  UserCircle,
  Settings,
} from 'lucide-react'
import Logo from './Logo'
import MainNav from './MainNav'
import MobileMenu from './MobileMenu'

// Optional — uncomment if you have Redux set up
// import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
// import { logout } from '../../../../store/slices/authSlice'

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ' },
] as const

type LanguageCode = (typeof LANGUAGES)[number]['code']

interface HeaderProps {
  // Optional — if you have Redux, get these from store instead
  cartCount?: number
  wishlistCount?: number
  user?: { name: string; avatar?: string } | null
}

const Header = ({
  cartCount = 3,        // ← fallback if not connected to Redux
  wishlistCount = 2,    // ← fallback
  user = null,          // ← fallback: not logged in
}: HeaderProps) => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // ============ Dark Mode ============
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // ============ Language ============
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)

  // ============ User Menu ============
  const userMenuRef = useRef<HTMLDivElement>(null)

  // ============ Effects ============
  // Load saved language
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as LanguageCode
    if (savedLang && LANGUAGES.some((l) => l.code === savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangDropdownOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ============ Handlers ============
  const changeLanguage = (code: LanguageCode) => {
    setLanguage(code)
    localStorage.setItem('language', code)
    setIsLangDropdownOpen(false)
    // i18n.changeLanguage(code) // if using i18next
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    // dispatch(logout()) // if using Redux
    localStorage.removeItem('token')
    setIsUserMenuOpen(false)
    navigate('/')
  }

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  // ============ Render ============
  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* ============ TopBar — announcements + support ============ */}
      <div className="hidden md:block bg-gray-900 dark:bg-black text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="flex items-center gap-2">
            🚚 Free delivery on orders over 5,000 ETB
          </span>
          <div className="flex items-center space-x-4">
            <a
              href="tel:+251123456789"
              className="flex items-center gap-1 hover:text-primary-400 transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>+251 123 456 789</span>
            </a>
            <span className="text-gray-600">|</span>
            <Link
              to="/track-order"
              className="flex items-center gap-1 hover:text-primary-400 transition-colors"
            >
              <Package className="h-3 w-3" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============ Main Header ============ */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* ============ Left: Menu + Logo ============ */}
            <div className="flex items-center space-x-4 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <Link to="/" className="flex items-center">
                <Logo />
              </Link>
            </div>

            {/* ============ Center: Desktop Nav + Search ============ */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <MainNav />
            </div>

            {/* Search bar — desktop only */}
            <div className="hidden lg:flex flex-1 max-w-sm">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </form>
            </div>

            {/* ============ Right: Actions ============ */}
            <div className="flex items-center space-x-2 shrink-0">
              {/* Search (mobile — opens modal) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-pink-500 text-xs font-medium text-white flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary-600 text-xs font-medium text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Language Dropdown */}
              <div className="relative hidden lg:block" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Select language"
                  aria-haspopup="true"
                  aria-expanded={isLangDropdownOpen}
                >
                  <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden xl:inline">
                    {currentLang.native}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isLangDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {lang.native}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {lang.label}
                            </div>
                          </div>
                          {language === lang.code && (
                            <span className="text-primary-600 text-lg">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
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

              {/* ============ Sign In / User Menu ============ */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={isUserMenuOpen}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-500"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-200 max-w-24 truncate">
                      {user.name}
                    </span>
                    <ChevronDown
                      className={`hidden lg:inline h-4 w-4 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Signed in
                          </p>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <UserCircle className="h-4 w-4" />
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Package className="h-4 w-4" />
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Heart className="h-4 w-4" />
                          Wishlist
                        </Link>
                        <Link
                          to="/settings"
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
              ) : (
                <>
                  {/* Desktop Sign In button — styled as CTA */}
                  <Link
                    to="/login"
                    className="hidden md:inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium text-sm shadow-sm"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>

                  {/* Mobile sign in icon */}
                  <Link
                    to="/login"
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Sign in"
                  >
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ============ Full-Screen Search Modal (mobile) ============ */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <form
            onSubmit={handleSearch}
            className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-lg text-gray-900 dark:text-gray-100 outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Header