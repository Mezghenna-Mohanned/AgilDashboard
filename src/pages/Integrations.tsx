import { Zap, Cloud, Database, Cpu, GitBranch, MessageSquare, Calendar, Users } from 'lucide-react'
import Header from '../components/Header'

export default function Integrations() {
  const integrations = [
    {
      icon: Calendar,
      name: 'Google Calendar',
      description: 'Sync events and bookings with your Google Calendar',
      status: 'Active',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Cloud,
      name: 'Microsoft 365',
      description: 'Integrate with Outlook and Office 365',
      status: 'Active',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Database,
      name: 'Salesforce',
      description: 'CRM integration for enterprise customers',
      status: 'Coming Soon',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Cpu,
      name: 'Slack',
      description: 'Team notifications and event reminders',
      status: 'Active',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: GitBranch,
      name: 'Zoom',
      description: 'Virtual event integration',
      status: 'Active',
      color: 'from-blue-600 to-blue-400'
    },
    {
      icon: MessageSquare,
      name: 'Teams',
      description: 'Microsoft Teams integration',
      status: 'Beta',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Users,
      name: 'HubSpot',
      description: 'Marketing automation integration',
      status: 'Coming Soon',
      color: 'from-orange-500 to-pink-500'
    },
    {
      icon: Zap,
      name: 'Zapier',
      description: 'Connect with 3000+ other apps',
      status: 'Active',
      color: 'from-red-500 to-orange-500'
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Integrations"
        subtitle="Connect EventHub with your favorite tools and services"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {integrations.map((integration, index) => {
          const Icon = integration.icon
          return (
            <div key={index} className="metric-card group hover:border-blue-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  integration.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : integration.status === 'Beta'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                }`}>
                  {integration.status}
                </span>
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{integration.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{integration.description}</p>
              
              <button className={`w-full py-2 rounded-lg text-sm font-medium ${
                integration.status === 'Active'
                  ? 'btn-primary'
                  : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 cursor-not-allowed'
              }`}>
                {integration.status === 'Active' ? 'Connect' : integration.status}
              </button>
            </div>
          )
        })}
      </div>

      <div className="metric-card">
        <h3 className="text-white font-bold text-xl mb-4">API Access</h3>
        <p className="text-slate-400 mb-4">
          Build custom integrations with our REST API. Access events, bookings, and user data programmatically.
        </p>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <code className="text-sm text-slate-300">
            curl -X GET "https://api.eventhub.com/v1/events" \<br/>
            &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"<br/>
          </code>
        </div>
        <button className="btn-primary">
          Request API Access
        </button>
      </div>
    </div>
  )
}