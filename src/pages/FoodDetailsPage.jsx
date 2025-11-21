import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { getProductById } from '../data/products.js'

function FoodDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addToCart } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [observations, setObservations] = useState('')

  // Buscar produto pelo ID
  const food = getProductById(id)

  // Se produto não encontrado, mostrar mensagem
  if (!food) {
    return (
      <div className="max-w-app mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-dark mb-4">Produto não encontrado</h2>
        <button 
          onClick={() => navigate('/home')}
          className="btn-primary"
        >
          VOLTAR PARA HOME
        </button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: quantity,
      observations: observations
    })
    
    // Show success message
    alert('Item adicionado ao carrinho!')
    navigate('/home')
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Header Image */}
      <div style={{ position: 'relative' }}>
        <img 
          src={food.image} 
          alt={food.name}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover'
          }}
        />
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px'
          }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="container">
        {/* Food Info */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--dark-color)',
          marginBottom: '10px'
        }}>
          {food.name}
        </h1>

        <p style={{
          fontSize: '14px',
          color: 'var(--gray-dark)',
          lineHeight: '1.6',
          marginBottom: '20px'
        }}>
          {food.description}
        </p>

        {/* Observations */}
        <div className="input-group">
          <label>OBSERVAÇÕES</label>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Ex: Tirar cebola, sem molho..."
            style={{
              width: '100%',
              padding: '15px',
              border: '1px solid var(--gray-medium)',
              borderRadius: '10px',
              fontSize: '16px',
              outline: 'none',
              minHeight: '100px',
              resize: 'vertical',
              fontFamily: 'Sen, sans-serif'
            }}
          />
        </div>

        {/* Price */}
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--dark-color)',
          textAlign: 'center',
          margin: '30px 0'
        }}>
          R${(food.price * quantity).toFixed(2).replace('.', ',')}
        </div>

        {/* Quantity Control */}
        <div className="quantity-control">
          <button 
            className="quantity-btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={20} />
          </button>
          <span className="quantity-value">{quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          className="btn-primary"
          onClick={handleAddToCart}
          style={{ marginTop: '20px' }}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>
    </div>
  );
}

export default FoodDetailsPage;
