import { useEvents } from '../context/EventsContext'
import { Calendar, Users, DollarSign, TrendingUp, Check, X, Clock } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const { events, bookings, updateEventStatus } = useEvents()

  const handleApprove = (eventId: string) => {
    try {
      updateEventStatus(eventId, 'approved')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to approve event')
    }
  }

  const handleReject = (eventId: string) => {
    if (window.confirm('Are you sure you want to reject this event?')) {
      try {
        updateEventStatus(eventId, 'rejected')
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to reject event')
      }
    }
  }

  const pendingEvents = events.filter(e => e.status === 'pending')
  const approvedEvents = events.filter(e => e.status === 'approved')
  const rejectedEvents = events.filter(e => e.status === 'rejected')

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0)

  const totalTicketsSold = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.numberOfTickets, 0)

  const categoryData = events.reduce((acc, event) => {
    const existing = acc.find(item => item.category === event.category)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ category: event.category, count: 1 })
    }
    return acc
  }, [] as Array<{ category: string; count: number }>)

  const monthlyRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, booking) => {
      const month = new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short' })
      const existing = acc.find(item => item.month === month)
      if (existing) {
        existing.revenue += booking.totalPrice
      } else {
        acc.push({ month, revenue: booking.totalPrice })
      }
      return acc
    }, [] as Array<{ month: string; revenue: number }>)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage events and monitor platform performance</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{events.length}</div>
              <div className="text-gray-400 text-sm">Total Events</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">↑ {approvedEvents.length} approved</span>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
              <div className="text-gray-400 text-sm">Total Revenue</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">↑ 12.5% from last month</span>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{totalTicketsSold}</div>
              <div className="text-gray-400 text-sm">Tickets Sold</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">↑ {bookings.length} bookings</span>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{pendingEvents.length}</div>
              <div className="text-gray-400 text-sm">Pending Approval</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-400">Requires attention</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1535',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <h3 className="text-lg font-semibold text-white mb-6">Events by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '11px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1535',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="count" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {pendingEvents.length > 0 && (
        <div className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden mb-8">
          <div className="p-6 border-b border-[#1e293b] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Pending Events</h2>
              <p className="text-sm text-gray-400 mt-1">Review and approve events submitted by organizers</p>
            </div>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-medium rounded-full">
              {pendingEvents.length} pending
            </span>
          </div>

          <div className="divide-y divide-[#1e293b]">
            {pendingEvents.map(event => (
              <div key={event.id} className="p-6 hover:bg-[#0a0e27] transition-colors">
                <div className="flex gap-6">
                  <div className="w-40 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.capacity} capacity</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>${event.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleApprove(event.id)}
                        className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(event.id)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                      <div className="flex-1"></div>
                      <span className="text-sm text-gray-500">
                        By {event.organizerName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden">
        <div className="p-6 border-b border-[#1e293b]">
          <h2 className="text-xl font-bold text-white">All Events</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e27] border-b border-[#1e293b]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Organizer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tickets
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {events.map(event => {
                const eventBookings = bookings.filter(b => b.eventId === event.id && b.status === 'confirmed')
                const ticketsSold = eventBookings.reduce((sum, b) => sum + b.numberOfTickets, 0)
                const revenue = eventBookings.reduce((sum, b) => sum + b.totalPrice, 0)

                return (
                  <tr key={event.id} className="hover:bg-[#0a0e27] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{event.title}</div>
                          <div className="text-gray-400 text-sm">{event.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">{event.organizerName}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {ticketsSold} / {event.capacity}
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm font-medium">
                      ${revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        event.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}