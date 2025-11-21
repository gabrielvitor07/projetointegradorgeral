import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#121223'
    }}>
      <img src={logo} alt="Logo" style={{ width: '150px', height: '150px' }} />
      <h1 style={{ color: 'white', marginTop: '20px', fontWeight: '800', fontSize: '32px' }}>
        Food Delivery
      </h1>
    </div>
  );
}

export default SplashPage;
