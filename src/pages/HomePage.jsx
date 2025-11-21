import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, ShoppingCart, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { getProductsByCategory } from '../data/products.js'

function HomePage() {
  const navigate = useNavigate()
  const { selectedAddress, getCartCount, user } = useApp()
  const [searchQuery, setSearchQuery] = useState('')

  // Buscar produtos por categoria
  const newItems = getProductsByCategory('burger')
  const popularItems = getProductsByCategory('pizza')
  const sandwiches = getProductsByCategory('sandwich')

  return (
    <div className="max-w-app mx-auto pb-20 sm:pb-24 px-4 sm:px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 sm:mb-6 pt-4">
        <div>
          <div className="text-xs sm:text-sm text-gray-dark mb-1">
            ENTREGAR PARA
          </div>
          <div 
            onClick={() => navigate('/my-address')}
            className="flex items-center text-sm sm:text-base font-bold text-dark cursor-pointer hover:text-primary transition-colors"
          >
            {selectedAddress?.type || 'Selecionar endereço'}
            <ChevronDown size={20} className="ml-1" />
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4 items-center">
          <button 
            onClick={() => navigate('/cart')}
            className="relative bg-transparent border-0 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart size={24} className="sm:w-7 sm:h-7 text-dark" />
            {getCartCount() > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
                {getCartCount()}
              </div>
            )}
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="bg-transparent border-0 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu size={24} className="sm:w-7 sm:h-7 text-dark" />
          </button>
        </div>
      </div>
      
      {/* Greeting */}
      <div className="mb-4 sm:mb-5">
        <div className="text-sm sm:text-base text-gray-dark">
          Olá <span className="font-bold">{user?.name?.split(' ')[0]}, Bom dia!</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-xl px-4 py-3 sm:py-4 mb-5 sm:mb-6 shadow-sm">
        <Search size={20} className="text-gray-dark flex-shrink-0" />
        <input
          type="text"
          placeholder="O que você quer comer hoje?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border-0 outline-none text-sm sm:text-base ml-3 bg-transparent"
        />
      </div>

      {/* New Items */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-dark">Peça de novo</h2>
        <button className="text-sm sm:text-base text-primary font-semibold hover:underline">
          Mostrar todos
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-hide">
        {newItems.map(item => (
          <div 
            key={item.id}
            onClick={() => navigate(`/food/${item.id}`)}
            className="min-w-[130px] sm:min-w-[150px] cursor-pointer hover:scale-105 transition-transform"
          >
            <img 
              src={item.image} 
              alt={item.name}
              className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-2xl object-cover mb-2 sm:mb-3"
            />
            <div className="text-sm sm:text-base font-bold text-dark mb-1">
              {item.name}
            </div>
            <div className="text-base sm:text-lg font-bold text-primary">
              R${item.price.toFixed(2).replace('.', ',')}
            </div>
          </div>
        ))}
      </div>

      {/* Popular Items */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-dark">Os mais pedidos</h2>
        <button className="text-sm sm:text-base text-primary font-semibold hover:underline">
          Mostrar todos
        </button>
      </div>

      <div className="space-y-4 mb-6 sm:mb-8">
        {popularItems.map(item => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/food/${item.id}`)}
          >
            <img src={item.image} alt={item.name} className="w-full h-36 sm:h-44 object-cover" />
            <div className="p-4">
              <div className="text-base sm:text-lg font-bold text-dark mb-2">{item.name}</div>
              <div className="text-xs sm:text-sm text-gray-dark mb-3 line-clamp-2">{item.description}</div>
              <div className="text-lg sm:text-xl font-bold text-primary">
                R${item.price.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sandwiches */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-dark">Sanduíches</h2>
        <button className="text-sm sm:text-base text-primary font-semibold hover:underline">
          Mostrar todos
        </button>
      </div>

      <div className="space-y-4">
        {sandwiches.map(item => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/food/${item.id}`)}
          >
            <img src={item.image} alt={item.name} className="w-full h-36 sm:h-44 object-cover" />
            <div className="p-4">
              <div className="text-base sm:text-lg font-bold text-dark mb-2">{item.name}</div>
              <div className="text-xs sm:text-sm text-gray-dark mb-3 line-clamp-2">{item.description}</div>
              <div className="text-lg sm:text-xl font-bold text-primary">
                R${item.price.toFixed(2).replace('.', ',')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
