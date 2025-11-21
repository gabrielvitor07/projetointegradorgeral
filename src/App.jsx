import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './App.css';

// Import pages
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import MyAddressPage from './pages/MyAddressPage';
import AddAddressPage from './pages/AddAddressPage';
import MyOrdersPage from './pages/MyOrdersPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import AddCardPage from './pages/AddCardPage';
import HomePage from './pages/HomePage';
import FoodDetailsPage from './pages/FoodDetailsPage';
import CartPage from './pages/CartPage';
import NotificationsPage from './pages/NotificationsPage';
import HelpPage from './pages/HelpPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';
import SecurityPage from './pages/SecurityPage';

// Import Dashboard Components
import { ProvedorAutenticacao } from './pages/dashboard/contexts/AuthContext';
import DashboardLayout from './pages/dashboard/components/Layout';
import DashboardHome from './pages/dashboard/pages/Dashboard/Dashboard';
import MaisVendidos from './pages/dashboard/pages/MaisVendidos/MaisVendidos';
import Pedidos from './pages/dashboard/pages/Pedidos/Pedidos';
import Cardapio from './pages/dashboard/pages/Cardapio/Cardapio';
import CriarItem from './pages/dashboard/pages/CriarItem/CriarItem';
import EditarItem from './pages/dashboard/pages/EditarItem/EditarItem';
import Login from './pages/dashboard/pages/Login/Login';
import Loading from './pages/dashboard/pages/Loading/Loading';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Rotas do Aplicativo Principal */}
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

          {/* Rotas do Dashboard */}
          <Route path="/dashboard" element={
            <ProvedorAutenticacao>
              <DashboardLayout>
                <DashboardHome />
              </DashboardLayout>
            </ProvedorAutenticacao>
          } />
          <Route path="/dashboard/mais-vendidos" element={
            <ProvedorAutenticacao>
              <DashboardLayout>
                <MaisVendidos />
              </DashboardLayout>
            </ProvedorAutenticacao>
          } />
          <Route path="/dashboard/pedidos" element={
            <ProvedorAutenticacao>
              <DashboardLayout>
                <Pedidos />
              </DashboardLayout>
            </ProvedorAutenticacao>
          } />
          <Route path="/dashboard/cardapio" element={
            <ProvedorAutenticacao>
              <DashboardLayout>
                <Cardapio />
              </DashboardLayout>
            </ProvedorAutenticacao>
          } />
          <Route path="/dashboard/criar-item" element={
            <ProvedorAutenticacao>
              <DashboardLayout>
                <CriarItem />
              </DashboardLayout>
            </ProvedorAutenticacao>
          } />
          <Route path="/dashboard/editar-item/:id" element={
            <ProvedorAutenticacao>
              <DashboardLayout>
                <EditarItem />
              </DashboardLayout>
            </ProvedorAutenticacao>
          } />
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/dashboard/loading" element={<Loading />} />

          {/* Rota de fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
