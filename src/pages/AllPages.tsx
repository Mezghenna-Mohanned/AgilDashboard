import { Link } from 'react-router-dom'
import { 
  Calendar, Users, BarChart3, Shield, Home, 
  MessageSquare, Settings, Star, DollarSign, Zap,
  ArrowRight, CheckCircle
} from 'lucide-react'
import Header from '../components/Header'

export default function AllPages() {
  const pages = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: Home, 
      description: 'Overview and analytics dashboard',
      accessible: true 
    },
    { 
      name: 'Events', 
      path: '/events', 
      icon: Calendar, 
      description: 'Browse and register for professional events',
      accessible: true 
    },
    { 
      name: 'My Bookings', 
      path: '/my-bookings', 
      icon: CheckCircle, 
      description: 'View and manage your event registrations',
      accessible: true 
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: BarChart3, 
      description: 'Analytics and performance reports',
      accessible: true 
    },
    { 
      name: 'Organizer Dashboard', 
      path: '/organizer', 
      icon: Users, 
      description: 'Manage events and track performance (Organizers only)',
      accessible: false,
      requiredRole: 'organizer'
    },
    { 
      name: 'Admin Dashboard', 
      path: '/admin', 
      icon: Shield, 
      description: 'Manage users and approve events (Admins only)',
      accessible: false,
      requiredRole: 'admin'
    },
    { 
      name: 'Users Management', 
      path: '/users', 
      icon: Users, 
      description: 'Manage user accounts and roles (Admins only)',
      accessible: false,
      requiredRole: 'admin'
    },
    { 
      name: 'Messages', 
      path: '/messages', 
      icon: MessageSquare, 
      description: 'View and send messages',
      accessible: true 
    },
    { 
      name: 'Features', 
      path: '/features', 
      icon: Star, 
      description: 'Explore platform features',
      accessible: true 
    },
    { 
      name: 'Users List', 
      path: '/users-list', 
      icon: Users, 
      description: 'Browse user directory',
      accessible: true 
    },
    { 
      name: 'Pricing', 
      path: '/pricing', 
      icon: DollarSign, 
      description: 'View pricing plans',
      accessible: true 
    },
    { 
      name: 'Integrations', 
      path: '/integrations', 
      icon: Zap, 
      description: 'Third-party integrations',
      accessible: true 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings, 
      description: 'Account and system settings',
      accessible: true 
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="All Pages"
        subtitle="Navigate to different sections of EventHub"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => {
          const Icon = page.icon
          return (
            <Link
              key={page.name}
              to={page.path}
              className={`metric-card group hover:border-blue-500/50 transition-all ${!page.accessible ? 'opacity-70' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                {!page.accessible && (
                  <span className="px-3 py-1 bg-slate-700/50 text-slate-400 border border-slate-600/50 rounded-full text-xs font-semibold">
                    {page.requiredRole?.toUpperCase()}
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-white font-bold text-lg mb-2 flex items-center justify-between">
                  {page.name}
                  <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-400 text-sm mb-4">{page.description}</p>
                
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  page.accessible 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {page.accessible ? 'Accessible' : `Requires ${page.requiredRole} role`}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}