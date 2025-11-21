import React from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { ProvedorAutenticacao, useAutenticacao } from './contexts/AuthContext.jsx';
import RotaProtegida from './components/ProtectedRoute';
import './App.css';
import Loading from './pages/Loading/Loading';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import MaisVendidos from './pages/MaisVendidos/MaisVendidos.jsx';
import Pedidos from './pages/Pedidos/Pedidos.jsx';
import Cardapio from './pages/Cardapio/Cardapio.jsx';
import CriarItem from './pages/CriarItem/CriarItem.jsx';
import EditarItem from './pages/EditarItem/EditarItem.jsx';

// Componente para rotas que redirecionam usuários autenticados
function RotaPublica({ children }) {
  const { estaAutenticado, carregando } = useAutenticacao();

  if (carregando) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--fundo-principal)',
        color: 'var(--texto-principal)'
      }}>
        Carregando...
      </div>
    );
  }

  if (estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Componente que renderiza o layout do dashboard (sidebar + conteúdo)
function LayoutDashboard({ children }) {
  const { sair, usuario } = useAutenticacao();

  return (
    <div className="aplicacao">
      <aside className="menu-lateral">
        <div className="cabecalho-menu">
          <h1 className="titulo-menu">Dashboard</h1>
          <p className="subtitulo-menu">Foodtruck do Sr. Elpidio</p>
        </div>
        
        <nav className="navegacao-menu">
          <NavLink to="/" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`} end>
            <span className="icone-menu">▣</span>
            <span className="texto-menu">Dashboard</span>
          </NavLink>
          <NavLink to="/pedidos" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}>
            <span className="icone-menu">◈</span>
            <span className="texto-menu">Pedidos</span>
          </NavLink>
          <NavLink to="/cardapio" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}>
            <span className="icone-menu">☰</span>
            <span className="texto-menu">Cardápio</span>
          </NavLink>
          <NavLink to="/mais-vendidos" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}>
            <span className="icone-menu">★</span>
            <span className="texto-menu">Mais Vendidos</span>
          </NavLink>
        </nav>

        <div className="rodape-menu">
          {usuario && (
            <div className="usuario-info">
              {usuario.email}
            </div>
          )}
          <button onClick={sair} className="botao-sair">
            Sair
          </button>
        </div>
      </aside>
      
      <main className="conteudo-principal">
        {children}
      </main>
    </div>
  );
}

function RotasAplicacao() {
  return (
    <Routes>
      {/* Rota pública - Loading */}
      <Route path="loading" element={<Loading />} />
      
      {/* Rota pública - Login (redireciona se autenticado) */}
      <Route 
        path="login" 
        element={
          <RotaPublica>
            <Login />
          </RotaPublica>
        } 
      />
      
      {/* Rotas protegidas - Dashboard */}
      <Route
        index
        element={
          <RotaProtegida>
            <LayoutDashboard>
              <Dashboard />
            </LayoutDashboard>
          </RotaProtegida>
        }
      />
      <Route
        path="mais-vendidos"
        element={
          <RotaProtegida>
            <LayoutDashboard>
              <MaisVendidos />
            </LayoutDashboard>
          </RotaProtegida>
        }
      />
      <Route
        path="pedidos"
        element={
          <RotaProtegida>
            <LayoutDashboard>
              <Pedidos />
            </LayoutDashboard>
          </RotaProtegida>
        }
      />
      <Route
        path="cardapio"
        element={
          <RotaProtegida>
            <LayoutDashboard>
              <Cardapio />
            </LayoutDashboard>
          </RotaProtegida>
        }
      />
      <Route
        path="criar-item"
        element={
          <RotaProtegida>
            <LayoutDashboard>
              <CriarItem />
            </LayoutDashboard>
          </RotaProtegida>
        }
      />
      <Route
        path="editar-item/:id"
        element={
          <RotaProtegida>
            <LayoutDashboard>
              <EditarItem />
            </LayoutDashboard>
          </RotaProtegida>
        }
      />
      
      {/* Redirecionar rotas desconhecidas para a página inicial do dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function DashboardApp() {
  return (
    <ProvedorAutenticacao>
      <RotasAplicacao />
    </ProvedorAutenticacao>
  );
}

export default DashboardApp;
