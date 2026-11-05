import { Heart } from 'lucide-react'
import { useWishlistStore, WishlistItem } from '../../../../store/wishlistStore'
import toast from 'react-hot-toast'

interface WishlistButtonProps {
  product: Omit<WishlistItem, 'addedAt'>
  variant?: 'icon' | 'full'
  className?: string
}

const WishlistButton = ({
  product,
  variant = 'icon',
  className = '',
}: WishlistButtonProps) => {
  const { isInWishlist, toggleItem } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
    toast.success(
      inWishlist ? 'Removed from wishlist' : 'Added to wishlist ❤️'
    )
  }

  if (variant === 'full') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all font-medium text-sm ${
          inWishlist
            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
            : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-pink-500 hover:text-pink-600'
        } ${className}`}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`}
        />
        <span>{inWishlist ? 'Saved' : 'Save to Wishlist'}</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md hover:scale-110 transition-all ${
        inWishlist ? 'text-pink-600' : 'text-gray-600 dark:text-gray-300'
      } ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
    </button>
  )
}

export default WishlistButton