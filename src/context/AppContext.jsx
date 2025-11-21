import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : {
      name: 'Raul Emaral',
      email: 'raul@email.com',
      phone: '(11) 98765-4321',
      avatar: 'https://via.placeholder.com/100'
    }
  })

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })

  // Addresses state
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('addresses')
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        type: 'Casa',
        street: 'Rua das Flores',
        number: '123',
        complement: '',
        neighborhood: 'Jardim Primavera',
        city: 'São Paulo',
        state: 'SP',
        cep: '01234-567'
      },
      {
        id: 2,
        type: 'Trabalho',
        street: 'Av. Paulista',
        number: '1000',
        complement: 'Sala 501',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        cep: '01310-100'
      }
    ]
  })

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState(() => {
    const saved = localStorage.getItem('paymentMethods')
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        type: 'Visa',
        number: '4532123456781234',
        name: 'Raul Emaral',
        expiryDate: '12/25',
        cvv: '123'
      },
      {
        id: 2,
        type: 'Mastercard',
        number: '5412345678905678',
        name: 'Raul Emaral',
        expiryDate: '08/26',
        cvv: '456'
      }
    ]
  })

  // Selected address
  const [selectedAddress, setSelectedAddress] = useState(() => {
    const saved = localStorage.getItem('selectedAddress')
    return saved ? JSON.parse(saved) : addresses[1] // Default to Trabalho
  })

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications')
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Pedido confirmado!',
        message: 'Seu pedido #1234 foi confirmado e está sendo preparado.',
        date: new Date().toISOString(),
        read: false
      },
      {
        id: 2,
        title: 'Promoção especial!',
        message: 'Ganhe 20% de desconto no seu próximo pedido.',
        date: new Date(Date.now() - 86400000).toISOString(),
        read: false
      }
    ]
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses))
  }, [addresses])

  useEffect(() => {
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods))
  }, [paymentMethods])

  useEffect(() => {
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress))
  }, [selectedAddress])

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  // User functions
  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }))
  }

  // Cart functions
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  const updateCartItem = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prev => prev.map(i => 
      i.id === itemId ? { ...i, quantity } : i
    ))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  // Order functions
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: getCartTotal(),
      address: selectedAddress,
      status: 'ongoing',
      date: new Date().toISOString(),
      ...orderData
    }
    setOrders(prev => [newOrder, ...prev])
    clearCart()
    
    // Add notification
    addNotification({
      title: 'Pedido realizado!',
      message: `Seu pedido #${newOrder.id} foi confirmado.`
    })
    
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ))
  }

  // Address functions
  const addAddress = (address) => {
    const newAddress = {
      id: Date.now(),
      ...address
    }
    setAddresses(prev => [...prev, newAddress])
    return newAddress
  }

  const updateAddress = (addressId, addressData) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId ? { ...addr, ...addressData } : addr
    ))
  }

  const deleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId))
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(addresses[0] || null)
    }
  }

  // Payment methods functions
  const addPaymentMethod = (method) => {
    const newMethod = {
      id: Date.now(),
      ...method
    }
    setPaymentMethods(prev => [...prev, newMethod])
    return newMethod
  }

  const deletePaymentMethod = (methodId) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId))
  }

  // Notification functions
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      date: new Date().toISOString(),
      read: false,
      ...notification
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length
  }

  const value = {
    // User
    user,
    updateUser,
    
    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartTotal,
    getCartCount,
    
    // Orders
    orders,
    createOrder,
    updateOrderStatus,
    
    // Addresses
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    selectedAddress,
    setSelectedAddress,
    
    // Payment Methods
    paymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    getUnreadCount
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
