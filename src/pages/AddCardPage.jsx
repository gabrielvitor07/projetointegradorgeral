import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard } from 'lucide-react'
import { validateCardNumber, validateCVV, validateExpiryDate } from '../utils/validation'
import { useApp } from '../context/AppContext.jsx'

function AddCardPage() {
  const navigate = useNavigate()
  const { addPaymentMethod } = useApp()
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      if (value.length > 5) return;
    }
    
    // Limit CVV
    if (name === 'cvv' && value.length > 4) return;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const cardNumberError = validateCardNumber(formData.cardNumber)
    const cvvError = validateCVV(formData.cvv)
    const expiryError = validateExpiryDate(formData.expiryDate)

    if (cardNumberError || cvvError || expiryError || !formData.cardName) {
      setErrors({
        cardNumber: cardNumberError,
        cardName: !formData.cardName ? 'Nome é obrigatório' : '',
        expiryDate: expiryError,
        cvv: cvvError
      })
      return
    }

    // Determine card type based on number
    const firstDigit = formData.cardNumber.replace(/\s/g, '')[0]
    let type = 'Visa'
    if (firstDigit === '5') type = 'Mastercard'
    else if (firstDigit === '4') type = 'Visa'
    else if (firstDigit === '3') type = 'Amex'

    addPaymentMethod({
      type,
      number: formData.cardNumber.replace(/\s/g, ''),
      name: formData.cardName,
      expiryDate: formData.expiryDate,
      cvv: formData.cvv
    })
    
    alert('Cartão adicionado com sucesso!')
    navigate('/payment-methods')
  }

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Adicionar cartão</h1>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #FF7622 0%, #FF9A56 100%)',
        borderRadius: '20px',
        padding: '30px',
        margin: '30px 0',
        color: 'white',
        minHeight: '200px',
        position: 'relative'
      }}>
        <CreditCard size={40} style={{ marginBottom: '40px' }} />
        <div style={{ fontSize: '20px', letterSpacing: '2px', marginBottom: '20px' }}>
          {formData.cardNumber || '**** **** **** ****'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Nome</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>
              {formData.cardName || 'SEU NOME'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Validade</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>
              {formData.expiryDate || 'MM/AA'}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>NÚMERO DO CARTÃO</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className={errors.cardNumber ? 'error' : ''}
          />
          {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
        </div>

        <div className="input-group">
          <label>NOME NO CARTÃO</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="Nome como está no cartão"
            className={errors.cardName ? 'error' : ''}
          />
          {errors.cardName && <div className="error-message">{errors.cardName}</div>}
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="input-group" style={{ flex: 1 }}>
            <label>VALIDADE</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/AA"
              className={errors.expiryDate ? 'error' : ''}
            />
            {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
          </div>

          <div className="input-group" style={{ flex: 1 }}>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className={errors.cvv ? 'error' : ''}
            />
            {errors.cvv && <div className="error-message">{errors.cvv}</div>}
          </div>
        </div>

        <button type="submit" className="btn-primary">
          ADICIONAR CARTÃO
        </button>
      </form>
    </div>
  );
}

export default AddCardPage;
