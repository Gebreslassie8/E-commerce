import { Link } from 'react-router-dom'
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  Package,
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* ============ Main Grid ============ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Bright TechMart</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your trusted technology marketplace in Teppi Town, Ethiopia.
              Shop the latest smartphones, laptops, and accessories with secure
              payments and fast delivery.
            </p>

            {/* Social */}
            <div className="flex space-x-3">
              <a
                href="https://facebook.com/brighttechmart"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/brighttechmart"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-sky-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/brighttechmart"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@brighttechmart.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=smartphones" className="hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/products?category=laptops" className="hover:text-white transition-colors">
                  Laptops & Computers
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=components" className="hover:text-white transition-colors">
                  PC Components
                </Link>
              </li>
              <li>
                <Link to="/sales" className="hover:text-white transition-colors text-primary-400">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <span>Teppi Town, SNNPR, Ethiopia</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <a href="tel:+251123456789" className="hover:text-white transition-colors">
                  +251 123 456 789
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <a href="mailto:support@brighttechmart.com" className="hover:text-white transition-colors">
                  support@brighttechmart.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <span>8:00 AM – 8:00 PM Daily</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ============ Trust Badges ============ */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Truck className="h-4 w-4 text-blue-400" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Package className="h-4 w-4 text-yellow-400" />
              <span>Quality Guarantee</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-500 mr-2">We Accept:</span>
            <span className="px-3 py-1 bg-gray-800 rounded text-xs">Chapa</span>
            <span className="px-3 py-1 bg-gray-800 rounded text-xs">Telebirr</span>
            <span className="px-3 py-1 bg-gray-800 rounded text-xs">CBE Birr</span>
            <span className="px-3 py-1 bg-gray-800 rounded text-xs">HelloCash</span>
          </div>
        </div>

        {/* ============ Copyright ============ */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>
              © {currentYear} Bright TechMart. All rights reserved.
            </p>
            <p>
              Developed by{' '}
              <span className="text-gray-300 font-medium">Gebreslassie</span>
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/security" className="hover:text-white transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer