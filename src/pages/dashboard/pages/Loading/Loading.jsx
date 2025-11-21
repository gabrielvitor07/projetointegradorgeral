import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css';

function Loading() {
  const navegar = useNavigate();

  useEffect(() => {
    // Redirecionar para login após 2.5 segundos
    const temporizador = setTimeout(() => {
      navegar('/login');
    }, 2500);

    return () => clearTimeout(temporizador);
  }, [navegar]);

  return (
    <div className="conteiner-carregamento">
      <div className="conteudo-carregamento">
        <div className="logo-carregamento">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="imagem-logo"
            onError={(e) => {
              // Se a imagem não existir, esconde a imagem e mostra o logo estilizado
              e.target.style.display = 'none';
              const alternativa = e.target.parentElement.querySelector('.logo-estilizado');
              if (alternativa) {
                alternativa.style.display = 'flex';
              }
            }}
          />
          <div className="logo-estilizado" style={{ display: 'none' }}>
            <div className="icone-logo">▣</div>
            <h1 className="titulo-logo">Dashboard</h1>
          </div>
        </div>
        <div className="texto-carregamento">
          <p>Bem-vindo</p>
          <p className="subtitulo-carregamento">Foodtruck do Sr. Elpidio</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;

