import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, CheckCircle, Package, Truck } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

function TrackOrderPage() {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const { orders } = useApp()
  
  const order = orders.find(o => o.id === parseInt(orderId))
  
  if (!order) {
    return (
      <div className="max-w-app mx-auto px-4 sm:px-6">
        <div className="flex items-center mb-6 pt-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-dark" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-dark ml-4">Rastreamento</h1>
        </div>
        <div className="text-center py-20 text-gray-dark">
          Pedido não encontrado
        </div>
      </div>
    )
  }

  const trackingSteps = [
    {
      id: 1,
      title: 'Pedido confirmado',
      description: 'Seu pedido foi recebido',
      time: new Date(order.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      completed: true,
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Preparando pedido',
      description: 'O restaurante está preparando',
      time: new Date(new Date(order.date).getTime() + 5 * 60000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      completed: true,
      icon: Package
    },
    {
      id: 3,
      title: 'Saiu para entrega',
      description: 'Pedido a caminho',
      time: new Date(new Date(order.date).getTime() + 20 * 60000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      completed: order.status === 'history',
      icon: Truck
    },
    {
      id: 4,
      title: 'Entregue',
      description: 'Pedido foi entregue',
      time: 'Previsão: ' + new Date(new Date(order.date).getTime() + 45 * 60000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      completed: order.status === 'history',
      icon: CheckCircle
    }
  ]

  const currentStep = order.status === 'ongoing' ? 2 : 4

  return (
    <div className="max-w-app mx-auto px-4 sm:px-6 pb-20">
      {/* Header */}
      <div className="flex items-center mb-6 pt-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-dark" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-dark ml-4">Rastreamento</h1>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-lg font-bold text-dark mb-1">
              Pedido #{order.id}
            </div>
            <div className="text-sm text-gray-dark">
              {new Date(order.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-bold ${
            order.status === 'ongoing' 
              ? 'bg-primary text-white' 
              : 'bg-green-500 text-white'
          }`}>
            {order.status === 'ongoing' ? 'Em andamento' : 'Entregue'}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="flex items-start gap-3 p-4 bg-gray-light rounded-xl">
          <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="text-sm font-bold text-dark mb-1">
              Endereço de entrega
            </div>
            <div className="text-sm text-gray-dark">
              {order.address?.street}, {order.address?.number}
              {order.address?.complement && ` - ${order.address.complement}`}
              <br />
              {order.address?.neighborhood} - {order.address?.city}/{order.address?.state}
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-dark mb-6">Status do pedido</h2>
        
        <div className="relative">
          {trackingSteps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === trackingSteps.length - 1
            
            return (
              <div key={step.id} className="relative flex gap-4 pb-8">
                {/* Timeline Line */}
                {!isLast && (
                  <div 
                    className={`absolute left-5 top-12 w-0.5 h-full ${
                      step.completed ? 'bg-primary' : 'bg-gray-medium'
                    }`}
                  />
                )}
                
                {/* Icon */}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed 
                    ? 'bg-primary' 
                    : 'bg-gray-medium'
                }`}>
                  <Icon size={20} className="text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className={`font-bold ${
                      step.completed ? 'text-dark' : 'text-gray-dark'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-dark flex items-center gap-1">
                      <Clock size={14} />
                      {step.time}
                    </div>
                  </div>
                  <div className="text-sm text-gray-dark">
                    {step.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-lg font-bold text-dark mb-4">Itens do pedido</h2>
        
        {order.items.map((item, idx) => (
          <div key={idx} className="flex gap-3 mb-4 last:mb-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="font-bold text-dark text-sm mb-1">
                {item.quantity}x {item.name}
              </div>
              {item.observations && (
                <div className="text-xs text-gray-dark mb-1">
                  Obs: {item.observations}
                </div>
              )}
              <div className="text-sm font-bold text-primary">
                R${(item.price * item.quantity).toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        ))}

        <div className="border-t border-gray-light mt-4 pt-4 flex justify-between items-center">
          <div className="text-sm text-gray-dark">Total</div>
          <div className="text-xl font-bold text-dark">
            R${order.total.toFixed(2).replace('.', ',')}
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button
        onClick={() => navigate('/help')}
        className="w-full mt-6 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-colors"
      >
        PRECISA DE AJUDA?
      </button>
    </div>
  )
}

export default TrackOrderPage
