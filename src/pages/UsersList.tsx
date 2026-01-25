import { Users, Mail, Building, MapPin, Calendar } from 'lucide-react'
import Header from '../components/Header'

export default function UsersList() {
  const professionals = [
    {
      name: 'Dr. Sarah Chen',
      title: 'AI Research Lead',
      company: 'Google Research',
      location: 'San Francisco, CA',
      email: 'sarah.chen@google.com',
      events: 12,
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      title: 'CTO',
      company: 'FinTech Solutions',
      location: 'New York, NY',
      email: 'mike.rodriguez@fintech.com',
      events: 8,
      avatar: 'MR'
    },
    {
      name: 'Priya Sharma',
      title: 'Head of Security',
      company: 'Microsoft',
      location: 'Seattle, WA',
      email: 'priya.sharma@microsoft.com',
      events: 15,
      avatar: 'PS'
    },
    {
      name: 'James Wilson',
      title: 'Quantum Computing Lead',
      company: 'IBM Research',
      location: 'Austin, TX',
      email: 'james.wilson@ibm.com',
      events: 6,
      avatar: 'JW'
    },
    {
      name: 'Dr. Elena Petrova',
      title: 'Biotech Director',
      company: 'Novartis',
      location: 'Boston, MA',
      email: 'elena.petrova@novartis.com',
      events: 10,
      avatar: 'EP'
    },
    {
      name: 'David Kim',
      title: 'Cloud Architect',
      company: 'Amazon Web Services',
      location: 'Seattle, WA',
      email: 'david.kim@aws.com',
      events: 7,
      avatar: 'DK'
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Professional Directory"
        subtitle="Connect with industry professionals and thought leaders"
      />

      <div className="metric-card mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Network Overview</h3>
            <p className="text-slate-400 text-sm">Connect with professionals across industries</p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search professionals..."
              className="input-field flex-1 min-w-[200px]"
            />
            <select className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Industries</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Science</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((user, index) => (
          <div key={index} className="metric-card group hover:border-blue-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-blue-500/30">
                  {user.avatar}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{user.name}</h3>
                  <p className="text-blue-400 text-sm">{user.title}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-blue-400 transition-colors">
                <Users className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Building className="w-4 h-4" />
                <span>{user.company}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{user.events} events attended</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-secondary text-sm">
                View Profile
              </button>
              <button className="flex-1 btn-primary text-sm">
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}