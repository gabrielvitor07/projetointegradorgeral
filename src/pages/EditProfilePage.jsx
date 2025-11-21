import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'
import { validateName, validateEmail, validatePhone } from '../utils/validation'
import { useApp } from '../context/AppContext.jsx'

function EditProfilePage() {
  const navigate = useNavigate()
  const { user, updateUser } = useApp()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
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
    
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const phoneError = validatePhone(formData.phone)

    if (nameError || emailError || phoneError) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError
      })
      return
    }

    updateUser(formData)
    alert('Perfil atualizado com sucesso!')
    navigate('/profile')
  }

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Editar perfil</h1>
      </div>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src={user?.avatar || "https://via.placeholder.com/100"} 
            alt="Profile" 
            className="profile-avatar"
          />
          <button style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'var(--primary-color)',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <Camera size={18} color="white" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>NOME COMPLETO</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="input-group">
          <label>E-MAIL</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="input-group">
          <label>TELEFONE</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <button type="submit" className="btn-primary">
          SALVAR ALTERAÇÕES
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
