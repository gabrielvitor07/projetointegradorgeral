import React from 'react';
import './OrderCard.css';

const STATUS = {
  PENDENTE: 'pendente',
  EM_PREPARO: 'em_preparo',
  PRONTO: 'pronto',
  ENVIADO: 'enviado',
  ENTREGUE: 'entregue',
  CANCELADO: 'cancelado'
};

function OrderCard({ id, status, items, total, onMarcarPreparo, onIniciarPreparo, onCancelar, onFinalizar }) {
  const fmt = (v) => {
    if (typeof v === 'number') {
      return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return v;
  };
  const renderActions = () => {
    if (status === STATUS.CANCELADO) {
      return (
        <div className="order-actions">
          <span className="canceled-text">Pedido Cancelado</span>
        </div>
      );
    }
    
    if (status === STATUS.PENDENTE) {
      return (
        <div className="order-actions">
          <button className="btn action-iniciar" onClick={() => onUpdateStatus(STATUS.EM_PREPARO)}>Iniciar Preparo</button>
          <button className="btn action-cancelar" onClick={() => onCancelar(STATUS.CANCELADO)}>Cancelar</button>
        </div>
      );
    }
    
    if (status === STATUS.EM_PREPARO) {
      return (
        <div className="order-actions">
          <button className="btn action-finalizar-preparo" onClick={() => onUpdateStatus(STATUS.PRONTO)}>Finalizar Preparo</button>
          <button className="btn action-cancelar" onClick={() => onCancelar(STATUS.CANCELADO)}>Cancelar</button>
        </div>
      );
    }
    
    if (status === STATUS.PRONTO) {
      return (
        <div className="order-actions">
          <button className="btn action-enviar" onClick={() => onUpdateStatus(STATUS.ENVIADO)}>Enviar Pedido</button>
          <button className="btn action-cancelar" onClick={() => onCancelar(STATUS.CANCELADO)}>Cancelar</button>
        </div>
      );
    }
    
    if (status === STATUS.ENVIADO) {
      return (
        <div className="order-actions">
          <button className="btn action-confirmar-entrega" onClick={() => onUpdateStatus(STATUS.ENTREGUE)}>Confirmar Entrega</button>
          <button className="btn action-cancelar" onClick={() => onCancelar(STATUS.CANCELADO)}>Cancelar</button>
        </div>
      );
    }
    
    if (status === STATUS.ENTREGUE) {
      return (
        <div className="order-actions">
          <span className="delivered-text">Pedido Entregue</span>
        </div>
      );
    }
    
    return null;
  };

  const formatStatusLabel = () => {
    if (status === STATUS.PENDENTE) return 'Pendente';
    if (status === STATUS.EM_PREPARO) return 'Em Preparo';
    if (status === STATUS.PRONTO) return 'Pronto';
    if (status === STATUS.ENVIADO) return 'Enviado';
    if (status === STATUS.ENTREGUE) return 'Entregue';
    if (status === STATUS.CANCELADO) return 'Cancelado';
  };

  const onUpdateStatus = (newStatus) => {
    if (onFinalizar && newStatus === STATUS.ENTREGUE) {
      onFinalizar();
    } else if (onIniciarPreparo && newStatus === STATUS.EM_ANDAMENTO) {
      onIniciarPreparo();
    } else if (onMarcarPreparo && newStatus === STATUS.PRONTO) {
      onMarcarPreparo();
    } else if (onFinalizar) {
      onFinalizar(newStatus);
    }
  };

  return (
    <div className={`order-card ${status === STATUS.CANCELADO ? 'canceled' : ''}`}>
      <div className="order-card-header">
        <div className="order-id">Pedido {id}</div>
        <span className={`status-badge status-${status}`}>{formatStatusLabel()}</span>
      </div>

      <div className="order-items">
        {items && items.length > 0 ? (
          <ul>
            {items.map((it, idx) => {
              if (typeof it === 'string') {
                return <li key={idx}>{it}</li>;
              }
              const name = it?.name ?? '';
              const price = it?.price ?? null;
              return (
                <li key={idx}>
                  {name}{price != null ? ` — ${fmt(price)}` : ''}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty-items">Sem itens</div>
        )}
      </div>

      <div className="order-footer">
        <div className="order-total">Total: {total}</div>
        {renderActions()}
      </div>
    </div>
  );
}

export { STATUS };
export default OrderCard;
