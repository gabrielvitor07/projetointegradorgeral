import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Plus, Trash2, Check } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function MyAddressPage() {
  const navigate = useNavigate()
  const { addresses, deleteAddress, selectedAddress, setSelectedAddress } = useApp()

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Meus endereços</h1>
      </div>

      <div style={{ marginTop: '30px' }}>
        {addresses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--gray-dark)' }}>
            <MapPin size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <p>Nenhum endereço cadastrado</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div 
              key={addr.id} 
              className="card"
              onClick={() => setSelectedAddress(addr)}
              style={{ 
                marginBottom: '15px',
                cursor: 'pointer',
                border: selectedAddress?.id === addr.id ? '2px solid var(--primary-color)' : '1px solid var(--gray-medium)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', gap: '15px' }}>
                <MapPin size={24} color="var(--primary-color)" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {addr.type}
                    {selectedAddress?.id === addr.id && (
                      <Check size={18} color="var(--primary-color)" />
                    )}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray-dark)', lineHeight: '1.6' }}>
                    {addr.street}, {addr.number}
                    {addr.complement && ` - ${addr.complement}`}
                    <br />
                    {addr.neighborhood} - {addr.city}/{addr.state}
                    <br />
                    CEP: {addr.cep}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (window.confirm('Deseja realmente excluir este endereço?')) {
                      deleteAddress(addr.id)
                    }
                  }}
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
          ))
        )}

        <button 
          className="btn-primary"
          onClick={() => navigate('/add-address')}
          style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Plus size={20} style={{ marginRight: '10px' }} />
          ADICIONAR NOVO ENDEREÇO
        </button>
      </div>
    </div>
  );
}

export default MyAddressPage;
