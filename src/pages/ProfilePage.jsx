import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, MapPin, ShoppingBag, CreditCard, Bell, Lock, HelpCircle, LogOut, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function ProfilePage() {
  const navigate = useNavigate()
  const { user, getUnreadCount } = useApp()

  const menuItems = [
    { icon: User, text: 'Editar perfil', path: '/edit-profile' },
    { icon: MapPin, text: 'Meus endereços', path: '/my-address' },
    { icon: ShoppingBag, text: 'Meus pedidos', path: '/my-orders' },
    { icon: CreditCard, text: 'Métodos de pagamento', path: '/payment-methods' },
    { icon: Bell, text: 'Notificações', path: '/notifications', badge: getUnreadCount() },
    { icon: Lock, text: 'Segurança', path: '/security' },
    { icon: HelpCircle, text: 'Ajuda', path: '/help' },
  ]

  return (
    <div className="container" style={{ padding: 0 }}>
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Perfil</h1>
      </div>

      <div className="profile-header">
        <img 
          src={user?.avatar || "https://via.placeholder.com/100"} 
          alt="Profile" 
          className="profile-avatar"
        />
        <div className="profile-name">{user?.name}</div>
        <div className="profile-email">{user?.email}</div>
      </div>

      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className="menu-item"
            onClick={() => item.path !== '#' && navigate(item.path)}
          >
            <item.icon className="menu-item-icon" size={24} />
            <span className="menu-item-text">{item.text}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {item.badge > 0 && (
                <div style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {item.badge}
                </div>
              )}
              <ChevronRight className="menu-item-arrow" size={20} />
            </div>
          </li>
        ))}
      </ul>

      <div style={{ padding: '20px' }}>
        <button 
          className="btn-primary"
          style={{ backgroundColor: '#ff4444' }}
          onClick={() => navigate('/login')}
        >
          <LogOut size={20} style={{ marginRight: '10px', display: 'inline' }} />
          SAIR DA CONTA
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
