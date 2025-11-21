import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { validateCEP } from '../utils/validation'
import { useApp } from '../context/AppContext.jsx'

function AddAddressPage() {
  const navigate = useNavigate()
  const { addAddress } = useApp()
  const [formData, setFormData] = useState({
    type: 'Casa',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    
    const cepError = validateCEP(formData.cep)
    if (cepError || !formData.street || !formData.number || !formData.neighborhood || !formData.city || !formData.state) {
      setErrors({ 
        cep: cepError,
        general: 'Preencha todos os campos obrigatórios'
      })
      return
    }

    addAddress(formData)
    alert('Endereço adicionado com sucesso!')
    navigate('/my-address')
  }

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Adicionar endereço</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <div className="input-group">
          <label>TIPO</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '15px',
              border: '1px solid var(--gray-medium)',
              borderRadius: '10px',
              fontSize: '16px',
              outline: 'none'
            }}
          >
            <option value="Casa">Casa</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="input-group">
          <label>CEP</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            placeholder="00000-000"
            className={errors.cep ? 'error' : ''}
          />
          {errors.cep && <div className="error-message">{errors.cep}</div>}
        </div>

        <div className="input-group">
          <label>RUA</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Nome da rua"
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="input-group" style={{ flex: 2 }}>
            <label>NÚMERO</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="123"
            />
          </div>

          <div className="input-group" style={{ flex: 3 }}>
            <label>COMPLEMENTO</label>
            <input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              placeholder="Apto, Bloco..."
            />
          </div>
        </div>

        <div className="input-group">
          <label>BAIRRO</label>
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Nome do bairro"
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="input-group" style={{ flex: 3 }}>
            <label>CIDADE</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Cidade"
            />
          </div>

          <div className="input-group" style={{ flex: 1 }}>
            <label>ESTADO</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="UF"
              maxLength="2"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          SALVAR ENDEREÇO
        </button>
      </form>
    </div>
  );
}

export default AddAddressPage;
