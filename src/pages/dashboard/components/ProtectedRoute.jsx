import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacao } from '../contexts/AuthContext.jsx';
import Loading from '../pages/Loading/Loading';

const AUTH_TEMPORARILY_DISABLED = false;

function RotaProtegida({ children }) {
  const { estaAutenticado, carregando } = useAutenticacao();

  if (AUTH_TEMPORARILY_DISABLED) {
    return children;
  }

  // Mostrar loading enquanto verifica autenticação
  if (carregando) {
    return <Loading />;
  }

  // Redirecionar para a tela de login da dashboard se não autenticado
  if (!estaAutenticado) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return children;
}

export function RotaAdmin({ children }) {
  const { carregando, estaAutenticado, ehAdminPrincipal } = useAutenticacao();
  if (carregando) return <Loading />;
  if (!estaAutenticado) return <Navigate to="/dashboard/login" replace />;
  if (!ehAdminPrincipal()) return <Navigate to="/dashboard/acesso-negado" replace />;
  return children;
}

export default RotaProtegida;
