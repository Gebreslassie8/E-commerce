import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react'
import Logo from './Logo'
import MainNav from './MainNav'
import MobileMenu from './MobileMenu'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3) // This should come from your cart store
  const [wishlistCount, setWishlistCount] = useState(2) // This should come from your wishlist store

  // Close mobile menu on window resize if it becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Mobile Menu Sidebar - Always visible on left */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left Side - Mobile Menu Button & Logo */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              {/* Logo */}
              <div className="flex items-center">
                <Logo />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <MainNav />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => {/* Open search modal */}}
                aria-label="Search products"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="h-5 w-5 text-gray-600 hover:text-pink-600 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-medium text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-primary-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Signin</span>
              </Link>

              {/* Mobile User Icon */}
              <Link
                to="/login"
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header