import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, Eye, EyeOff, Shield, Key, Smartphone } from 'lucide-react'

function SecurityPage() {
  const navigate = useNavigate()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }
    
    if (formData.newPassword.length < 8) {
      alert('A senha deve ter pelo menos 8 caracteres!')
      return
    }
    
    alert('Senha alterada com sucesso!')
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

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
        <h1 className="text-xl sm:text-2xl font-bold text-dark ml-4">Segurança</h1>
      </div>

      {/* Security Status */}
      <div className="bg-gradient-to-r from-primary to-orange-500 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
            <div className="text-lg font-bold">Conta Protegida</div>
            <div className="text-sm opacity-90">Suas informações estão seguras</div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <Key size={24} className="text-primary" />
          <h2 className="text-lg font-bold text-dark">Alterar senha</h2>
        </div>

        <form onSubmit={handleChangePassword}>
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-dark mb-2">
              Senha atual
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Digite sua senha atual"
                className="w-full px-4 py-3 border border-gray-medium rounded-xl outline-none focus:border-primary transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-dark"
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-dark mb-2">
              Nova senha
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Digite sua nova senha"
                className="w-full px-4 py-3 border border-gray-medium rounded-xl outline-none focus:border-primary transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-dark"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="text-xs text-gray-dark mt-2">
              Mínimo de 8 caracteres, incluindo maiúsculas, minúsculas e números
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-dark mb-2">
              Confirmar nova senha
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua nova senha"
                className="w-full px-4 py-3 border border-gray-medium rounded-xl outline-none focus:border-primary transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-dark"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            ALTERAR SENHA
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Smartphone size={24} className="text-primary" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-dark">Autenticação em dois fatores</h2>
            <p className="text-sm text-gray-dark">Adicione uma camada extra de segurança</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-medium rounded-full peer peer-checked:bg-primary transition-colors relative">
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                twoFactorEnabled ? 'translate-x-6' : ''
              }`}></div>
            </div>
          </label>
        </div>
        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-gray-light rounded-xl">
            <p className="text-sm text-gray-dark mb-3">
              Configure a autenticação em dois fatores usando um aplicativo autenticador como Google Authenticator ou Authy.
            </p>
            <button className="text-sm font-bold text-primary hover:underline">
              Configurar agora →
            </button>
          </div>
        )}
      </div>

      {/* Security Tips */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-lg font-bold text-dark mb-4">Dicas de segurança</h2>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-dark mb-1">Use senhas fortes</div>
              <div className="text-xs text-gray-dark">
                Combine letras maiúsculas, minúsculas, números e caracteres especiais
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-dark mb-1">Não compartilhe sua senha</div>
              <div className="text-xs text-gray-dark">
                Nunca compartilhe suas credenciais com terceiros
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <Key size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-dark mb-1">Troque sua senha regularmente</div>
              <div className="text-xs text-gray-dark">
                Recomendamos trocar a senha a cada 3 meses
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityPage
