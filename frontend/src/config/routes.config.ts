import DashboardLayout from '../layouts/DashboardLayout'

// Inside your routes:

{
  path: '/admin',
  element: <DashboardLayout role="admin" />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: 'users', element: <UserManagement /> },
    { path: 'vendors', element: <VendorManagement /> },
    { path: 'products', element: <ProductManagement /> },
    { path: 'orders', element: <OrderManagement /> },
    { path: 'categories', element: <CategoriesPage /> },
    { path: 'analytics', element: <SalesAnalytics /> },
    { path: 'reviews', element: <ReviewsPage /> },
    { path: 'settings', element: <SettingsPage /> },
  ],
},
{
  path: '/vendor',
  element: <DashboardLayout role="vendor" />,
  children: [
    { index: true, element: <VendorDashboard /> },
    { path: 'products', element: <ProductManagement /> },
    { path: 'orders', element: <OrderManagement /> },
    { path: 'inventory', element: <InventoryManagement /> },
    { path: 'reports', element: <SalesReport /> },
    { path: 'reviews', element: <ReviewsPage /> },
    { path: 'settings', element: <SettingsPage /> },
  ],
},
{
  path: '/account',
  element: <DashboardLayout role="customer" />,
  children: [
    { index: true, element: <UserProfile /> },
    { path: 'orders', element: <OrderHistory /> },
    { path: 'wishlist', element: <Wishlist /> },
    { path: 'addresses', element: <AddressBook /> },
    { path: 'profile', element: <UserProfile /> },
    { path: 'settings', element: <SettingsPage /> },
  ],
},