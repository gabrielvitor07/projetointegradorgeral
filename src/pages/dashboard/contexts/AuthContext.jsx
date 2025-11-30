import React, { createContext, useState, useContext, useEffect } from 'react';

const ContextoAutenticacao = createContext(null);

export const ProvedorAutenticacao = ({ children }) => {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [adminsSecundarios, setAdminsSecundarios] = useState([]);
  const [primaryAdminEmails, setPrimaryAdminEmails] = useState([]);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const autenticacaoArmazenada = localStorage.getItem('estaAutenticado');
    const usuarioArmazenado = localStorage.getItem('usuario');
    const adminsArmazenados = localStorage.getItem('adminsSecundarios');
    const primariesArmazenados = localStorage.getItem('primaryAdminEmails');
    
    // Inicializa arrays
    if (adminsArmazenados) {
      try { setAdminsSecundarios(JSON.parse(adminsArmazenados)); } catch {}
    }
    if (primariesArmazenados) {
      try { setPrimaryAdminEmails(JSON.parse(primariesArmazenados)); } catch {}
    } else {
      // valor padrão: email do admin principal
      const padrao = ['admin@foodtruck.com'];
      setPrimaryAdminEmails(padrao);
      localStorage.setItem('primaryAdminEmails', JSON.stringify(padrao));
    }
    
    const timer = setTimeout(() => {
      if (autenticacaoArmazenada === 'true' && usuarioArmazenado) {
        const u = JSON.parse(usuarioArmazenado);
        setEstaAutenticado(true);
        setUsuario(u);
      }
      setCarregando(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const entrar = async (email, senha) => {
    // Simulação de autenticação (substitua por sua API real)
    // Aqui você pode fazer uma chamada à sua API de autenticação
    
    // Mock de autenticação simples
    if (email && senha) {
      const isPrimary = (primaryAdminEmails || []).includes(email);
      const dadosUsuario = {
        email: email,
        nome: email.split('@')[0], // Nome simples baseado no email
        isPrimaryAdmin: isPrimary
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

  const ehAdminPrincipal = () => {
    return !!usuario?.isPrimaryAdmin;
  };

  const adicionarAdminSecundario = async (novo) => {
    // Validações simples
    const erros = [];
    if (!novo?.nome) erros.push('Nome é obrigatório');
    if (!novo?.email) erros.push('Email é obrigatório');
    if (!novo?.senha || String(novo.senha).length < 6) erros.push('Senha deve ter ao menos 6 caracteres');
    if (!novo?.telefone) erros.push('Telefone é obrigatório');
    if (!novo?.dataNascimento) erros.push('Data de nascimento é obrigatória');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (novo?.email && !regexEmail.test(novo.email)) erros.push('Email inválido');

    if (erros.length) {
      return { success: false, error: erros.join(' | ') };
    }

    const lista = [...adminsSecundarios];
    if (lista.some(a => a.email.toLowerCase() === novo.email.toLowerCase())) {
      return { success: false, error: 'Já existe um admin com este email' };
    }

    const admin = {
      id: Date.now(),
      nome: novo.nome,
      email: novo.email,
      telefone: novo.telefone,
      dataNascimento: novo.dataNascimento,
      // Nunca armazenar senha em texto plano em produção; aqui é apenas simulação
      senha: novo.senha
    };
    lista.push(admin);
    setAdminsSecundarios(lista);
    localStorage.setItem('adminsSecundarios', JSON.stringify(lista));
    return { success: true };
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
      logout: sair,
      adminsSecundarios,
      adicionarAdminSecundario,
      ehAdminPrincipal
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

