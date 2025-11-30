import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AcessoNegado.css';

function AcessoNegado() {
  const navigate = useNavigate();
  return (
    <div className="acesso-negado">
      <div className="card acesso-card">
        <h2>Acesso negado</h2>
        <p>Você não tem permissão para acessar esta página. Apenas o admin principal pode abrir as Configurações.</p>
        <div className="acoes">
          <button className="btn" onClick={() => navigate('/dashboard')}>Ir para o Dashboard</button>
          <button className="btn secundario" onClick={() => navigate('/dashboard/login')}>Trocar usuário</button>
        </div>
      </div>
    </div>
  );
}

export default AcessoNegado;
