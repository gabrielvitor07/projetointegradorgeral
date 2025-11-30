import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAutenticacao } from '../contexts/AuthContext';
import '../index.css';
import '../App.css';
import logo from '../../../assets/ChatGPT_Image_21_de_nov._de_2025__16_26_58-removebg-preview.png';

const DashboardLayout = ({ children }) => {
  const { sair, usuario } = useAutenticacao();
  const navigate = useNavigate();
  const content = children ?? <Outlet />;

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '▣', end: true },
    { to: '/dashboard/pedidos', label: 'Pedidos', icon: '◈' },
    { to: '/dashboard/cardapio', label: 'Cardápio', icon: '☰' },
    { to: '/dashboard/mais-vendidos', label: 'Mais Vendidos', icon: '★' },
    { to: '/dashboard/configuracoes', label: 'Configurações', icon: '⚙' },
  ];

  const handleLogout = () => {
    sair();
    navigate('/dashboard/login', { replace: true });
  };

  return (
    <div className="aplicacao">
      <aside className="menu-lateral">
        <div className="cabecalho-menu">
          <img src={logo} alt="Logo oficial" className="logo-menu" />
          <div>
            <h1 className="titulo-menu">Dashboard</h1>
            <p className="subtitulo-menu">Foodtruck do Sr. Elpídio</p>
          </div>
        </div>

        <nav className="navegacao-menu">
          {navItems.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}
            >
              <span className="icone-menu">{icon}</span>
              <span className="texto-menu">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="rodape-menu">
          {usuario && (
            <div className="usuario-info">
              {usuario.email}
            </div>
          )}
          <button onClick={handleLogout} className="botao-sair">
            Sair
          </button>
        </div>
      </aside>

      <main className="conteudo-principal">
        {content}
      </main>
    </div>
  );
};

export default DashboardLayout;
