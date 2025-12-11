import { Link } from 'react-router-dom'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Truck, 
  CreditCard, 
  Headphones,
  FileText,
  CheckCircle,
  Package,
  Clock,
  HelpCircle,
  Smartphone,
  Laptop,
  Gamepad,
  Headphones as HeadphonesIcon,
  Cpu
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info & Social */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Bright TechMart</h3>
            </div>
            <p className="mb-6 text-gray-400">
              Your trusted technology marketplace in Teppi Town, Ethiopia. 
              We bring the latest smartphones, laptops, accessories, and components 
              directly to your doorstep with secure payments and reliable delivery.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
                <Truck className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Free Teppi Delivery</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
                <CheckCircle className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Quality Guarantee</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com/brighttechmart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/brighttechmart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-sky-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://instagram.com/brighttechmart" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:info@brighttechmart.com"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Shop Categories</span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-gray-400" />
                <Link to="/products?category=smartphones" className="hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Laptop className="h-4 w-4 text-gray-400" />
                <Link to="/products?category=laptops" className="hover:text-white transition-colors">
                  Laptops & Computers
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Gamepad className="h-4 w-4 text-gray-400" />
                <Link to="/products?category=gaming" className="hover:text-white transition-colors">
                  Gaming Gear
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <HeadphonesIcon className="h-4 w-4 text-gray-400" />
                <Link to="/products?category=accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Cpu className="h-4 w-4 text-gray-400" />
                <Link to="/products?category=components" className="hover:text-white transition-colors">
                  PC Components
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Headphones className="h-5 w-5" />
              <span>Customer Service</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ & Help Center</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Shipping Information</span>
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Returns & Refunds</span>
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-white transition-colors flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Warranty Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Policies</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-white transition-colors">
                  Security Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-white transition-colors">
                  Accessibility Statement
                </Link>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm">
                  💳 Chapa
                </div>
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm">
                  📱 Telebirr
                </div>
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm">
                  🏦 CBE Birr
                </div>
                <div className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm">
                  💰 HelloCash
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-12 p-6 bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Call Us</p>
                <a href="tel:+251123456789" className="text-lg font-semibold text-white hover:text-primary-400 transition-colors">
                  +251 123 456 789
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email Us</p>
                <a href="mailto:support@brighttechmart.com" className="text-lg font-semibold text-white hover:text-green-400 transition-colors">
                  support@brighttechmart.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Business Hours</p>
                <p className="text-lg font-semibold text-white">8:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8 p-6 bg-gray-800 rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Stay Updated</h4>
              <p className="text-gray-400">Subscribe to our newsletter for the latest tech deals</p>
            </div>
            <form className="flex w-full md:w-auto space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow md:w-64 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear} Bright TechMart. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Teppi Town, SNNPR, Ethiopia
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                Developed by Mizan Tepi University
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Software Engineering Final Year Project
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Link to="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link to="/careers" className="hover:text-white transition-colors">
                Careers
              </Link>
              <Link to="/affiliate" className="hover:text-white transition-colors">
                Affiliate Program
              </Link>
            </div>
          </div>

          {/* University Info */}
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <div className="text-sm text-gray-400">
                In collaboration with
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-white">
                  Mizan Tepi University
                </div>
                <div className="text-sm text-gray-400">
                  School of Computing and Informatics
                </div>
                <div className="text-sm text-gray-400">
                  Department of Software Engineering
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer