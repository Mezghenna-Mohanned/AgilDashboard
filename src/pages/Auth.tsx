import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Mode = 'login' | 'register'
type Theme = 'dark' | 'light'

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()

  const initialMode: Mode = location.pathname === '/register' ? 'register' : 'login'
  const [mode, setMode] = useState<Mode>(initialMode)
  const [theme, setTheme] = useState<Theme>('dark')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isRegister = mode === 'register'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isRegister) {
        await register(name.trim(), email.trim(), password)
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
  }

  const isDark = theme === 'dark'

  const leftPanelClasses = isDark
    ? 'bg-gradient-to-br from-[#020617] via-[#02091f] to-[#020617] text-white'
    : 'bg-gradient-to-br from-[#020617] via-[#02091f] to-[#020617] text-white'

  const rightPanelClasses = isDark
    ? 'bg-gradient-to-b from-[#020617] via-[#02091f] to-[#020617] text-white'
    : 'bg-white text-slate-900'

  const cardClasses = isDark
    ? 'bg-[#02091f] border border-slate-800 text-white shadow-2xl shadow-black/40'
    : 'bg-white border border-slate-100 text-slate-900 shadow-2xl shadow-slate-900/5'

  const inputClasses = isDark
    ? 'w-full rounded-lg border border-slate-800 bg-[#020617] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
    : 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'

  const buttonPrimaryClasses = isDark
    ? 'w-full rounded-lg bg-[#2563eb] py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-[#1d4ed8] transition-colors'
    : 'w-full rounded-lg bg-[#2563eb] py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-[#1d4ed8] transition-colors'

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl flex gap-10">
        {/* Sign up / marketing panel */}
        <div className="flex-1 rounded-3xl overflow-hidden relative">
          <div className={`h-full w-full p-10 flex flex-col justify-between ${leftPanelClasses}`}>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold tracking-[0.2em] uppercase">
                EventHub<span className="text-pink-500">.</span>
              </span>
              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-100 hover:bg-white/10 transition-colors"
              >
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>
            </div>

            {/* Sliding marketing copy */}
            <div className="mt-20 max-w-md overflow-hidden">
              <div
                className={`flex w-full transition-transform duration-500 ease-out ${
                  isRegister ? '-translate-x-full' : 'translate-x-0'
                }`}
              >
                {/* Login slide */}
                <div className="w-full pr-10 shrink-0">
                  <p className="text-4xl font-semibold leading-tight mb-4">Welcome Back.</p>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Continue your journey with our Event booking system!
                  </p>
                </div>

                {/* Register slide */}
                <div className="w-full pr-10 shrink-0">
                  <p className="text-4xl font-semibold leading-tight mb-4">Welcome.</p>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Start your journey now with our Event booking system!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auth card */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div
            className={`w-full max-w-md rounded-3xl p-8 ${cardClasses}`}
            style={{ boxShadow: isDark ? '0 40px 120px rgba(15,23,42,0.9)' : undefined }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {isRegister ? 'Create an account' : 'Login to your account'}
              </h2>
              <div className="flex text-xs gap-1">
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className={`px-3 py-1 rounded-full ${
                    isRegister
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className={`px-3 py-1 rounded-full ${
                    !isRegister
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                type="button"
                className={`flex-1 rounded-lg border text-xs py-2 font-medium ${
                  isDark
                    ? 'border-slate-800 bg-[#020617] text-slate-100 hover:bg-slate-900'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                Continue with Google
              </button>
              <button
                type="button"
                className={`flex-1 rounded-lg border text-xs py-2 font-medium ${
                  isDark
                    ? 'border-slate-800 bg-[#020617] text-slate-100 hover:bg-slate-900'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                Continue with Facebook
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-800/60" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">or</span>
              <div className="h-px flex-1 bg-slate-800/60" />
            </div>

            {/* Sliding forms */}
            <div className="relative w-full overflow-hidden">
              <div
                className={`flex w-full transition-transform duration-500 ease-out ${
                  isRegister ? '-translate-x-full' : 'translate-x-0'
                }`}
              >
                {/* Login form */}
                <form onSubmit={handleSubmit} className="w-full shrink-0 space-y-4 pr-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClasses}
                      placeholder="balamia@gmail.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-400">Password</label>
                      <button
                        type="button"
                        className="text-[11px] text-blue-500 hover:text-blue-400"
                      >
                        Forgot?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={inputClasses}
                      placeholder="Enter your password"
                    />
                  </div>

                  {error && !isRegister && (
                    <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={buttonPrimaryClasses}
                  >
                    {loading ? 'Logging in...' : 'Login now'}
                  </button>

                  <p className="mt-2 text-center text-xs text-slate-500">
                    {"Don't have an account? "}
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="text-blue-500 hover:text-blue-400 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </form>

                {/* Register form */}
                <form onSubmit={handleSubmit} className="w-full shrink-0 space-y-4 pl-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClasses}
                      placeholder="balamia@gmail.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-400">Password</label>
                      <button
                        type="button"
                        className="text-[11px] text-blue-500 hover:text-blue-400"
                      >
                        Forgot?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={inputClasses}
                      placeholder="Enter your password"
                    />
                  </div>

                  {error && isRegister && (
                    <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={buttonPrimaryClasses}
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </button>

                  <p className="mt-2 text-center text-xs text-slate-500">
                    {'Already have an account? '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-blue-500 hover:text-blue-400 font-medium"
                    >
                      Log in
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
