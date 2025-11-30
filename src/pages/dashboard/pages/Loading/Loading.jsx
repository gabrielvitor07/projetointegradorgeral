import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css';
import logo from '../../../../assets/ChatGPT_Image_21_de_nov._de_2025__16_26_58-removebg-preview.png';

function Loading() {
  const navegar = useNavigate();

  useEffect(() => {
    // Redirecionar para login após 2.5 segundos
    const temporizador = setTimeout(() => {
      navegar('/dashboard/login');
    }, 2500);

    return () => clearTimeout(temporizador);
  }, [navegar]);

  return (
    <div className="conteiner-carregamento">
      <div className="conteudo-carregamento">
        <div className="logo-carregamento">
          <img 
            src={logo}
            alt="Logo"
            className="imagem-logo"
          />
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

