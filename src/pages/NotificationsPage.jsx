import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, Trash2, CheckCheck } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function NotificationsPage() {
  const navigate = useNavigate()
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    deleteNotification 
  } = useApp()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (hours < 1) return 'Agora'
    if (hours < 24) return `${hours}h atrás`
    if (days === 1) return 'Ontem'
    return `${days} dias atrás`
  }

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Notificações</h1>
      </div>

      {notifications.length > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          marginTop: '20px',
          marginBottom: '10px'
        }}>
          <button
            onClick={markAllNotificationsAsRead}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '14px'
            }}
          >
            <CheckCheck size={18} />
            Marcar todas como lidas
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {notifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--gray-dark)'
          }}>
            <Bell size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
            <h2 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--dark-color)' }}>
              Nenhuma notificação
            </h2>
            <p>Você está em dia com tudo!</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id}
              className="card"
              onClick={() => markNotificationAsRead(notification.id)}
              style={{ 
                marginBottom: '15px',
                cursor: 'pointer',
                backgroundColor: notification.read ? 'white' : '#fff5f0',
                borderLeft: notification.read ? 'none' : '4px solid var(--primary-color)'
              }}
            >
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bell size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '5px'
                  }}>
                    <div style={{
                      fontWeight: '700',
                      color: 'var(--dark-color)',
                      fontSize: '16px'
                    }}>
                      {notification.title}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--gray-dark)',
                        cursor: 'pointer',
                        padding: '5px'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--gray-dark)',
                    marginBottom: '8px',
                    lineHeight: '1.5'
                  }}>
                    {notification.message}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--gray-dark)',
                    opacity: 0.7
                  }}>
                    {formatDate(notification.date)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationsPage
