import { Search, MoreVertical, Mail, Shield, User as UserIcon, Calendar } from 'lucide-react'
import Header from '../components/Header'
import MetricCard from '../components/MetricCard'

// Mock users data
const users = [
  { id: '1', name: 'Admin User', email: 'admin@eventhub.com', role: 'admin', joinedDate: '2025-01-01', events: 0, bookings: 0 },
  { id: '2', name: 'John Organizer', email: 'organizer@eventhub.com', role: 'organizer', joinedDate: '2025-12-15', events: 5, bookings: 0 },
  { id: '3', name: 'Jane User', email: 'user@eventhub.com', role: 'user', joinedDate: '2026-01-10', events: 0, bookings: 3 },
  { id: '4', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'user', joinedDate: '2026-01-15', events: 0, bookings: 5 },
  { id: '5', name: 'Mike Chen', email: 'mike.chen@example.com', role: 'organizer', joinedDate: '2026-01-05', events: 3, bookings: 0 },
]

export default function Users() {
  const totalUsers = users.length
  const organizers = users.filter(u => u.role === 'organizer').length
  const regularUsers = users.filter(u => u.role === 'user').length
  const admins = users.filter(u => u.role === 'admin').length

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Users Management"
        subtitle="Manage all users and their roles"
        showSearch={true}
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Users"
          value={totalUsers.toString()}
          change="15%"
          isPositive={true}
          icon={UserIcon}
          color="blue"
        />
        <MetricCard
          title="Organizers"
          value={organizers.toString()}
          change="8%"
          isPositive={true}
          icon={Calendar}
          color="purple"
        />
        <MetricCard
          title="Regular Users"
          value={regularUsers.toString()}
          change="22%"
          isPositive={true}
          icon={UserIcon}
          color="green"
        />
        <MetricCard
          title="Administrators"
          value={admins.toString()}
          change="0%"
          isPositive={true}
          icon={Shield}
          color="red"
        />
      </div>

      {/* Users Table */}
      <div className="metric-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">All Users</h2>
          <div className="flex gap-3">
            <button className="btn-secondary text-sm">
              Export List
            </button>
            <button className="btn-primary text-sm">
              Add User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-slate-400 font-semibold text-sm pb-4">User</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-4">Role</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-4">Joined</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-4">Events</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-4">Bookings</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-slate-500 text-xs flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`badge ${
                      user.role === 'admin' ? 'badge-error' :
                      user.role === 'organizer' ? 'badge-info' :
                      'badge-success'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-slate-300 text-sm">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-slate-300">{user.events}</td>
                  <td className="py-4 text-slate-300">{user.bookings}</td>
                  <td className="py-4">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}