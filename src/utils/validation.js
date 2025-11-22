// Regex patterns for validation
export const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
  cardNumber: /^\d{16}$/,
  cvv: /^\d{3,4}$/,
  expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cep: /^\d{5}-?\d{3}$/
};

export const validateEmail = (email) => {
  if (!email) return 'Email é obrigatório';
  if (!patterns.email.test(email)) return 'Email inválido';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Senha é obrigatória';
  if (password.length < 8) return 'Senha deve ter no mínimo 8 caracteres';
  if (!patterns.password.test(password)) {
    return 'Senha deve conter maiúscula, minúscula, número e caractere especial';
  }
  return '';
};

export const validateName = (name) => {
  if (!name) return 'Nome é obrigatório';
  if (!patterns.name.test(name)) return 'Nome inválido';
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return 'Telefone é obrigatório';
  if (!patterns.phone.test(phone)) return 'Telefone inválido';
  return '';
};

export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!cleaned) return 'Número do cartão é obrigatório';
  if (!patterns.cardNumber.test(cleaned)) return 'Número do cartão inválido';
  return '';
};

export const validateCVV = (cvv) => {
  if (!cvv) return 'CVV é obrigatório';
  if (!patterns.cvv.test(cvv)) return 'CVV inválido';
  return '';
};

export const validateExpiryDate = (date) => {
  if (!date) return 'Data de validade é obrigatória';
  if (!patterns.expiryDate.test(date)) return 'Data inválida (MM/AA)';
  return '';
};

export const validateCEP = (cep) => {
  if (!cep) return 'CEP é obrigatório';
  if (!patterns.cep.test(cep)) return 'CEP inválido';
  return '';
};

export const validateBirthDate = (date) => {
  if (!date) return 'Data de nascimento é obrigatória';
  
  const birthDate = new Date(date);
  const today = new Date();
  
  if (isNaN(birthDate.getTime())) return 'Data inválida';
  if (birthDate >= today) return 'Data de nascimento deve ser no passado';
  
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
  
  if (actualAge < 13) return 'Você deve ter pelo menos 13 anos';
  if (actualAge > 120) return 'Data de nascimento inválida';
  
  return '';
};
