import { Calendar, Users, DollarSign, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react'
import Header from '../components/Header'
import MetricCard from '../components/MetricCard'
import { useEvents } from '../context/EventsContext'

export default function AdminDashboard() {
  const { events, bookings, updateEventStatus } = useEvents()

  const pendingEvents = events.filter(e => e.status === 'pending')
  const approvedEvents = events.filter(e => e.status === 'approved')
  const totalBookings = bookings.filter(b => b.status === 'confirmed').length
  const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.totalPrice, 0)

  const handleApprove = (eventId: string) => {
    try {
      updateEventStatus(eventId, 'approved')
      alert('Event approved successfully!')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to approve event')
    }
  }

  const handleReject = (eventId: string) => {
    if (window.confirm('Are you sure you want to reject this event?')) {
      try {
        updateEventStatus(eventId, 'rejected')
        alert('Event rejected')
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to reject event')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Admin Dashboard"
        subtitle="Manage all events, users and platform analytics"
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Events"
          value={events.length.toString()}
          change="18%"
          isPositive={true}
          icon={Calendar}
          color="blue"
        />
        <MetricCard
          title="Pending Approval"
          value={pendingEvents.length.toString()}
          change="5%"
          isPositive={false}
          icon={Clock}
          color="orange"
        />
        <MetricCard
          title="Total Bookings"
          value={totalBookings.toString()}
          change="32%"
          isPositive={true}
          icon={Users}
          color="purple"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="28%"
          isPositive={true}
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Pending Events Section */}
      {pendingEvents.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl">Pending Events</h2>
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-sm font-semibold">
              {pendingEvents.length} awaiting review
            </span>
          </div>
          
          <div className="space-y-4">
            {pendingEvents.map(event => (
              <div key={event.id} className="metric-card border-2 border-orange-500/30">
                <div className="flex gap-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div>
                            <span className="text-slate-500">Organizer: </span>
                            <span className="text-white">{event.organizerName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Capacity: </span>
                            <span className="text-white">{event.capacity}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Price: </span>
                            <span className="text-white">${event.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                      <button
                        onClick={() => handleApprove(event.id)}
                        className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2 font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(event.id)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2 font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Events */}
      <div>
        <h2 className="text-white font-bold text-xl mb-4">All Events</h2>
        <div className="metric-card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-slate-400 font-semibold text-sm pb-3">Event</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-3">Organizer</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-3">Date</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-3">Status</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-3">Bookings</th>
                <th className="text-left text-slate-400 font-semibold text-sm pb-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => {
                const eventBookings = bookings.filter(b => b.eventId === event.id && b.status === 'confirmed')
                const revenue = eventBookings.reduce((sum, b) => sum + b.totalPrice, 0)

                return (
                  <tr key={event.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={event.image} alt={event.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <div className="text-white font-medium">{event.title}</div>
                          <div className="text-slate-500 text-xs">{event.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-300">{event.organizerName}</td>
                    <td className="py-4 text-slate-300 text-sm">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="py-4">
                      <span className={`badge ${
                        event.status === 'approved' ? 'badge-success' :
                        event.status === 'pending' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-300">{eventBookings.length}</td>
                    <td className="py-4 text-green-400 font-semibold">${revenue}</td>
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