import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Mail, Apple } from 'lucide-react';
import { validateEmail, validatePassword } from '../utils/validation';
import logo from '../assets/ChatGPT_Image_21_de_nov._de_2025__16_26_58-removebg-preview.png';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      });
      return;
    }

    // Simulate login
    console.log('Login:', formData);
    navigate('/home');
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    console.log('Google login');
    navigate('/home');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login');
  };

  const handleAppleLogin = () => {
    console.log('Apple login');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Logar-se</h1>
        <p>Por favor, faça login na sua conta</p>
      </div>

      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <form onSubmit={handleSubmit}>
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

        <div className="text-center" style={{ marginBottom: '20px', textAlign: 'right' }}>
          <a href="/forgot-password">Esqueceu a senha?</a>
        </div>

        <button type="submit" className="btn-primary">
          ENTRAR
        </button>
      </form>

      <div className="divider">OU</div>

      <div className="social-login">
        <button className="social-btn facebook" onClick={handleFacebookLogin}>
          <Facebook size={24} color="white" />
        </button>
        <button className="social-btn google" onClick={handleGoogleLogin}>
          <Mail size={24} color="white" />
        </button>
        <button className="social-btn apple" onClick={handleAppleLogin}>
          <Apple size={24} color="white" />
        </button>
      </div>

      <div className="text-center">
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </div>
    </div>
  );
}

export default LoginPage;
