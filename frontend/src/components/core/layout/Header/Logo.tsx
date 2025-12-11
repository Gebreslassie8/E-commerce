import { Link } from 'react-router-dom'
import { Laptop } from 'lucide-react'

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white p-2 rounded-full">
          <Laptop className="h-8 w-8 text-primary-600" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 leading-tight">
          Bright TechMart
        </span>
        <span className="text-xs text-gray-500">
          Technology Marketplace
        </span>
      </div>
    </Link>
  )
}

export default Logo