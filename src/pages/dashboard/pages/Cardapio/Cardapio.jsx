import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cardapio.css';

function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const categorias = ['Todas', 'Pizzas', 'Lanches', 'Bebidas', 'Acompanhamentos', 'Sobremesas'];

  const itensCardapio = [
    {
      id: 1,
      nome: 'Pizza Margherita',
      categoria: 'Pizzas',
      descricao: 'Molho de tomate, mussarela, tomate fresco e manjericão',
      preco: 'R$ 45,90',
      disponivel: true,
      imagemUrl: '/pizza-margherita.jpg'
    },
    {
      id: 2,
      nome: 'Pizza Calabresa',
      categoria: 'Pizzas',
      descricao: 'Molho de tomate, mussarela, calabresa e cebola',
      preco: 'R$ 48,90',
      disponivel: true,
      imagemUrl: '/pizza-calabresa.jpg'
    },
    {
      id: 3,
      nome: 'Pizza Portuguesa',
      categoria: 'Pizzas',
      descricao: 'Molho de tomate, mussarela, presunto, ovos, cebola e azeitonas',
      preco: 'R$ 52,90',
      disponivel: true,
      imagemUrl: '/pizza-portuguesa.jpg'
    },
    {
      id: 4,
      nome: 'Hambúrguer Clássico',
      categoria: 'Lanches',
      descricao: 'Pão, hambúrguer 180g, queijo, alface, tomate e molho especial',
      preco: 'R$ 28,90',
      disponivel: true,
      imagemUrl: '/hamburguer-classico.jpg'
    },
    {
      id: 5,
      nome: 'X-Bacon',
      categoria: 'Lanches',
      descricao: 'Pão, hambúrguer 180g, queijo, bacon, alface, tomate e molho',
      preco: 'R$ 32,90',
      disponivel: true,
      imagemUrl: '/x-bacon.jpg'
    },
    {
      id: 6,
      nome: 'X-Tudo',
      categoria: 'Lanches',
      descricao: 'Pão, 2 hambúrgueres, queijo, bacon, ovo, presunto, alface e tomate',
      preco: 'R$ 38,90',
      disponivel: false,
      imagemUrl: '/x-tudo.jpg'
    },
    {
      id: 7,
      nome: 'Refrigerante 2L',
      categoria: 'Bebidas',
      descricao: 'Coca-Cola, Guaraná ou Fanta',
      preco: 'R$ 12,90',
      disponivel: true,
      imagemUrl: '/refrigerante.jpg'
    },
    {
      id: 8,
      nome: 'Suco Natural',
      categoria: 'Bebidas',
      descricao: 'Laranja, limão, morango ou abacaxi - 500ml',
      preco: 'R$ 10,90',
      disponivel: true,
      imagemUrl: '/suco-natural.jpg'
    },
    {
      id: 9,
      nome: 'Batata Frita Grande',
      categoria: 'Acompanhamentos',
      descricao: 'Porção de batata frita crocante - 400g',
      preco: 'R$ 18,90',
      disponivel: true,
      imagemUrl: '/batata-frita.jpg'
    },
    {
      id: 10,
      nome: 'Onion Rings',
      categoria: 'Acompanhamentos',
      descricao: 'Anéis de cebola empanados - 300g',
      preco: 'R$ 16,90',
      disponivel: true,
      imagemUrl: '/onion-rings.jpg'
    },
    {
      id: 11,
      nome: 'Brownie',
      categoria: 'Sobremesas',
      descricao: 'Brownie de chocolate com sorvete',
      preco: 'R$ 14,90',
      disponivel: true,
      imagemUrl: '/brownie.jpg'
    },
    {
      id: 12,
      nome: 'Petit Gateau',
      categoria: 'Sobremesas',
      descricao: 'Bolinho de chocolate com recheio cremoso e sorvete',
      preco: 'R$ 18,90',
      disponivel: true,
      imagemUrl: '/petit-gateau.jpg'
    }
  ];

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
        <Link to="/criar-item">
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
                <Link to={`/editar-item/${item.id}`}>
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
