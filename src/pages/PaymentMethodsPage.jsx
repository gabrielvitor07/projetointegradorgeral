import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function PaymentMethodsPage() {
  const navigate = useNavigate()
  const { paymentMethods, deletePaymentMethod } = useApp()

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Métodos de pagamento</h1>
      </div>

      <div style={{ marginTop: '30px' }}>
        {paymentMethods.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray-dark)' }}>
            <CreditCard size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <p>Nenhum cartão cadastrado</p>
          </div>
        ) : (
          paymentMethods.map((card) => (
            <div key={card.id} style={{ position: 'relative', marginBottom: '15px' }}>
              <div className="payment-card">
                <CreditCard className="payment-card-icon" size={40} />
                <div className="payment-card-info">
                  <div className="payment-card-number">
                    **** **** **** {card.number.slice(-4)}
                  </div>
                  <div className="payment-card-name">{card.name}</div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Deseja realmente excluir este cartão?')) {
                      deletePaymentMethod(card.id)
                    }
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.3)',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}

        <button 
          className="btn-primary"
          onClick={() => navigate('/add-card')}
          style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Plus size={20} style={{ marginRight: '10px' }} />
          ADICIONAR NOVO CARTÃO
        </button>
      </div>
    </div>
  );
}

export default PaymentMethodsPage;
