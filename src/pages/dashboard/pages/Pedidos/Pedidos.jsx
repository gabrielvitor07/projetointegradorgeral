import React, { useMemo, useState } from 'react';
import './Pedidos.css';
import OrderCard, { STATUS } from '../../components/OrderCard';

function Pedidos() {
  const [pedidos, setPedidos] = useState([
    { id: '001', status: STATUS.PENDENTE, items: [
      { name: 'X-Tudo Tradicional', price: 14.00 },
      { name: 'Suco de Laranja', price: 4.00 }
    ], total: 'R$ 18,00' },
    { id: '002', status: STATUS.EM_PREPARO, items: [
      { name: 'Hot Dog Premium', price: 22.50 }
    ], total: 'R$ 22,50' },
    { id: '003', status: STATUS.PRONTO, items: [
      { name: 'Batata Frita', price: 9.90 },
      { name: 'Refrigerante', price: 6.00 }
    ], total: 'R$ 15,90' },
    { id: '004', status: STATUS.ENVIADO, items: [
      { name: 'X-Salada', price: 10.00 },
      { name: 'Água', price: 2.00 }
    ], total: 'R$ 12,00' },
    { id: '005', status: STATUS.ENTREGUE, items: [
      { name: 'X-Bacon', price: 19.90 }
    ], total: 'R$ 19,90' },
    { id: '006', status: STATUS.CANCELADO, items: [
      { name: 'Combo Kids', price: 25.00 }
    ], total: 'R$ 25,00', canceledAt: new Date().toISOString() }
  ]);

  const [filter, setFilter] = useState('todos');

  const counts = useMemo(() => ({
    todos: pedidos.length,
    pendente: pedidos.filter(p => p.status === STATUS.PENDENTE).length,
    em_preparo: pedidos.filter(p => p.status === STATUS.EM_PREPARO).length,
    pronto: pedidos.filter(p => p.status === STATUS.PRONTO).length,
    enviado: pedidos.filter(p => p.status === STATUS.ENVIADO).length,
    entregue: pedidos.filter(p => p.status === STATUS.ENTREGUE).length,
    cancelado: pedidos.filter(p => p.status === STATUS.CANCELADO).length,
  }), [pedidos]);

  const filtered = useMemo(() => (
    filter === 'todos' ? pedidos : pedidos.filter(p => p.status === filter)
  ), [filter, pedidos]);

  const updateStatus = (id, nextStatus) => {
    setPedidos(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, status: nextStatus };
        // Adiciona timestamp para status importantes
        if (nextStatus === STATUS.ENVIADO_PARA_ENTREGA) {
          updated.enviadoEm = new Date().toISOString();
        } else if (nextStatus === STATUS.ENTREGUE) {
          updated.entregueEm = new Date().toISOString();
        }
        return updated;
      }
      return p;
    }));
  };

  const handleCancelOrder = (id, status) => {
    setPedidos(prev => prev.map(p => 
      p.id === id ? { ...p, status, canceledAt: new Date().toISOString() } : p
    ));
  };

  return (
    <div className="pedidos">
      <div className="page-header">
        <h2>Gestão de Pedidos</h2>
        <p className="page-subtitle">Acompanhe e gerencie todos os pedidos</p>
      </div>

      <div className="status-filters">
        <button className={`filter-btn ${filter === 'todos' ? 'active' : ''}`} onClick={() => setFilter('todos')}>
          Todos ({counts.todos})
        </button>
        <button className={`filter-btn ${filter === STATUS.PENDENTE ? 'active' : ''}`} onClick={() => setFilter(STATUS.PENDENTE)}>
          Pendente ({counts.pendente})
        </button>
        <button className={`filter-btn ${filter === STATUS.EM_PREPARO ? 'active' : ''}`} onClick={() => setFilter(STATUS.EM_PREPARO)}>
          Em Preparo ({counts.em_preparo})
        </button>
        <button className={`filter-btn ${filter === STATUS.PRONTO ? 'active' : ''}`} onClick={() => setFilter(STATUS.PRONTO)}>
          Pronto ({counts.pronto})
        </button>
        <button className={`filter-btn ${filter === STATUS.ENVIADO ? 'active' : ''}`} onClick={() => setFilter(STATUS.ENVIADO)}>
          Enviado ({counts.enviado})
        </button>
        <button className={`filter-btn ${filter === STATUS.ENTREGUE ? 'active' : ''}`} onClick={() => setFilter(STATUS.ENTREGUE)}>
          Entregue ({counts.entregue})
        </button>
        <button className={`filter-btn ${filter === STATUS.CANCELADO ? 'active' : ''}`} onClick={() => setFilter(STATUS.CANCELADO)}>
          Cancelados ({counts.cancelado})
        </button>
      </div>

      <div className="orders-grid">
        {filtered.map(p => (
          <OrderCard
            key={p.id}
            id={p.id}
            status={p.status}
            items={p.items}
            total={p.total}
            onMarcarPreparo={() => updateStatus(p.id, STATUS.PRONTO)}
            onIniciarPreparo={() => updateStatus(p.id, STATUS.EM_PREPARO)}
            onFinalizar={(status) => updateStatus(p.id, status || STATUS.ENTREGUE)}
            onCancelar={handleCancelOrder}
          />
        ))}
      </div>

    </div>
  );
}

export default Pedidos;
