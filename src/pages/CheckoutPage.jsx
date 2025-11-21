import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, CreditCard, Check } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function CheckoutPage() {
  const navigate = useNavigate()
  const { 
    cart, 
    getCartTotal, 
    selectedAddress, 
    paymentMethods, 
    createOrder 
  } = useApp()
  
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]?.id)

  if (cart.length === 0) {
    navigate('/home')
    return null
  }

  const deliveryFee = 5.00
  const total = getCartTotal() + deliveryFee

  const handleFinishOrder = () => {
    const order = createOrder({
      paymentMethodId: selectedPayment
    })
    
    navigate('/my-orders')
    alert(`Pedido #${order.id} realizado com sucesso!`)
  }

  return (
    <div className="container" style={{ paddingBottom: '150px' }}>
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Finalizar pedido</h1>
      </div>

      {/* Delivery Address */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          marginBottom: '15px',
          color: 'var(--dark-color)'
        }}>
          Endereço de entrega
        </h2>
        
        <div 
          className="card"
          onClick={() => navigate('/my-address')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <MapPin size={24} color="var(--primary-color)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', marginBottom: '5px' }}>
                {selectedAddress?.type}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-dark)' }}>
                {selectedAddress?.street}, {selectedAddress?.number}
                {selectedAddress?.complement && ` - ${selectedAddress.complement}`}
                <br />
                {selectedAddress?.neighborhood} - {selectedAddress?.city}/{selectedAddress?.state}
                <br />
                CEP: {selectedAddress?.cep}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          marginBottom: '15px',
          color: 'var(--dark-color)'
        }}>
          Forma de pagamento
        </h2>
        
        {paymentMethods.map(method => (
          <div 
            key={method.id}
            className="card"
            onClick={() => setSelectedPayment(method.id)}
            style={{ 
              marginBottom: '10px',
              cursor: 'pointer',
              border: selectedPayment === method.id ? '2px solid var(--primary-color)' : '1px solid var(--gray-medium)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <CreditCard size={24} color="var(--primary-color)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', marginBottom: '5px' }}>
                  {method.type}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray-dark)' }}>
                  **** **** **** {method.number.slice(-4)}
                </div>
              </div>
              {selectedPayment === method.id && (
                <Check size={24} color="var(--primary-color)" />
              )}
            </div>
          </div>
        ))}
        
        <button
          onClick={() => navigate('/add-card')}
          style={{
            width: '100%',
            padding: '15px',
            border: '2px dashed var(--gray-medium)',
            borderRadius: '10px',
            background: 'none',
            color: 'var(--primary-color)',
            fontWeight: '700',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          + Adicionar novo cartão
        </button>
      </div>

      {/* Order Summary */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          marginBottom: '15px',
          color: 'var(--dark-color)'
        }}>
          Resumo do pedido
        </h2>
        
        <div className="card">
          {cart.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '10px',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--gray-light)'
            }}>
              <div>
                <div style={{ fontWeight: '600' }}>
                  {item.quantity}x {item.name}
                </div>
                {item.observations && (
                  <div style={{ fontSize: '12px', color: 'var(--gray-dark)' }}>
                    Obs: {item.observations}
                  </div>
                )}
              </div>
              <div style={{ fontWeight: '700' }}>
                R${(item.price * item.quantity).toFixed(2).replace('.', ',')}
              </div>
            </div>
          ))}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '2px solid var(--gray-light)'
          }}>
            <div>
              <div style={{ marginBottom: '5px' }}>Subtotal</div>
              <div style={{ marginBottom: '5px' }}>Taxa de entrega</div>
              <div style={{ fontWeight: '700', fontSize: '18px' }}>Total</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: '5px' }}>
                R${getCartTotal().toFixed(2).replace('.', ',')}
              </div>
              <div style={{ marginBottom: '5px' }}>
                R${deliveryFee.toFixed(2).replace('.', ',')}
              </div>
              <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--primary-color)' }}>
                R${total.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom button */}
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
        <button 
          className="btn-primary"
          onClick={handleFinishOrder}
        >
          CONFIRMAR PEDIDO - R${total.toFixed(2).replace('.', ',')}
        </button>
      </div>
    </div>
  )
}

export default CheckoutPage
