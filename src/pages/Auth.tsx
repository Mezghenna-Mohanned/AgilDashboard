import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Calendar, Eye, EyeOff } from 'lucide-react'

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()
  
  const isLogin = location.pathname === '/login'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'organizer' | 'admin'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register(formData.name, formData.email, formData.password, formData.role)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Left Side - Welcome Message */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-gradient"></div>
        <div className="relative z-10 max-w-lg">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">EventHub</h1>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            {isLogin ? (
              <>
                Welcome Back.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Continue your journey
                </span>
              </>
            ) : (
              <>
                Welcome.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Start your journey now
                </span>
              </>
            )}
          </h2>
          
          <p className="text-slate-300 text-lg leading-relaxed">
            {isLogin 
              ? 'with our Event booking system!'
              : 'with our Event booking system!'}
          </p>

          {/* Decorative Elements */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-80"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-80"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-80"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">EventHub</h1>
          </div>

          {/* Auth Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? 'Login to your account' : 'Create an account'}
              </h2>
              <p className="text-slate-400 text-sm">
                {isLogin 
                  ? "Don't have an account? " 
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => navigate(isLogin ? '/register' : '/login')}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 rounded-lg py-2.5 font-medium hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/50 text-slate-400">OR</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="input-field"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="bob@mail.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center justify-between">
                  Password
                  {isLogin && (
                    <button type="button" className="text-blue-400 hover:text-blue-300 text-xs transition-colors">
                      Forgot?
                    </button>
                  )}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="input-field pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Account Type
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="input-field"
                  >
                    <option value="user">User</option>
                    <option value="organizer">Event Organizer</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </span>
                ) : (
                  isLogin ? 'Login now' : 'Create account'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg">
              <p className="text-xs text-slate-400 font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-slate-500">
                <p>Admin: admin@eventhub.com / Admin@2026</p>
                <p>Organizer: organizer@eventhub.com / Organizer@2026</p>
                <p>User: user@eventhub.com / User@2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}