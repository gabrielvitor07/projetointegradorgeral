import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cardapio.css';
import { products } from '../../../app/data/products';

function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const categorias = ['Todas', 'Pizzas', 'Lanches', 'Bebidas', 'Acompanhamentos', 'Sobremesas'];

  const formatBRL = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const mapCategoria = (cat) => {
    switch (cat) {
      case 'pizza':
        return 'Pizzas';
      case 'burger':
      case 'sandwich':
        return 'Lanches';
      case 'drink':
        return 'Bebidas';
      default:
        return 'Outros';
    }
  };

  // Usar os produtos do app como fonte única
  const itensCardapio = products.map((p) => ({
    id: p.id,
    nome: p.name,
    categoria: mapCategoria(p.category),
    descricao: p.description,
    preco: formatBRL(p.price),
    disponivel: true,
    imagemUrl: p.image,
  }));

  const itensFiltrados = categoriaAtiva === 'Todas' 
    ? itensCardapio 
    : itensCardapio.filter(item => item.categoria === categoriaAtiva);

  return (
    <div className="cardapio">
      <div className="page-header">
        <div>
          <h2>Cardápio</h2>
          <p className="page-subtitle">Gerencie os itens do seu cardápio</p>
        </div>
        <Link to="/dashboard/criar-item">
          <button className="btn-primary">+ Adicionar Item</button>
        </Link>
      </div>

      <div className="categorias-container">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`categoria-btn ${categoriaAtiva === categoria ? 'active' : ''}`}
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="itens-grid">
        {itensFiltrados.map((item) => (
          <div key={item.id} className={`item-card card ${!item.disponivel ? 'indisponivel' : ''}`}>
            <div className="item-image-container">
              <img 
                src={item.imagemUrl} 
                alt={item.nome} 
                className="item-image"
                onError={(e) => {
                  e.target.src = '/placeholder-food.jpg';
                  e.target.style.objectFit = 'cover';
                }}
              />
            </div>
            <div className="item-content">
              <div className="item-header">
                <h3 className="item-nome">{item.nome}</h3>
                <span className={`disponibilidade ${item.disponivel ? 'disponivel' : 'esgotado'}`}>
                  {item.disponivel ? '✓ Disponível' : '✗ Indisponível'}
                </span>
              </div>
              <p className="item-categoria">{item.categoria}</p>
              <p className="item-descricao">{item.descricao}</p>
            <div className="item-footer">
              <span className="item-preco">{item.preco}</span>
              <div className="item-actions">
                <Link to={`/dashboard/editar-item/${item.id}`}>
                  <button className="btn-edit">Editar</button>
                </Link>
                <button className="btn-delete">Excluir</button>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>

      {itensFiltrados.length === 0 && (
        <div className="empty-state card">
          <p>Nenhum item encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}

export default Cardapio;
