import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Heart, 
  X,
  ArrowRight,
  Shield,
  Truck,
  RefreshCw,
  CreditCard,
  Lock,
  Tag,
  Percent,
  Package,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ShoppingBag,
  Gift,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  maxQuantity: number;
  inStock: boolean;
  color?: string;
  size?: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  discount?: number;
  isWishlisted: boolean;
  estimatedDelivery: string;
  shippingCost: number;
  freeShipping: boolean;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount: number;
  description: string;
  expires?: string;
}

const CartPage: React.FC = () => {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      quantity: 1,
      maxQuantity: 5,
      inStock: true,
      color: 'Black',
      category: 'Electronics',
      brand: 'AudioPro',
      rating: 4.5,
      reviews: 1254,
      discount: 35,
      isWishlisted: true,
      estimatedDelivery: '2-3 business days',
      shippingCost: 5.99,
      freeShipping: false
    },
    {
      id: '2',
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      quantity: 2,
      maxQuantity: 10,
      inStock: true,
      color: 'White',
      size: 'M',
      category: 'Fashion',
      brand: 'UrbanWear',
      rating: 4.2,
      reviews: 893,
      isWishlisted: false,
      estimatedDelivery: '3-5 business days',
      shippingCost: 0,
      freeShipping: true
    },
    {
      id: '3',
      name: 'Smart Watch Series 5',
      price: 349.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      quantity: 1,
      maxQuantity: 3,
      inStock: true,
      color: 'Silver',
      category: 'Electronics',
      brand: 'TechWear',
      rating: 4.8,
      reviews: 2341,
      discount: 12,
      isWishlisted: true,
      estimatedDelivery: '1-2 business days',
      shippingCost: 0,
      freeShipping: true
    },
    {
      id: '4',
      name: 'Professional Camera Lens',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
      quantity: 1,
      maxQuantity: 2,
      inStock: false,
      color: 'Black',
      category: 'Photography',
      brand: 'LensPro',
      rating: 4.9,
      reviews: 567,
      isWishlisted: false,
      estimatedDelivery: 'Out of stock',
      shippingCost: 12.99,
      freeShipping: false
    }
  ]);

  const [promoCodes] = useState<PromoCode[]>([
    { code: 'SAVE20', discount: 20, type: 'percentage', minAmount: 100, description: '20% off on orders above $100' },
    { code: 'FREESHIP', discount: 0, type: 'fixed', minAmount: 50, description: 'Free shipping on orders above $50' },
    { code: 'WELCOME10', discount: 10, type: 'percentage', minAmount: 30, description: '10% off for new customers' },
    { code: 'FLASH25', discount: 25, type: 'percentage', minAmount: 150, description: '25% flash sale' }
  ]);

  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoInput, setPromoInput] = useState<string>('');
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [showPromoInput, setShowPromoInput] = useState<boolean>(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Calculate total discount from original prices
    const totalDiscount = cartItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + ((item.originalPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);

    // Calculate shipping
    const shippingTotal = cartItems.reduce((sum, item) => {
      if (item.freeShipping) return sum;
      return sum + item.shippingCost;
    }, 0);

    // Calculate promo discount
    let promoDiscount = 0;
    const selectedPromo = promoCodes.find(p => p.code === appliedPromo);
    if (selectedPromo) {
      if (selectedPromo.type === 'percentage') {
        promoDiscount = (subtotal * selectedPromo.discount) / 100;
      } else {
        promoDiscount = selectedPromo.discount;
      }
    }

    const total = subtotal + shippingTotal - promoDiscount;
    
    return {
      subtotal,
      totalItems,
      totalDiscount,
      shippingTotal,
      promoDiscount,
      total,
      isEligibleForFreeShipping: subtotal >= 50 && shippingTotal > 0
    };
  };

  const totals = calculateTotals();

  // Handlers
  const handleQuantityChange = (id: string, action: 'increase' | 'decrease') => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = action === 'increase' 
          ? Math.min(item.quantity + 1, item.maxQuantity)
          : Math.max(item.quantity - 1, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setRemovingItemId(id);
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => item.id !== id));
      setRemovingItemId(null);
    }, 300);
  };

  const handleToggleWishlist = (id: string) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, isWishlisted: !item.isWishlisted } : item
    ));
  };

  const handleApplyPromo = () => {
    const promo = promoCodes.find(p => p.code === promoInput.toUpperCase());
    if (promo) {
      if (totals.subtotal >= promo.minAmount) {
        setAppliedPromo(promo.code);
        setPromoInput('');
        setShowPromoInput(false);
      }
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
  };

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days', icon: Truck },
    { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days', icon: Zap },
    { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: 'Next business day', icon: Sparkles }
  ];

  const savedAmount = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-sm text-gray-600">{totals.totalItems} items</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl font-bold text-gray-900">
                ${totals.total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <div className="flex items-center gap-4">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Save for Later ({cartItems.filter(i => i.isWishlisted).length})
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                    Clear Cart
                  </button>
                </div>
              </div>

              {savedAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-green-600" />
                    <div>
                      <span className="font-semibold text-green-800">
                        You saved ${savedAmount.toFixed(2)}
                      </span>
                      <span className="text-green-600 ml-2">with special discounts!</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Cart Items */}
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
                >
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some items to get started!</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Start Shopping
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                        removingItemId === item.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div className="relative">
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {item.discount && (
                              <div className="absolute -top-2 -right-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                -{item.discount}%
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {item.brand}
                                  </span>
                                  <span className="text-sm text-gray-500">{item.category}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {item.name}
                                </h3>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                  {item.color && (
                                    <div className="flex items-center gap-1">
                                      <div 
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: item.color.toLowerCase() }}
                                      />
                                      <span>{item.color}</span>
                                    </div>
                                  )}
                                  {item.size && (
                                    <span>Size: {item.size}</span>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span>{item.rating}</span>
                                    <span className="text-gray-400">({item.reviews})</span>
                                  </div>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center gap-2 mb-4">
                                  {item.inStock ? (
                                    <div className="flex items-center gap-1 text-green-600">
                                      <CheckCircle className="h-4 w-4" />
                                      <span className="text-sm font-medium">In Stock</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1 text-red-600">
                                      <AlertCircle className="h-4 w-4" />
                                      <span className="text-sm font-medium">Out of Stock</span>
                                    </div>
                                  )}
                                  <span className="text-sm text-gray-500">
                                    • Delivery: {item.estimatedDelivery}
                                  </span>
                                </div>
                              </div>

                              {/* Price & Actions */}
                              <div className="text-right">
                                <div className="mb-2">
                                  {item.originalPrice && (
                                    <div className="text-sm text-gray-500 line-through">
                                      ${item.originalPrice.toFixed(2)}
                                    </div>
                                  )}
                                  <div className="text-xl font-bold text-gray-900">
                                    ${item.price.toFixed(2)}
                                  </div>
                                </div>
                                <div className="text-sm font-semibold text-green-600 mb-4">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>

                            {/* Quantity Controls & Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                                    disabled={item.quantity <= 1}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="w-12 text-center font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleQuantityChange(item.id, 'increase')}
                                    disabled={item.quantity >= item.maxQuantity}
                                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                                <span className="text-sm text-gray-500">
                                  Max: {item.maxQuantity}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleToggleWishlist(item.id)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    item.isWishlisted
                                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  <Heart className={`h-5 w-5 ${item.isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Recommended Products */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Frequently bought together
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Headphone Case', price: 19.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop' },
                      { name: 'USB-C Cable', price: 12.99, image: 'https://images.unsplash.com/photo-1585208798174-7afe72dc0fbb?w=200&h=200&fit=crop' },
                      { name: 'Screen Protector', price: 8.99, image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=200&fit=crop' }
                    ].map((product, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm font-semibold text-gray-900">${product.price}</div>
                        </div>
                        <button className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors">
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 sticky top-6"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totals.totalItems} items)</span>
                    <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                  </div>

                  {totals.totalDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Items Discount</span>
                      <span className="font-medium">-${totals.totalDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Promo Code */}
                  <div className="pt-4 border-t border-gray-200">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">{appliedPromo}</span>
                          <span className="text-sm text-green-600">Applied</span>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : showPromoInput ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="Enter promo code"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <button
                            onClick={handleApplyPromo}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        <button
                          onClick={() => setShowPromoInput(false)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPromoInput(true)}
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <Tag className="h-4 w-4" />
                        Add promo code
                      </button>
                    )}
                  </div>

                  {/* Available Promos */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Available Offers:</p>
                    {promoCodes.map((promo, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">{promo.code}</code>
                        <span>{promo.description}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Options */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">Shipping Method</h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <label
                            key={option.id}
                            className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                              selectedShipping === option.id
                                ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                checked={selectedShipping === option.id}
                                onChange={(e) => setSelectedShipping(e.target.value)}
                                className="h-4 w-4 text-primary-600"
                              />
                              <Icon className="h-5 w-5 text-gray-500" />
                              <div>
                                <div className="font-medium text-gray-900">{option.name}</div>
                                <div className="text-sm text-gray-500">{option.days}</div>
                              </div>
                            </div>
                            <div className="font-semibold text-gray-900">
                              {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shipping Calculation */}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {totals.shippingTotal === 0 ? 'Free' : `$${totals.shippingTotal.toFixed(2)}`}
                    </span>
                  </div>

                  {totals.isEligibleForFreeShipping && totals.shippingTotal > 0 && (
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-blue-600" />
                        <div className="text-sm text-blue-700">
                          Add ${(50 - totals.subtotal).toFixed(2)} more for <span className="font-semibold">FREE shipping</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {totals.promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span className="font-medium">-${totals.promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Lock className="h-5 w-5" />
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    By completing your purchase, you agree to our Terms of Service
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Security & Trust */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Secure Checkout</h3>
                    <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Options</h3>
                    <p className="text-sm text-gray-600">All major cards & digital wallets</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Need Help */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our customer support team is available 24/7 to assist you.
              </p>
              <button className="w-full py-2.5 border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors">
                Contact Support
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Save for Later */}
      {cartItems.filter(i => i.isWishlisted).length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Saved for Later ({cartItems.filter(i => i.isWishlisted).length} items)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cartItems.filter(i => i.isWishlisted).map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</div>
                    <div className="font-semibold text-gray-900">${item.price.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;