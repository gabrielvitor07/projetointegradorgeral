import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacao } from '../../contexts/AuthContext';
import './Configuracoes.css';

function Configuracoes() {
  const navigate = useNavigate();
  const { adicionarAdminSecundario } = useAutenticacao();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    dataNascimento: ''
  });
  const [status, setStatus] = useState({ tipo: '', mensagem: '' });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (status.tipo) setStatus({ tipo: '', mensagem: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setStatus({ tipo: '', mensagem: '' });
    try {
      const res = await adicionarAdminSecundario(form);
      if (res.success) {
        setStatus({ tipo: 'sucesso', mensagem: 'Admin secundário adicionado com sucesso.' });
        setForm({ nome: '', email: '', senha: '', telefone: '', dataNascimento: '' });
      } else {
        setStatus({ tipo: 'erro', mensagem: res.error || 'Erro ao salvar admin.' });
      }
    } catch (err) {
      setStatus({ tipo: 'erro', mensagem: 'Erro inesperado ao salvar admin.' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="config-page">
      <div className="page-header">
        <div>
          <h2>Configurações</h2>
          <p className="page-subtitle">Gerenciar administradores secundários</p>
        </div>
      </div>

      <div className="card config-card">
        <form onSubmit={handleSubmit} className="config-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nome">Nome completo *</label>
              <input id="nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: João da Silva" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="admin@email.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha (mín. 6) *</label>
              <input id="senha" type="password" name="senha" value={form.senha} onChange={handleChange} placeholder="••••••" minLength={6} required />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone *</label>
              <input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" required />
            </div>
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de nascimento *</label>
              <input id="dataNascimento" type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required />
            </div>
          </div>

          {status.tipo && (
            <div className={`alert ${status.tipo === 'erro' ? 'alert-error' : 'alert-success'}`}>
              {status.mensagem}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)} disabled={enviando}>
              Voltar
            </button>
            <button type="submit" className="btn-confirm" disabled={enviando}>
              {enviando ? 'Salvando...' : 'Adicionar Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Configuracoes;
