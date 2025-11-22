import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ChatGPT_Image_21_de_nov._de_2025__16_26_58-removebg-preview.png';

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
      <img src={logo} alt="Logo" style={{ width: '110px', height: '110px' }} />
      <h1 style={{ color: 'white', marginTop: '20px', fontWeight: '800', fontSize: '32px' }}>
        Food Delivery
      </h1>
    </div>
  );
}

export default SplashPage;
