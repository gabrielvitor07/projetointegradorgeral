import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { validateEmail, validatePassword, validateName, validatePhone, validateBirthDate } from '../utils/validation';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

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
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const birthDateError = validateBirthDate(formData.birthDate);
    const passwordError = validatePassword(formData.password);

    if (nameError || emailError || phoneError || birthDateError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        phone: phoneError,
        birthDate: birthDateError,
        password: passwordError
      });
      return;
    }

    console.log('Register:', formData);
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Registrar-se</h1>
        <p>Crie sua nova conta</p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
        <div className="input-group">
          <label>NOME COMPLETO</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
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
            placeholder="exemplo@email.com"
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
            placeholder="(11) 98765-4321"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="input-group">
          <label>DATA DE NASCIMENTO</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={errors.birthDate ? 'error' : ''}
          />
          {errors.birthDate && <div className="error-message">{errors.birthDate}</div>}
        </div>

        <div className="input-group">
          <label>SENHA</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <button type="submit" className="btn-primary">
          CRIAR CONTA
        </button>
      </form>

      <div className="text-center">
        Já tem uma conta? <a href="/login">Entrar</a>
      </div>
    </div>
  );
}

export default RegisterPage;
