import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  ShoppingBag,
  BarChart3,
  Tag,
  MessageSquare,
  Settings,
  Boxes,
  Star,
  Heart,
  MapPin,
  User,
  LucideIcon,
} from 'lucide-react'

export type UserRole = 'admin' | 'vendor' | 'customer'

export interface SidebarItem {
  path: string
  label: string
  icon: LucideIcon
  badge?: number
  end?: boolean
}

export const SIDEBAR_CONFIG: Record<UserRole, {
  title: string
  accent: 'blue' | 'green' | 'purple'
  items: SidebarItem[]
}> = {
  // ============================
  // ADMIN
  // ============================
  admin: {
    title: 'Admin Panel',
    accent: 'blue',
    items: [
      { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { path: '/admin/users', label: 'Users', icon: Users },
      { path: '/admin/vendors', label: 'Vendors', icon: Store },
      { path: '/admin/products', label: 'Products', icon: Package },
      { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
      { path: '/admin/categories', label: 'Categories', icon: Tag },
      { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      { path: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
      { path: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },

  // ============================
  // VENDOR / SELLER
  // ============================
  vendor: {
    title: 'Seller Hub',
    accent: 'green',
    items: [
      { path: '/vendor', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { path: '/vendor/products', label: 'My Products', icon: Package },
      { path: '/vendor/orders', label: 'Orders', icon: ShoppingBag, badge: 3 },
      { path: '/vendor/inventory', label: 'Inventory', icon: Boxes },
      { path: '/vendor/reports', label: 'Sales Reports', icon: BarChart3 },
      { path: '/vendor/reviews', label: 'Reviews', icon: Star },
      { path: '/vendor/settings', label: 'Settings', icon: Settings },
    ],
  },

  // ============================
  // CUSTOMER
  // ============================
  customer: {
    title: 'My Account',
    accent: 'purple',
    items: [
      { path: '/account', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { path: '/account/orders', label: 'My Orders', icon: ShoppingBag },
      { path: '/account/wishlist', label: 'Wishlist', icon: Heart },
      { path: '/account/addresses', label: 'Addresses', icon: MapPin },
      { path: '/account/profile', label: 'Profile', icon: User },
      { path: '/account/settings', label: 'Settings', icon: Settings },
    ],
  },
}