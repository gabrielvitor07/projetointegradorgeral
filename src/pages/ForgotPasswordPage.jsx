import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { validateEmail } from '../utils/validation';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    console.log('Reset password for:', email);
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Esqueci a senha</h1>
        <p>Digite seu e-mail para recuperar</p>
      </div>

      {success ? (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '60px',
          padding: '20px',
          backgroundColor: '#e8f5e9',
          borderRadius: '10px'
        }}>
          <p style={{ color: '#2e7d32', fontSize: '16px' }}>
            Link de recuperação enviado para seu e-mail!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
          <div className="input-group">
            <label>E-MAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="exemplo@email.com"
              className={error ? 'error' : ''}
            />
            {error && <div className="error-message">{error}</div>}
          </div>

          <button type="submit" className="btn-primary">
            ENVIAR LINK
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
