import { Star, CheckCircle, Zap, Shield, Globe, Users } from 'lucide-react'
import Header from '../components/Header'

export default function Features() {
  const features = [
    {
      icon: Star,
      title: 'Professional Event Discovery',
      description: 'Find and register for professional conferences, workshops, and seminars across various industries.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: CheckCircle,
      title: 'Easy Registration',
      description: 'Simple and secure registration process with instant confirmation and e-tickets.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get instant notifications about event changes, reminders, and important announcements.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security for all transactions and personal information.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access events from around the world with multi-language support.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Networking Tools',
      description: 'Connect with other professionals, speakers, and organizers through our platform.',
      color: 'from-red-500 to-pink-500'
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Platform Features"
        subtitle="Explore what makes EventHub the best choice for professional events"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="metric-card group hover:scale-[1.02] transition-transform">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>

      <div className="metric-card mt-6 text-center">
        <h3 className="text-white font-bold text-xl mb-4">Coming Soon</h3>
        <p className="text-slate-400 mb-4">We're constantly adding new features to enhance your experience:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            Mobile App
          </span>
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            Virtual Events
          </span>
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            AI Recommendations
          </span>
          <span className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50">
            Corporate Accounts
          </span>
        </div>
      </div>
    </div>
  )
}