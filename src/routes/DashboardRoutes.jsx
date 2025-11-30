import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProvedorAutenticacao, useAutenticacao } from '../pages/dashboard/contexts/AuthContext';
import RotaProtegida, { RotaAdmin } from '../pages/dashboard/components/ProtectedRoute';
import DashboardLayout from '../pages/dashboard/components/Layout';
import Loading from '../pages/dashboard/pages/Loading/Loading';
import Login from '../pages/dashboard/pages/Login/Login';
import DashboardHome from '../pages/dashboard/pages/Dashboard/Dashboard';
import MaisVendidos from '../pages/dashboard/pages/MaisVendidos/MaisVendidos';
import Pedidos from '../pages/dashboard/pages/Pedidos/Pedidos';
import Cardapio from '../pages/dashboard/pages/Cardapio/Cardapio';
import CriarItem from '../pages/dashboard/pages/CriarItem/CriarItem';
import EditarItem from '../pages/dashboard/pages/EditarItem/EditarItem';
import Configuracoes from '../pages/dashboard/pages/Configuracoes/Configuracoes';
import AcessoNegado from '../pages/dashboard/pages/AcessoNegado/AcessoNegado';

function RotaPublica({ children }) {
  const { estaAutenticado, carregando } = useAutenticacao();

  if (carregando) {
    return <Loading />;
  }

  if (estaAutenticado) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

const DashboardRoutes = () => (
  <ProvedorAutenticacao>
    <Routes>
      <Route path="loading" element={<Loading />} />
      <Route
        path="login"
        element={(
          <RotaPublica>
            <Login />
          </RotaPublica>
        )}
      />

      <Route
        element={(
          <RotaProtegida>
            <DashboardLayout />
          </RotaProtegida>
        )}
      >
        <Route index element={<DashboardHome />} />
        <Route path="mais-vendidos" element={<MaisVendidos />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="cardapio" element={<Cardapio />} />
        <Route path="criar-item" element={<CriarItem />} />
        <Route path="editar-item/:id" element={<EditarItem />} />
        <Route path="acesso-negado" element={<AcessoNegado />} />
        <Route
          path="configuracoes"
          element={(
            <RotaAdmin>
              <Configuracoes />
            </RotaAdmin>
          )}
        />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </ProvedorAutenticacao>
);

export default DashboardRoutes;
