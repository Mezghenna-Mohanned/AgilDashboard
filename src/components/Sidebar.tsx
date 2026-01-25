import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  Settings,
  Search,
  ChevronRight,
  LogOut,
  Shield,
  Plus,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const userMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', active: location.pathname === '/' },
    { name: 'Browse Events', icon: Calendar, path: '/events', active: location.pathname === '/events' },
    { name: 'My Bookings', icon: Ticket, path: '/my-bookings', active: location.pathname === '/my-bookings' },
  ]

  const organizerMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', active: location.pathname === '/' },
    { name: 'My Events', icon: Calendar, path: '/organizer', active: location.pathname === '/organizer' },
    { name: 'Browse Events', icon: Calendar, path: '/events', active: location.pathname === '/events' },
  ]

  const adminMenuItems = [
    { name: 'Dashboard', icon: Shield, path: '/', active: location.pathname === '/' },
    { name: 'All Events', icon: Calendar, path: '/admin', active: location.pathname === '/admin' },
    { name: 'Users', icon: Users, path: '/users', active: location.pathname === '/users' },
    { name: 'Browse Events', icon: Calendar, path: '/events', active: location.pathname === '/events' },
  ]

  const menuItems = 
    user?.role === 'admin' ? adminMenuItems :
    user?.role === 'organizer' ? organizerMenuItems :
    userMenuItems

  return (
    <aside className="w-64 bg-[#0a0e27] border-r border-[#1e293b] p-6 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">EventHub</h1>
        </div>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search..."
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
              {item.active && <ChevronRight className="w-4 h-4" />}
            </Link>
          )
        })}

        {user?.role === 'organizer' && (
          <Link
            to="/organizer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium bg-purple-600/20 text-purple-400 border border-purple-600/50 hover:bg-purple-600/30 transition-colors mt-4"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </div>
          </Link>
        )}

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
        <div className="px-3 py-2 bg-[#0f1535] rounded-lg border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">
                {user?.name || 'Guest'}
              </div>
              <div className="text-gray-500 text-xs truncate">{user?.email}</div>
            </div>
          </div>
          {user?.role && (
            <div className="flex items-center justify-center">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                user.role === 'organizer' ? 'bg-blue-500/20 text-blue-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/login')
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}