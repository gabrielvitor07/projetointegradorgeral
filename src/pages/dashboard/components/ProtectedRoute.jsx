import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacao } from '../contexts/AuthContext.jsx';

const AUTH_TEMPORARILY_DISABLED = true;

function RotaProtegida({ children }) {
  const { estaAutenticado, carregando } = useAutenticacao();

  if (AUTH_TEMPORARILY_DISABLED) {
    return children;
  }

  // Mostrar loading enquanto verifica autenticação
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

  // Redirecionar para loading se não autenticado (que depois redireciona para login)
  if (!estaAutenticado) {
    return <Navigate to="/dashboard/loading" replace />;
  }

  return children;
}

export default RotaProtegida;

