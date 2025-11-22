import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import SplashPage from '../pages/SplashPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import MyAddressPage from '../pages/MyAddressPage';
import AddAddressPage from '../pages/AddAddressPage';
import MyOrdersPage from '../pages/MyOrdersPage';
import PaymentMethodsPage from '../pages/PaymentMethodsPage';
import AddCardPage from '../pages/AddCardPage';
import HomePage from '../pages/HomePage';
import FoodDetailsPage from '../pages/FoodDetailsPage';
import CartPage from '../pages/CartPage';
import NotificationsPage from '../pages/NotificationsPage';
import HelpPage from '../pages/HelpPage';
import CheckoutPage from '../pages/CheckoutPage';
import TrackOrderPage from '../pages/TrackOrderPage';
import SecurityPage from '../pages/SecurityPage';

const MainRoutes = () => (
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
);

export default MainRoutes;
