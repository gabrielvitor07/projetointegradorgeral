import React from 'react';
import './Dashboard.css';

function PainelControle() {
  const dadosEstatisticas = [
    { titulo: 'Total de Vendas', valor: 'R$ 45.231,89', icone: '$' },
    { titulo: 'Clientes Ativos', valor: '1.234', icone: '●' },
    { titulo: 'Produtos', valor: '89', icone: '▣' }
  ];

  const estatisticasRapidas = [
    { titulo: 'Em Preparo', valor: '8' },
    { titulo: 'Prontos', valor: '5' },
    { titulo: 'Aguardando', valor: '12' }
  ];


  return (
    <div className="painel">
      <div className="cabecalho-painel">
        <h2>Painel Principal</h2>
        <p className="subtitulo-painel">Visão geral do seu negócio</p>
      </div>

      <div className="grade-estatisticas">
        {dadosEstatisticas.map((estatistica, indice) => (
          <div key={indice} className="cartao-estatistica cartao">
            <div className="icone-estatistica">{estatistica.icone}</div>
            <div className="conteudo-estatistica">
              <h3 className="titulo-estatistica">{estatistica.titulo}</h3>
              <p className="valor-estatistica">{estatistica.valor}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grade-painel">
        <div className="container-estatisticas-rapidas cartao" style={{ width: '100%' }}>
          <h3 className="titulo-secao">Estatísticas Rápidas</h3>
          <div className="lista-estatisticas-rapidas">
            {estatisticasRapidas.map((estatistica, indice) => (
              <div key={indice} className="item-estatistica-rapida">
                <h4 className="rotulo-estatistica-rapida">{estatistica.titulo}</h4>
                <p className="valor-estatistica-rapida">{estatistica.valor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="atividades-recentes cartao">
        <h3 className="titulo-secao">Atividades Recentes</h3>
        <div className="lista-atividades">
          <div className="item-atividade">
            <span className="hora-atividade">10:30</span>
            <span className="texto-atividade">Novo pedido #1234 recebido</span>
          </div>
          <div className="item-atividade">
            <span className="hora-atividade">10:15</span>
            <span className="texto-atividade">Pedido #1233 confirmado</span>
          </div>
          <div className="item-atividade">
            <span className="hora-atividade">09:45</span>
            <span className="texto-atividade">Cliente João Silva cadastrado</span>
          </div>
          <div className="item-atividade">
            <span className="hora-atividade">09:30</span>
            <span className="texto-atividade">Produto "Pizza Margherita" atualizado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainelControle;
