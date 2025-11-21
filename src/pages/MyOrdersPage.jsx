import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Package } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function MyOrdersPage() {
  const navigate = useNavigate()
  const { orders } = useApp()
  const [activeTab, setActiveTab] = useState('ongoing')

  const filteredOrders = orders.filter(order => order.status === activeTab)
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Meus pedidos</h1>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginTop: '30px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setActiveTab('ongoing')}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: activeTab === 'ongoing' ? 'var(--primary-color)' : 'var(--gray-light)',
            color: activeTab === 'ongoing' ? 'white' : 'var(--gray-dark)',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Em andamento
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: activeTab === 'history' ? 'var(--primary-color)' : 'var(--gray-light)',
            color: activeTab === 'history' ? 'white' : 'var(--gray-dark)',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Histórico
        </button>
      </div>

      <div>
        {filteredOrders.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            color: 'var(--gray-dark)'
          }}>
            <Package size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <h2 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--dark-color)' }}>
              Nenhum pedido {activeTab === 'ongoing' ? 'em andamento' : 'no histórico'}
            </h2>
            <p style={{ marginBottom: '30px' }}>
              {activeTab === 'ongoing' 
                ? 'Faça seu primeiro pedido!' 
                : 'Seus pedidos anteriores aparecerão aqui'}
            </p>
            {activeTab === 'ongoing' && (
              <button 
                className="btn-primary"
                onClick={() => navigate('/home')}
              >
                VER CARDÁPIO
              </button>
            )}
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="card" style={{ marginBottom: '15px' }}>
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--gray-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: '700', color: 'var(--dark-color)' }}>
                    Pedido #{order.id}
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: 'white',
                    background: order.status === 'ongoing' ? 'var(--primary-color)' : 'var(--gray-dark)',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    {order.status === 'ongoing' ? 'Em andamento' : 'Entregue'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gray-dark)' }}>
                  {formatDate(order.date)}
                </div>
              </div>
              
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '3px' }}>
                      {item.quantity}x {item.name}
                    </div>
                    {item.observations && (
                      <div style={{ fontSize: '12px', color: 'var(--gray-dark)' }}>
                        Obs: {item.observations}
                      </div>
                    )}
                  </div>
                  <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
                    R${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                </div>
              ))}
              
              <div style={{ 
                marginTop: '15px', 
                paddingTop: '15px', 
                borderTop: '1px solid var(--gray-light)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-dark)', marginBottom: '3px' }}>
                      Total do pedido
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--dark-color)' }}>
                      R${order.total.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                </div>
                {order.status === 'ongoing' && (
                  <button 
                    onClick={() => navigate(`/track-order/${order.id}`)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    RASTREAR PEDIDO
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;
