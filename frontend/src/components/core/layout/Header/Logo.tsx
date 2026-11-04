import { Link } from 'react-router-dom'
import { Laptop } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}

const Logo = ({ size = 'md', showTagline = true }: LogoProps) => {
  const sizes = {
    sm: { icon: 'h-5 w-5', box: 'p-1.5', title: 'text-base', tagline: 'text-[10px]' },
    md: { icon: 'h-6 w-6', box: 'p-2', title: 'text-lg', tagline: 'text-xs' },
    lg: { icon: 'h-8 w-8', box: 'p-2.5', title: 'text-2xl', tagline: 'text-sm' },
  }

  const s = sizes[size]

  return (
    <Link
      to="/"
      className="flex items-center space-x-2.5 group"
      aria-label="Bright TechMart — Home"
    >
      {/* Icon with gradient glow */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl blur-sm opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
        <div className={`relative bg-white dark:bg-gray-900 rounded-xl ${s.box} shadow-sm`}>
          <Laptop className={`${s.icon} text-primary-600 dark:text-primary-400 transition-transform duration-300 group-hover:scale-110`} />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className={`${s.title} font-bold text-gray-900 dark:text-gray-50 tracking-tight`}>
          Bright <span className="text-primary-600 dark:text-primary-400">TechMart</span>
        </span>
        {showTagline && (
          <span className={`${s.tagline} text-gray-500 dark:text-gray-400 font-medium tracking-wide`}>
            Technology Marketplace
          </span>
        )}
      </div>
    </Link>
  )
}

export default Logo