import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Public pages
import HomePage from './pages/HomePage/HomePage'
import ProductListingPage from './pages/ProductPages/ProductListingPage'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage'
import CartPage from './pages/CategoriesPage/CartPage'
import Salespage from './pages/CategoriesPage/Salespage'
import ContactPage from './pages/HomePage/ContactPage'
import Aboutpage from './pages/HomePage/Aboutpage'
import TrackOrder from './pages/OrderPages/TrackOrder'
import WishlistPage from './pages/WishlistPage'
// Auth pages
import LoginPage from './pages/auth/Loginpage'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPasswordPage from './pages/auth/ResetPassword'
import RegisterPage from './pages/auth/Registerpage'

// ============ Dashboard pages (adjust names to match yours) ============
// ADMIN
import AdminDashboard from './pages/DashboardPages/AdminDashboard'
import UserManagement from './pages/DashboardPages/UserManagement'
import VendorManagement from './pages/DashboardPages/VendorManagement'

// VENDOR
import VendorDashboard from './pages/DashboardPages/VendorDashboard'

// CUSTOMER
import UserDashboard from './pages/DashboardPages/UserDashboard'
import OrderHistory from './pages/DashboardPages/OrderHistory'

// Shared (optional — remove if you don't have these)
import ProductManagement from './pages/DashboardPages/ProductManagement'
import OrderManagement from './pages/DashboardPages/OrderManagement'
import SettingsPage from './pages/DashboardPages/SettingsPage'

function App() {
  return (
    <>
      <Routes>
        {/* ============ Public site ============ */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="sales" element={<Salespage />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="wishlist" element={<WishlistPage />} />   {/* ← new */}

        </Route>

        {/* ============ Auth (no layout) ============ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* ============ Admin dashboard ============ */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* ============ Vendor dashboard ============ */}
        <Route path="/vendor" element={<DashboardLayout role="vendor" />}>
          <Route index element={<VendorDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* ============ Customer dashboard ============ */}
        <Route path="/account" element={<DashboardLayout role="customer" />}>
          <Route index element={<UserDashboard />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="wishlist" element={<CartPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  )
}

export default App