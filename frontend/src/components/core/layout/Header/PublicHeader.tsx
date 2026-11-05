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
  UserPlus,
} from 'lucide-react'
import Logo from './Logo'
import MainNav from './MainNav'
import MobileMenu from './MobileMenu'

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromoo', native: 'Afaan Oromoo' },
  { code: 'ti', label: 'Tigrinya', native: 'ትግርኛ' },
] as const

type LanguageCode = (typeof LANGUAGES)[number]['code']

interface PublicHeaderProps {
  cartCount?: number
  wishlistCount?: number
  user?: { name: string; avatar?: string; role?: string } | null
}

const PublicHeader = ({
  cartCount = 3,
  wishlistCount = 2,
  user = null,
}: PublicHeaderProps) => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [language, setLanguage] = useState<LanguageCode>('en')
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as LanguageCode
    if (savedLang && LANGUAGES.some((l) => l.code === savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const changeLanguage = (code: LanguageCode) => {
    setLanguage(code)
    localStorage.setItem('language', code)
    setIsLangDropdownOpen(false)
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
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setIsUserMenuOpen(false)
    navigate('/')
  }

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* ================================================================
          ROW 1 — TopBar (hidden on mobile)
          ================================================================ */}
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

      {/* ================================================================
          ROW 2 — Main header (3 zones: Logo | Nav | Actions)
          ================================================================ */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 lg:h-20 items-center justify-between gap-4">

            {/* ---------- ZONE 1: Logo (left) ---------- */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link to="/" className="flex items-center">
                <Logo />
              </Link>
            </div>

            {/* ---------- ZONE 2: Search bar (center, flexible) ---------- */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands, categories..."
                    className="w-full pl-10 pr-24 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* ---------- ZONE 3: Actions (right) ---------- */}
            <div className="flex items-center gap-1 shrink-0">

              {/* Search (mobile only — icon) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Wishlist — hidden on very small screens */}
              <Link
                to="/wishlist"
                className="relative hidden sm:inline-flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary-600 text-[10px] font-bold text-white flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Language — xl screens only */}
              <div className="relative hidden xl:block" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Language"
                >
                  <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      isLangDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black/5 z-50">
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
                            <span className="text-primary-600">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dark mode */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>

              {/* Divider */}
              <div className="hidden lg:block w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />

              {/* ---------- AUTH ZONE ---------- */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                      <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-200 max-w-20 truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown
                      className={`hidden lg:inline h-4 w-4 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black/5 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {user.role || 'Customer'}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <UserCircle className="h-4 w-4" />
                          My Account
                        </Link>
                        <Link
                          to="/account/orders"
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
                          to="/account/settings"
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
                  {/* Desktop auth buttons */}
                  <div className="hidden md:flex items-center gap-2 ml-1">
                    <Link
                      to="/login"
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-all shadow-sm"
                    >
                      Register
                    </Link>
                  </div>

                  {/* Mobile auth (compact) */}
                  <div className="md:hidden flex items-center gap-1">
                    <Link
                      to="/login"
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Sign In"
                    >
                      <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </Link>
                    <Link
                      to="/register"
                      className="p-2 rounded-lg bg-primary-600 text-white"
                      aria-label="Register"
                    >
                      <UserPlus className="h-5 w-5" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================
            ROW 2b — Nav (below on large screens — cleaner layout)
            ================================================================ */}
        <div className="hidden lg:block border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-12">
              <MainNav />
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================
          Mobile search modal
          ================================================================ */}
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
                aria-label="Close"
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

export default PublicHeader