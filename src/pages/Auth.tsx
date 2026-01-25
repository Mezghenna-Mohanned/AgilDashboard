import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Calendar, Users, Sparkles } from 'lucide-react'

type Mode = 'login' | 'register'
type UserRole = 'user' | 'organizer' | 'admin'

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()

  const initialMode: Mode = location.pathname === '/register' ? 'register' : 'login'
  const [mode, setMode] = useState<Mode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isRegister = mode === 'register'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isRegister) {
        await register(name.trim(), email.trim(), password, role)
      } else {
        await login(email.trim(), password)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    navigate(next === 'register' ? '/register' : '/login')
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#020617] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex gap-0 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <Calendar className="w-8 h-8" />
              <span className="text-2xl font-bold">EventHub</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                {isRegister ? 'Start Your Journey' : 'Welcome Back'}
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed max-w-md">
                {isRegister 
                  ? 'Join thousands of users discovering and booking amazing events every day.'
                  : 'Continue exploring incredible events and experiences tailored just for you.'}
              </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Calendar className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-purple-100">Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Users className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-purple-100">Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Sparkles className="w-8 h-8 mb-2" />
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm text-purple-100">Rating</div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    !isRegister
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    isRegister
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Register
                </button>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isRegister ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="text-gray-600">
                {isRegister
                  ? 'Fill in the details to get started'
                  : 'Enter your credentials to continue'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('user')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        role === 'user'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Users className={`w-6 h-6 mx-auto mb-2 ${role === 'user' ? 'text-purple-600' : 'text-gray-400'}`} />
                      <div className={`font-medium ${role === 'user' ? 'text-purple-600' : 'text-gray-700'}`}>
                        Attendee
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Book events</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('organizer')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        role === 'organizer'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Calendar className={`w-6 h-6 mx-auto mb-2 ${role === 'organizer' ? 'text-purple-600' : 'text-gray-400'}`} />
                      <div className={`font-medium ${role === 'organizer' ? 'text-purple-600' : 'text-gray-700'}`}>
                        Organizer
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Create events</div>
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
              </button>

              {!isRegister && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => switchMode(isRegister ? 'login' : 'register')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  {isRegister ? 'Sign in' : 'Create one'}
                </button>
              </p>
            </div>

            {!isRegister && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800 font-medium mb-2">Demo Accounts:</p>
                <div className="space-y-1 text-xs text-blue-700">
                  <div>👤 User: user@eventhub.com / user123</div>
                  <div>📅 Organizer: organizer@eventhub.com / organizer123</div>
                  <div>👑 Admin: admin@eventhub.com / admin123</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}