import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function CartPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateCartItem, getCartTotal, getCartCount } = useApp()

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1>Carrinho</h1>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--gray-dark)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
          <h2 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--dark-color)' }}>
            Seu carrinho está vazio
          </h2>
          <p style={{ marginBottom: '30px' }}>
            Adicione itens deliciosos ao seu carrinho!
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/home')}
          >
            VER CARDÁPIO
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingBottom: '150px' }}>
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Carrinho ({getCartCount()})</h1>
      </div>

      <div style={{ marginTop: '30px' }}>
        {cart.map(item => (
          <div key={item.id} className="card" style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '10px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--dark-color)',
                  marginBottom: '5px'
                }}>
                  {item.name}
                </div>
                {item.observations && (
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--gray-dark)',
                    marginBottom: '10px'
                  }}>
                    Obs: {item.observations}
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'var(--primary-color)'
                  }}>
                    R${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        border: '1px solid var(--gray-medium)',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'var(--primary-color)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gray-dark)',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed bottom bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        background: 'white',
        padding: '20px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
          fontSize: '16px'
        }}>
          <span style={{ color: 'var(--gray-dark)' }}>Subtotal:</span>
          <span style={{ fontWeight: '700', color: 'var(--dark-color)' }}>
            R${getCartTotal().toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
          fontSize: '16px'
        }}>
          <span style={{ color: 'var(--gray-dark)' }}>Taxa de entrega:</span>
          <span style={{ fontWeight: '700', color: 'var(--dark-color)' }}>
            R$5,00
          </span>
        </div>
        <div style={{
          borderTop: '1px solid var(--gray-medium)',
          paddingTop: '15px',
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '18px'
        }}>
          <span style={{ fontWeight: '700', color: 'var(--dark-color)' }}>Total:</span>
          <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>
            R${(getCartTotal() + 5).toFixed(2).replace('.', ',')}
          </span>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/checkout')}
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  )
}

export default CartPage
