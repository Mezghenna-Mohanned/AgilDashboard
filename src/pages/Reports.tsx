import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Calendar, ArrowDown } from 'lucide-react'

const deviceData = [
  { name: 'Desktop', value: 15624, color: '#a855f7' },
  { name: 'Phone', value: 5546, color: '#06b6d4' },
  { name: 'Laptop', value: 2478, color: '#ec4899' },
]

const bookings = [
  { id: '#11242', date: 'Dec 30, 10:08 AM', status: 'Paid', total: '$329.40', statusColor: 'bg-green-500' },
  { id: '#11241', date: 'Dec 28, 2:59 AM', status: 'Pending', total: '$817.24', statusColor: 'bg-yellow-500' },
  { id: '#11240', date: 'Dec 26, 12:54 AM', status: 'Pending', total: '$82.16', statusColor: 'bg-yellow-500' },
  { id: '#11239', date: 'Dec 25, 2:37 PM', status: 'Paid', total: '$360.52', statusColor: 'bg-green-500' },
  { id: '#11238', date: 'Dec 21, 2:10 PM', status: 'Pending', total: '$245.79', statusColor: 'bg-yellow-500' },
  { id: '#11237', date: 'Dec 18, 9:48 AM', status: 'Paid', total: '$84.00', statusColor: 'bg-green-500' },
]

const countryData = [
  { name: 'United States', value: 30, users: '3.7K' },
  { name: 'United Kingdom', value: 20, users: '2.5K' },
  { name: 'Canada', value: 20, users: '2.5K' },
  { name: 'Australia', value: 15, users: '1.9K' },
  { name: 'Spain', value: 15, users: '1.9K' },
]

const totalUsers = deviceData.reduce((sum, item) => sum + item.value, 0)

export default function Reports() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            Get template →
          </button>
          <h1 className="text-3xl font-bold text-white">Reports overview</h1>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <button className="px-4 py-2 bg-[#0f1535] text-white rounded-lg text-sm font-medium hover:bg-[#1a2147] transition-colors flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Select date
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0f1535] text-white rounded-lg text-sm font-medium hover:bg-[#1a2147] transition-colors flex items-center gap-2">
            Export data
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Create report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-white">{totalUsers.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">Users by device</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {deviceData.map((device) => (
              <div key={device.name} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: device.color }}></div>
                  <span className="text-gray-400 text-sm">{device.name} users</span>
                </div>
                <span className="text-white font-medium">{device.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold">Recent booking</h3>
            <button className="px-3 py-1 bg-[#0a0e27] text-gray-400 rounded text-sm flex items-center gap-2 border border-[#1e293b]">
              <Calendar className="w-4 h-4" />
              Jan 2024
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e293b]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      Order
                      <div className="w-3 h-3 rounded bg-purple-500"></div>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      Date
                      <Calendar className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    <div className="flex items-center gap-2">
                      Status
                      <div className="w-3 h-3 rounded bg-purple-500"></div>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#1e293b] hover:bg-[#0a0e27] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="text-white text-sm">{booking.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{booking.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white text-sm font-medium">{booking.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold mb-1">Users by country</h3>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">12.4K</span>
                <span className="text-green-400 text-sm">+8.2%</span>
              </div>
            </div>
            <button className="px-3 py-1 bg-[#0a0e27] text-gray-400 rounded text-sm flex items-center gap-2 border border-[#1e293b]">
              Export
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {countryData.map((country) => (
              <div key={country.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{country.name}</span>
                  <span className="text-white text-sm">{country.value}%</span>
                </div>
                <div className="w-full bg-[#0a0e27] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${country.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30">
                <circle cx="200" cy="150" r="8" fill="#a855f7" className="animate-pulse" />
                <circle cx="150" cy="180" r="6" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                <circle cx="450" cy="200" r="10" fill="#ec4899" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                <circle cx="750" cy="250" r="7" fill="#a855f7" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                <circle cx="850" cy="300" r="9" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: '0.8s' }} />

                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#6366f1" opacity="0.3" />
                </pattern>
                <rect width="1000" height="500" fill="url(#dots)" />
              </svg>

              <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-cyan-400"></div>
                    </div>
                  </div>
                  <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 bg-[#0a0e27] px-3 py-2 rounded-lg border border-cyan-400">
                    <div className="text-cyan-400 text-xs font-medium">1.86 K</div>
                    <div className="text-gray-400 text-xs">Mumbai</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
