// Banco de dados de produtos
export const products = [
  // Burgers
  {
    id: 1,
    name: 'X-Burger Especial',
    description: 'Hambúrguer artesanal de 180g, queijo cheddar, alface, tomate, cebola roxa, picles e molho especial da casa. Acompanha batata frita crocante.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'burger'
  },
  {
    id: 2,
    name: 'X-Frango',
    description: 'Filé de frango grelhado, queijo mussarela, alface, tomate e maionese caseira. Acompanha batata frita.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
    category: 'burger'
  },
  {
    id: 3,
    name: 'X-Bacon',
    description: 'Hambúrguer de 180g, bacon crocante, queijo cheddar, cebola caramelizada e molho barbecue. Acompanha batata frita.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
    category: 'burger'
  },
  
  // Pizzas
  {
    id: 4,
    name: 'Pizza de Frango',
    description: 'Pizza deliciosa com frango desfiado, catupiry, azeitonas pretas, milho e orégano. Massa fina e crocante.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    category: 'pizza'
  },
  {
    id: 5,
    name: 'Pizza Margherita',
    description: 'Pizza clássica italiana com molho de tomate fresco, mussarela de búfala, manjericão e azeite extra virgem.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    category: 'pizza'
  },
  {
    id: 6,
    name: 'Pizza Calabresa',
    description: 'Pizza com calabresa fatiada, cebola roxa, azeitonas pretas, mussarela e orégano. Massa tradicional.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    category: 'pizza'
  },
  
  // Sanduíches
  {
    id: 7,
    name: 'Passaporte de Frango',
    description: 'Pão francês composto com carne moída temperada, salsicha, ketchup, maionese, queijo derretido e tomate picado. O clássico!',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1619740455993-557c2f48d5d7?w=400&h=300&fit=crop',
    category: 'sandwich'
  },
  {
    id: 8,
    name: 'Passaporte Especial',
    description: 'Pão especial com recheio premium: carne moída nobre, salsicha artesanal, queijos selecionados, bacon e ingredientes especiais.',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&h=300&fit=crop',
    category: 'sandwich'
  },
  {
    id: 9,
    name: 'Passaporte Tradicional',
    description: 'Pão francês com frango desfiado, queijo mussarela, milho, ervilha, batata palha e molho especial da casa.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
    category: 'sandwich'
  }
]

// Função para buscar produto por ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

// Função para buscar produtos por categoria
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category)
}

// Função para buscar todos os produtos
export const getAllProducts = () => {
  return products
}
