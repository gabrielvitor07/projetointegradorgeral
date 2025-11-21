import React, { createContext, useState, useContext, useEffect } from 'react';

const ContextoAutenticacao = createContext(null);

export const ProvedorAutenticacao = ({ children }) => {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState(null);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const autenticacaoArmazenada = localStorage.getItem('estaAutenticado');
    const usuarioArmazenado = localStorage.getItem('usuario');
    
    if (autenticacaoArmazenada === 'true' && usuarioArmazenado) {
      setEstaAutenticado(true);
      setUsuario(JSON.parse(usuarioArmazenado));
    }
    
    setCarregando(false);
  }, []);

  const entrar = async (email, senha) => {
    // Simulação de autenticação (substitua por sua API real)
    // Aqui você pode fazer uma chamada à sua API de autenticação
    
    // Mock de autenticação simples
    if (email && senha) {
      const dadosUsuario = {
        email: email,
        nome: email.split('@')[0] // Nome simples baseado no email
      };
      
      setEstaAutenticado(true);
      setUsuario(dadosUsuario);
      localStorage.setItem('estaAutenticado', 'true');
      localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
      
      return { success: true };
    }
    
    return { success: false, error: 'Email e senha são obrigatórios' };
  };

  const sair = () => {
    setEstaAutenticado(false);
    setUsuario(null);
    localStorage.removeItem('estaAutenticado');
    localStorage.removeItem('usuario');
  };

  return (
    <ContextoAutenticacao.Provider value={{ 
      estaAutenticado, 
      isAuthenticated: estaAutenticado, 
      carregando, 
      isLoading: carregando, 
      usuario, 
      user: usuario, 
      entrar,
      login: entrar, 
      sair,
      logout: sair 
    }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};

export const useAutenticacao = () => {
  const contexto = useContext(ContextoAutenticacao);
  if (!contexto) {
    throw new Error('useAutenticacao deve ser usado dentro de um ProvedorAutenticacao');
  }
  return contexto;
};

// Mantendo compatibilidade com nomes em inglês
export const AuthProvider = ProvedorAutenticacao;
export const useAuth = useAutenticacao;

