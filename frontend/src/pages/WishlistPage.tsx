import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from 'lucide-react'
import { useWishlistStore } from '../store/wishlistStore'
import toast from 'react-hot-toast'
import { BRIGHT_TECHMART } from '../config/constants.config'

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore()

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    toast.success(`Removed "${name}" from wishlist`)
  }

  const handleClearAll = () => {
    if (items.length === 0) return
    if (window.confirm('Remove all items from your wishlist?')) {
      clearWishlist()
      toast.success('Wishlist cleared')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-pink-100 dark:bg-pink-900/20 rounded-full mb-6">
            <Heart className="h-12 w-12 text-pink-600 dark:text-pink-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            Your wishlist is empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            Save your favorite products here to easily find them later.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Start Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">Wishlist</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 flex items-center gap-3">
              <Heart className="h-7 w-7 text-pink-600 fill-current" />
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-fit"
          >
            <Trash2 className="h-4 w-4" />
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-200 dark:border-gray-800"
            >
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/400x400?text=No+Image'
                    }}
                  />
                </Link>
                <button
                  onClick={() => handleRemove(item.id, item.name)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur text-red-600 hover:bg-red-500 hover:text-white transition-colors shadow-md"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-3">
                  {item.price.toLocaleString()} {BRIGHT_TECHMART.CURRENCY}
                </p>
                <button
                  onClick={() =>
                    toast.success(`Added "${item.name}" to cart`)
                  }
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
