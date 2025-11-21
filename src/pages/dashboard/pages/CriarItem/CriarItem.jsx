import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import './FormItem.css';

function CriarItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    categoria: 'Pizzas',
    descricao: '',
    preco: '',
    disponivel: true,
    imagem: null,
    imagemUrl: ''
  });
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          imagem: file,
          imagemUrl: imageUrl
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleRemoveImage = (e) => {
    e.preventDefault();
    if (formData.imagemUrl) {
      URL.revokeObjectURL(formData.imagemUrl);
    }
    setFormData(prev => ({
      ...prev,
      imagem: null,
      imagemUrl: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Criando FormData para enviar arquivos
    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('categoria', formData.categoria);
    formDataToSend.append('descricao', formData.descricao);
    formDataToSend.append('preco', formData.preco);
    formDataToSend.append('disponivel', formData.disponivel);
    if (formData.imagem) {
      formDataToSend.append('imagem', formData.imagem);
    }
    
    console.log('Novo item criado:', Object.fromEntries(formDataToSend));
    // Aqui você adicionaria a lógica para salvar o item
    // Exemplo: api.salvarItem(formDataToSend).then(...)
    
    // Limpar a URL da imagem após o envio
    if (formData.imagemUrl) {
      URL.revokeObjectURL(formData.imagemUrl);
    }
    
    navigate('/cardapio');
  };

  const handleCancel = () => {
    navigate('/cardapio');
  };

  return (
    <div className="form-item">
      <div className="form-header">
        <h2>Criar Novo Item</h2>
        <p className="form-subtitle">Adicione um novo item ao cardápio</p>
      </div>

      <div className="form-container card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nome">Nome do Item *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: Pizza Margherita"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoria *</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="Pizzas">Pizzas</option>
                <option value="Lanches">Lanches</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Acompanhamentos">Acompanhamentos</option>
                <option value="Sobremesas">Sobremesas</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="descricao">Descrição *</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva os ingredientes e características do item"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço (R$) *</label>
              <input
                type="number"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Imagem do Item</label>
              <div className="image-upload-container">
                {formData.imagemUrl ? (
                  <div className="image-preview">
                    <img src={formData.imagemUrl} alt="Preview" className="preview-image" />
                    <button 
                      type="button" 
                      className="remove-image-btn"
                      onClick={handleRemoveImage}
                      title="Remover imagem"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="upload-area">
                    <FiImage className="upload-icon" size={24} />
                    <span>Clique para fazer upload de uma imagem</span>
                    <span className="file-types">Formatos aceitos: JPG, PNG, WebP</span>
                    <input
                      type="file"
                      name="imagem"
                      ref={fileInputRef}
                      onChange={handleChange}
                      accept="image/jpeg, image/png, image/webp"
                      className="file-input"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="disponivel"
                  checked={formData.disponivel}
                  onChange={handleChange}
                />
                <span>Item disponível para venda</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirm">
              Criar Item
            </button>
          </div>
        </form>
      </div>

      <div className="form-info card">
        <h3>Dicas para criar um item</h3>
        <ul>
          <li>Use um nome claro e descritivo</li>
          <li>Descreva todos os ingredientes principais</li>
          <li>Defina um preço competitivo</li>
          <li>Marque como disponível apenas se tiver estoque</li>
        </ul>
      </div>
    </div>
  );
}

export default CriarItem;