import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Users,
  Settings,
  Search,
  LogOut,
  Shield,
  BarChart3,
  MessageSquare,
  ChevronRight,
  Home,
  Star,
  DollarSign,
  Zap
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const userMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', active: location.pathname === '/' },
    { name: 'All pages', icon: Home, path: '/events', active: location.pathname === '/events' },
    { name: 'Reports', icon: BarChart3, path: '/my-bookings', active: location.pathname === '/my-bookings' },
    { name: 'Events', icon: Calendar, path: '/events', active: false },
    { name: 'Organizers', icon: Users, path: '/organizers', active: false },
  ]

  const organizerMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', active: location.pathname === '/' },
    { name: 'All pages', icon: Home, path: '/events', active: location.pathname === '/events' },
    { name: 'Reports', icon: BarChart3, path: '/my-bookings', active: false },
    { name: 'Events', icon: Calendar, path: '/organizer', active: location.pathname === '/organizer' },
    { name: 'Organizers', icon: Users, path: '/organizers', active: false },
  ]

  const adminMenuItems = [
    { name: 'Dashboard', icon: Shield, path: '/', active: location.pathname === '/' },
    { name: 'All pages', icon: Home, path: '/events', active: location.pathname === '/events' },
    { name: 'Reports', icon: BarChart3, path: '/reports', active: location.pathname === '/reports' },
    { name: 'Events', icon: Calendar, path: '/admin', active: location.pathname === '/admin' },
    { name: 'Organizers', icon: Users, path: '/users', active: location.pathname === '/users' },
  ]

  const menuItems = 
    user?.role === 'admin' ? adminMenuItems :
    user?.role === 'organizer' ? organizerMenuItems :
    userMenuItems

  const secondaryItems = [
    { name: 'Features', icon: Star, path: '/features' },
    { name: 'Users', icon: Users, path: '/users-list' },
    { name: 'Pricing', icon: DollarSign, path: '/pricing' },
    { name: 'Integrations', icon: Zap, path: '/integrations' },
  ]

  return (
    <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">EventHub</h1>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for..."
            className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-item ${item.active ? 'sidebar-item-active' : ''}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium flex-1">{item.name}</span>
              {item.active && (
                <ChevronRight className="w-4 h-4" />
              )}
            </Link>
          )
        })}

        {/* Secondary Section */}
        <div className="pt-6">
          {secondaryItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.path}
                className="sidebar-item"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium flex-1">{item.name}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )
          })}
        </div>

        {/* Messages & Settings */}
        <div className="pt-6 border-t border-slate-800/50 mt-6">
          <Link
            to="/messages"
            className={`sidebar-item ${location.pathname === '/messages' ? 'sidebar-item-active' : ''}`}
          >
            <MessageSquare className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium flex-1">Messages</span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">
              45
            </span>
          </Link>
          
          <Link
            to="/settings"
            className="sidebar-item"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium flex-1">Settings</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-800/50">
        <div className="bg-slate-800/50 rounded-xl p-4 mb-3 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">
                {user?.name || 'Guest'}
              </div>
              <div className="text-slate-400 text-xs truncate">Account settings</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
          </div>
          {user?.role && (
            <div className="flex items-center justify-center">
              <span className={`badge text-xs ${
                user.role === 'admin' ? 'badge-error' :
                user.role === 'organizer' ? 'badge-info' :
                'badge-success'
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
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log out</span>
        </button>

        {/* Get Template Button */}
        <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg py-3 px-4 font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2">
          Get template
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}