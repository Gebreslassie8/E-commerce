import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout.tsx";
// for public pages
import HomePage from "./pages/HomePage/HomePage.tsx";
import ProductListingPage from "./pages/ProductPages/ProductListingPage.tsx";
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CartPage from "./pages/CategoriesPage/CartPage.tsx";
import Salespage from "./pages/CategoriesPage/Salespage.tsx";
import ContactPage from "./pages/HomePage/ContactPage.tsx";
import Aboutpage from "./pages/HomePage/Aboutpage.tsx";
// Authentication Pages
import LoginPage from "./pages/auth/Loginpage.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ResetPasswordPage from "./pages/auth/ResetPassword.tsx";

function App() {
  return (
    <>
      <Routes>
        {/* Main app routes with layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="sales" element={<Salespage />} />
        </Route>
        
        {/* Authentication routes WITHOUT MainLayout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Redirect from /auth/login to /login for backward compatibility */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;