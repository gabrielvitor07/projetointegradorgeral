import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacao } from '../../contexts/AuthContext.jsx';
import Loading from '../Loading/Loading';
import './Login.css';

function Login() {
  const navegar = useNavigate();
  const { entrar, estaAutenticado, carregando } = useAutenticacao();
  const [splash, setSplash] = useState(true);
  const [dadosFormulario, setDadosFormulario] = useState({
    email: '',
    senha: ''
  });
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (estaAutenticado) {
      navegar('/dashboard');
    }
  }, [estaAutenticado, navegar]);

  // Mostrar tela de carregamento enquanto verifica estado de autenticação
  if (carregando) {
    return <Loading />;
  }

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (splash) {
    return <Loading />;
  }

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({
      ...dadosFormulario,
      [name]: value
    });
    // Limpar erro ao digitar
    if (erro) {
      setErro('');
    }
  };

  const lidarComEnvio = async (e) => {
    e.preventDefault();
    setErro('');

    // Validação básica
    if (!dadosFormulario.email || !dadosFormulario.senha) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    // Validação de email simples
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(dadosFormulario.email)) {
      setErro('Por favor, insira um email válido');
      return;
    }

    setEnviando(true);

    try {
      const resultado = await entrar(dadosFormulario.email, dadosFormulario.senha);
      
      if (resultado.success) {
        navegar('/dashboard');
      } else {
        setErro(resultado.error || 'Erro ao fazer login. Tente novamente.');
      }
    } catch (erro) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="conteiner-login">
      <div className="conteudo-login">
        <div className="cabecalho-login">
          <h1 className="titulo-login">Dashboard</h1>
          <p className="subtitulo-login">Foodtruck do Sr. Elpidio</p>
        </div>

        <div className="card-login card">
          <h2 className="titulo-formulario-login">Entrar</h2>
          <p className="subtitulo-formulario-login">Acesse sua conta para continuar</p>

          {erro && (
            <div className="erro-login">
              {erro}
            </div>
          )}

          <form onSubmit={lidarComEnvio} className="formulario-login">
            <div className="grupo-formulario">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={dadosFormulario.email}
                onChange={lidarComMudanca}
                placeholder="seu@email.com"
                required
                disabled={enviando}
              />
            </div>

            <div className="grupo-formulario">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={dadosFormulario.senha}
                onChange={lidarComMudanca}
                placeholder="••••••••"
                required
                disabled={enviando}
              />
            </div>

            <button 
              type="submit" 
              className="botao-login"
              disabled={enviando}
            >
              {enviando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

