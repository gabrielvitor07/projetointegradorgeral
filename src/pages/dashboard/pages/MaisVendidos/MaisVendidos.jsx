import React from 'react';
import './MaisVendidos.css';

function MaisVendidos() {
  const produtosData = [
    { 
      id: 1, 
      nome: 'Pizza Margherita', 
      categoria: 'Pizzas', 
      vendas: 245, 
      receita: 'R$ 6.125,00',
      percentual: 85
    },
    { 
      id: 2, 
      nome: 'Hambúrguer Clássico', 
      categoria: 'Lanches', 
      vendas: 198, 
      receita: 'R$ 3.960,00',
      percentual: 68
    },
    { 
      id: 3, 
      nome: 'Refrigerante 2L', 
      categoria: 'Bebidas', 
      vendas: 312, 
      receita: 'R$ 3.120,00',
      percentual: 92
    },
    { 
      id: 4, 
      nome: 'Pizza Calabresa', 
      categoria: 'Pizzas', 
      vendas: 187, 
      receita: 'R$ 4.675,00',
      percentual: 64
    },
    { 
      id: 5, 
      nome: 'Batata Frita Grande', 
      categoria: 'Acompanhamentos', 
      vendas: 156, 
      receita: 'R$ 2.340,00',
      percentual: 54
    },
    { 
      id: 6, 
      nome: 'Suco Natural', 
      categoria: 'Bebidas', 
      vendas: 143, 
      receita: 'R$ 1.430,00',
      percentual: 49
    },
    { 
      id: 7, 
      nome: 'Pizza Portuguesa', 
      categoria: 'Pizzas', 
      vendas: 134, 
      receita: 'R$ 3.350,00',
      percentual: 46
    },
    { 
      id: 8, 
      nome: 'X-Bacon', 
      categoria: 'Lanches', 
      vendas: 128, 
      receita: 'R$ 2.560,00',
      percentual: 44
    }
  ];

  return (
    <div className="mais-vendidos">
      <div className="page-header">
        <h2>Produtos Mais Vendidos</h2>
        <p className="page-subtitle">Ranking de produtos por volume de vendas</p>
      </div>

      <div className="filters-container card">
        <div className="filter-group">
          <label>Período:</label>
          <select className="filter-select">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
            <option>Este ano</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Categoria:</label>
          <select className="filter-select">
            <option>Todas</option>
            <option>Pizzas</option>
            <option>Lanches</option>
            <option>Bebidas</option>
            <option>Acompanhamentos</option>
          </select>
        </div>
      </div>

      <div className="table-container card">
        <table className="produtos-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Vendas</th>
              <th>Receita</th>
            </tr>
          </thead>
          <tbody>
            {produtosData.map((produto) => (
              <tr key={produto.id}>
                <td className="rank-cell">{produto.id}</td>
                <td className="produto-nome">{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td className="vendas-cell">{produto.vendas}</td>
                <td className="receita-cell">{produto.receita}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-cards">
        <div className="summary-card card">
          <h4>Total de Vendas</h4>
          <p className="summary-value">1.503</p>
          <span className="summary-label">unidades</span>
        </div>
        <div className="summary-card card">
          <h4>Receita Total</h4>
          <p className="summary-value">R$ 27.560,00</p>
          <span className="summary-label">no período</span>
        </div>
      </div>
    </div>
  );
}

export default MaisVendidos;
