import { useState } from 'react'
import Header from '../components/Header'
import { Users as UsersIcon, UserPlus, Heart, Users as MultiUsersIcon, Search, Phone, MapPin, Building, Check, Edit, Trash2, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'

type UserStatus = 'Online' | 'Offline'

type User = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  company: string
  companyLogo: string
  status: UserStatus
  avatarColor: string
}

const mockUsers: User[] = [
  { id: '1', name: 'John Carter', email: 'john@google.com', phone: '+1 (234) 567-890', location: 'United States', company: 'Google', companyLogo: 'G', status: 'Online', avatarColor: 'bg-purple-500' },
  { id: '2', name: 'Sophie Moore', email: 'sophie@webflow.com', phone: '+44 20 1234 5678', location: 'United Kingdom', company: 'Webflow', companyLogo: 'W', status: 'Online', avatarColor: 'bg-blue-500' },
  { id: '3', name: 'Matt Cannon', email: 'matt@facebook.com', phone: '+61 2 9876 5432', location: 'Australia', company: 'Facebook', companyLogo: 'F', status: 'Offline', avatarColor: 'bg-green-500' },
  { id: '4', name: 'Max Balaban', email: 'max@twitter.com', phone: '+91 11 2345 6789', location: 'India', company: 'Twitter', companyLogo: 'T', status: 'Online', avatarColor: 'bg-pink-500' },
  { id: '5', name: 'Elena Moreau', email: 'elena@youtube.com', phone: '+1 (416) 555-1234', location: 'Canada', company: 'YouTube', companyLogo: 'Y', status: 'Online', avatarColor: 'bg-red-500' },
  { id: '6', name: 'Alex Rivera', email: 'alex@reddit.com', phone: '+1 (555) 123-4567', location: 'United States', company: 'Reddit', companyLogo: 'R', status: 'Offline', avatarColor: 'bg-orange-500' },
  { id: '7', name: 'Emma Wilson', email: 'emma@spotify.com', phone: '+1 (212) 555-7890', location: 'United States', company: 'Spotify', companyLogo: 'S', status: 'Online', avatarColor: 'bg-green-600' },
  { id: '8', name: 'Lucas Chen', email: 'lucas@pinterest.com', phone: '+1 (310) 555-2468', location: 'United States', company: 'Pinterest', companyLogo: 'P', status: 'Online', avatarColor: 'bg-red-600' },
  { id: '9', name: 'Olivia Brown', email: 'olivia@twitch.com', phone: '+1 (206) 555-3691', location: 'United States', company: 'Twitch', companyLogo: 'T', status: 'Offline', avatarColor: 'bg-purple-600' },
  { id: '10', name: 'James Taylor', email: 'james@linkedin.com', phone: '+1 (650) 555-4827', location: 'United States', company: 'LinkedIn', companyLogo: 'L', status: 'Online', avatarColor: 'bg-blue-600' },
]

export default function Users() {
  const [users] = useState<User[]>(mockUsers)
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  const totalUsers = 256
  const totalPages = Math.ceil(totalUsers / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers)
    if (newSelected.has(userId)) {
      newSelected.delete(userId)
    } else {
      newSelected.add(userId)
    }
    setSelectedUsers(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set())
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0f1535] text-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-[#1e293b]"
            />
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Add user
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-purple-400" />
            </div>
            <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">250</div>
          <div className="text-sm text-gray-400">Total Users</div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-yellow-400" />
            </div>
            <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">15</div>
          <div className="text-sm text-gray-400">New Users</div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-400" />
            </div>
            <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">200</div>
          <div className="text-sm text-gray-400">Top Users</div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <MultiUsersIcon className="w-6 h-6 text-blue-400" />
            </div>
            <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">35</div>
          <div className="text-sm text-gray-400">Other Users</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden">
        <div className="p-6 border-b border-[#1e293b] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">All Users</h2>
          <div className="text-sm text-gray-400">
            {startIndex + 1}-{Math.min(endIndex, totalUsers)} of {totalUsers}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e27] border-b border-[#1e293b]">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-600 bg-[#0f1535] text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <UsersIcon className="w-3 h-3" />
                    Name
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Phone className="w-3 h-3" />
                    Phone
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <MapPin className="w-3 h-3" />
                    Location
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Building className="w-3 h-3" />
                    Company
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Check className="w-3 h-3" />
                    Status
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#0a0e27] transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-4 h-4 rounded border-gray-600 bg-[#0f1535] text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{user.phone}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{user.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white text-xs font-semibold">
                        {user.companyLogo}
                      </div>
                      <span className="text-gray-300 text-sm">{user.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Online'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {startIndex + 1}-{Math.min(endIndex, totalUsers)} of {totalUsers}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="bg-[#0a0e27] border border-[#1e293b] text-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-[#1e293b] text-gray-400 hover:text-white hover:bg-[#0a0e27] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-[#1e293b] text-gray-400 hover:text-white hover:bg-[#0a0e27] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

