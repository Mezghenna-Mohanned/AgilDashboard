import { useState } from 'react'
import { Users as UsersIcon, UserPlus, Shield, Calendar } from 'lucide-react'

type UserRole = 'user' | 'organizer' | 'admin'

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  joinDate: string
}

const USERS_DB_KEY = 'eventhub_users_db'

function readUsers(): User[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(USERS_DB_KEY)
    if (!raw) return []
    const stored = JSON.parse(raw) as Array<User & { password: string }>
    return stored.map(({ id, name, email, role, joinDate = new Date().toISOString() }) => ({
      id,
      name,
      email,
      role,
      joinDate,
    }))
  } catch {
    return []
  }
}

export default function Users() {
  const [users] = useState<User[]>(readUsers())

  const totalUsers = users.length
  const userCount = users.filter(u => u.role === 'user').length
  const organizerCount = users.filter(u => u.role === 'organizer').length
  const adminCount = users.filter(u => u.role === 'admin').length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400">Manage all platform users</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{totalUsers}</div>
              <div className="text-gray-400 text-sm">Total Users</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{userCount}</div>
              <div className="text-gray-400 text-sm">Attendees</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{organizerCount}</div>
              <div className="text-gray-400 text-sm">Organizers</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{adminCount}</div>
              <div className="text-gray-400 text-sm">Admins</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden">
        <div className="p-6 border-b border-[#1e293b]">
          <h2 className="text-xl font-bold text-white">All Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e27] border-b border-[#1e293b]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-[#0a0e27] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-white font-medium">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                      user.role === 'organizer' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {new Date(user.joinDate).toLocaleDateString()}
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