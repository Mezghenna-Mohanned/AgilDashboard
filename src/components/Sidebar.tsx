import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Star,
  User,
  DollarSign,
  Plug,
  Settings,
  Search,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', active: location.pathname === '/' },
  ]

  const subItems = [
    { name: 'All pages', path: '/pages' },
    { name: 'Reports', path: '/reports', active: location.pathname === '/reports' },
    { name: 'events', path: '/events' },
    { name: 'organizers', path: '/organizers' },
  ]

  const mainItems = [
    { name: 'Features', icon: Star, path: '/features' },
    { name: 'Users', icon: User, path: '/users', active: location.pathname === '/users' },
    { name: 'Pricing', icon: DollarSign, path: '/pricing' },
    { name: 'Integrations', icon: Plug, path: '/integrations' },
  ]

  return (
    <aside className="w-64 bg-[#0a0e27] border-r border-[#1e293b] p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">EventHub</h1>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for..."
          className="w-full bg-[#0f1535] text-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#0f1535]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )
        })}

        <div className="pl-3 space-y-1">
          {subItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                item.active
                  ? 'text-white font-medium'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {mainItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#0f1535]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )
        })}

        <div className="pt-6">
          <Link
            to="/settings"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#0f1535] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-[#1e293b] space-y-3">
        <button
          type="button"
          onClick={() => navigate('/account')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#0f1535] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <div className="text-white text-sm truncate max-w-[120px]">
                {user?.name || user?.email || 'Guest user'}
              </div>
              <div className="text-gray-500 text-xs">Account settings</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/login')
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-red-400 hover:bg-[#0f1535] transition-colors"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-3 h-3" />
            <span>Log out</span>
          </div>
        </button>
      </div>
    </aside>
  )
}
