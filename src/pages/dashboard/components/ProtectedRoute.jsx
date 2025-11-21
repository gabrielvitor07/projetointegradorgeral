import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacao } from '../contexts/AuthContext.jsx';

function RotaProtegida({ children }) {
  const { estaAutenticado, carregando } = useAutenticacao();

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
    return <Navigate to="/loading" replace />;
  }

  return children;
}

export default RotaProtegida;

