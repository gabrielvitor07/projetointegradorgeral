import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import './FormItem.css';

function EditarItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: 'Pizza Margherita',
    categoria: 'Pizzas',
    descricao: 'Molho de tomate, mussarela, tomate fresco e manjericão',
    preco: '45.90',
    disponivel: true,
    imagem: null,
    imagemUrl: '/placeholder-pizza.jpg' // URL da imagem atual ou placeholder
  });
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Libera a URL da imagem anterior se existir
        if (formData.imagemUrl && formData.imagemUrl.startsWith('blob:')) {
          URL.revokeObjectURL(formData.imagemUrl);
        }
        
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({
          ...prev,
          imagem: file,
          imagemUrl: imageUrl,
          imagemRemovida: false
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
      if (formData.imagemUrl.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagemUrl);
      }
      setFormData(prev => ({
        ...prev,
        imagem: null,
        imagemUrl: '',
        imagemRemovida: true
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
    
    // Adiciona a nova imagem se houver
    if (formData.imagem) {
      formDataToSend.append('imagem', formData.imagem);
    }
    
    // Se a imagem foi removida
    if (formData.imagemRemovida) {
      formDataToSend.append('removerImagem', 'true');
    }
    
    console.log('Item atualizado:', Object.fromEntries(formDataToSend));
    // Aqui você adicionaria a lógica para atualizar o item
    // Exemplo: api.atualizarItem(itemId, formDataToSend).then(...)
    
    // Navega de volta para a lista de itens
    navigate('/dashboard/cardapio');
  };
  
  // Limpa a URL da imagem quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (formData.imagemUrl && formData.imagemUrl.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagemUrl);
      }
    };
  }, [formData.imagemUrl]);

  const handleCancel = () => {
    navigate('/dashboard/cardapio');
  };

  return (
    <div className="form-item">
      <div className="form-header">
        <h2>Editar Item</h2>
        <p className="form-subtitle">Atualize as informações do item</p>
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
                  <div className="image-preview-container">
                    <div className="image-preview">
                      <img 
                        src={formData.imagemUrl} 
                        alt="Pré-visualização do item" 
                        className="preview-image" 
                        onError={(e) => {
                          e.target.src = '/placeholder-food.jpg';
                          e.target.style.objectFit = 'cover';
                        }}
                      />
                    </div>
                    <div className="image-actions">
                      <label className="btn-change-image">
                        <FiUpload size={16} />
                        <span>Alterar</span>
                        <input
                          type="file"
                          name="imagem"
                          ref={fileInputRef}
                          onChange={handleChange}
                          accept="image/jpeg, image/png, image/webp"
                          className="file-input"
                        />
                      </label>
                      <button 
                        type="button" 
                        className="btn-remove-image"
                        onClick={handleRemoveImage}
                        aria-label="Remover imagem"
                      >
                        <FiTrash2 size={16} />
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="upload-area">
                    <FiImage className="upload-icon" size={32} />
                    <span>Arraste e solte uma imagem aqui</span>
                    <span className="file-types">ou clique para selecionar (JPG, PNG, WebP)</span>
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      <div className="form-info card">
        <h3>Informações do Item</h3>
        <ul>
          <li><strong>ID:</strong> #001</li>
          <li><strong>Criado em:</strong> 15/10/2025</li>
          <li><strong>Última atualização:</strong> 18/10/2025</li>
          <li><strong>Total de vendas:</strong> 245 unidades</li>
        </ul>
      </div>
    </div>
  );
}

export default EditarItem;
