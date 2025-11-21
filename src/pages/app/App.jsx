import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import './App.css';

// Import pages
import SplashPage from './pages/SplashPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import EditProfilePage from './pages/EditProfilePage.jsx'
import MyAddressPage from './pages/MyAddressPage.jsx'
import AddAddressPage from './pages/AddAddressPage.jsx'
import MyOrdersPage from './pages/MyOrdersPage.jsx'
import PaymentMethodsPage from './pages/PaymentMethodsPage.jsx'
import AddCardPage from './pages/AddCardPage.jsx'
import HomePage from './pages/HomePage.jsx'
import FoodDetailsPage from './pages/FoodDetailsPage.jsx'
import CartPage from './pages/CartPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import HelpPage from './pages/HelpPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import TrackOrderPage from './pages/TrackOrderPage.jsx'
import SecurityPage from './pages/SecurityPage.jsx'

function AppRoutes() {
  return (
    <AppProvider>
      <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/my-address" element={<MyAddressPage />} />
            <Route path="/add-address" element={<AddAddressPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/payment-methods" element={<PaymentMethodsPage />} />
            <Route path="/add-card" element={<AddCardPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/food/:id" element={<FoodDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/track-order/:orderId" element={<TrackOrderPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}

export default AppRoutes;
