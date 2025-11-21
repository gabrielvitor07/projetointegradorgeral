import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react'

function HelpPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'Como faço um pedido?',
      answer: 'É simples! Navegue pelo cardápio, escolha seus itens favoritos, adicione ao carrinho e finalize o pedido escolhendo o endereço de entrega e forma de pagamento.'
    },
    {
      id: 2,
      question: 'Qual o tempo de entrega?',
      answer: 'O tempo médio de entrega é de 30 a 45 minutos, dependendo da distância e do movimento do restaurante. Você pode acompanhar seu pedido em tempo real.'
    },
    {
      id: 3,
      question: 'Como adiciono um novo endereço?',
      answer: 'Vá em Perfil > Meus endereços > Adicionar novo endereço. Preencha os dados e salve.'
    },
    {
      id: 4,
      question: 'Posso cancelar meu pedido?',
      answer: 'Sim, você pode cancelar o pedido antes dele ser aceito pelo restaurante. Após a aceitação, entre em contato com o suporte.'
    },
    {
      id: 5,
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo) e dinheiro na entrega.'
    },
    {
      id: 6,
      question: 'Como edito meus dados pessoais?',
      answer: 'Acesse Perfil > Editar perfil e atualize suas informações.'
    }
  ]

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Ajuda</h1>
      </div>

      {/* Contact Options */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          marginBottom: '15px',
          color: 'var(--dark-color)'
        }}>
          Entre em contato
        </h2>

        <div style={{ display: 'grid', gap: '10px', marginBottom: '30px' }}>
          <a 
            href="tel:08005551234"
            className="card"
            style={{ 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Phone size={24} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--dark-color)' }}>
                Telefone
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-dark)' }}>
                0800 555 1234
              </div>
            </div>
          </a>

          <a 
            href="mailto:suporte@fooddelivery.com"
            className="card"
            style={{ 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mail size={24} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--dark-color)' }}>
                E-mail
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-dark)' }}>
                suporte@fooddelivery.com
              </div>
            </div>
          </a>

          <div 
            className="card"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle size={24} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--dark-color)' }}>
                Chat ao vivo
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-dark)' }}>
                Disponível 24/7
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          marginBottom: '15px',
          color: 'var(--dark-color)'
        }}>
          Perguntas frequentes
        </h2>

        {faqs.map(faq => (
          <div 
            key={faq.id}
            className="card"
            onClick={() => toggleFaq(faq.id)}
            style={{ 
              marginBottom: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                fontWeight: '700',
                color: 'var(--dark-color)',
                flex: 1
              }}>
                {faq.question}
              </div>
              {openFaq === faq.id ? (
                <ChevronUp size={20} color="var(--primary-color)" />
              ) : (
                <ChevronDown size={20} color="var(--gray-dark)" />
              )}
            </div>
            {openFaq === faq.id && (
              <div style={{
                marginTop: '15px',
                paddingTop: '15px',
                borderTop: '1px solid var(--gray-light)',
                fontSize: '14px',
                color: 'var(--gray-dark)',
                lineHeight: '1.6'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HelpPage
