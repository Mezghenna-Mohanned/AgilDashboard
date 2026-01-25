import { useAuth } from '../context/AuthContext'
import { useEvents } from '../context/EventsContext'
import { Calendar, Ticket, DollarSign, TrendingUp, MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()
  const { events, getUserBookings } = useEvents()
  
  const userBookings = getUserBookings()
  const activeBookings = userBookings.filter(b => b.status === 'confirmed')
  const approvedEvents = events.filter(e => e.status === 'approved')
  const upcomingEvents = approvedEvents
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6)

  const totalSpent = activeBookings.reduce((sum, b) => sum + b.totalPrice, 0)
  const totalTickets = activeBookings.reduce((sum, b) => sum + b.numberOfTickets, 0)

  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {firstName}! 👋</h1>
        <p className="text-gray-400">Discover amazing events and experiences</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{approvedEvents.length}</div>
              <div className="text-gray-400 text-sm">Available Events</div>
            </div>
          </div>
          <div className="text-xs text-green-400">+12 this week</div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{activeBookings.length}</div>
              <div className="text-gray-400 text-sm">My Bookings</div>
            </div>
          </div>
          <div className="text-xs text-blue-400">{totalTickets} tickets</div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">${totalSpent.toFixed(0)}</div>
              <div className="text-gray-400 text-sm">Total Spent</div>
            </div>
          </div>
          <div className="text-xs text-green-400">On {activeBookings.length} events</div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{upcomingEvents.length}</div>
              <div className="text-gray-400 text-sm">Upcoming Events</div>
            </div>
          </div>
          <div className="text-xs text-yellow-400">Next 30 days</div>
        </div>
      </div>

      {activeBookings.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">My Active Bookings</h2>
            <Link 
              to="/my-bookings"
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {activeBookings.slice(0, 2).map(booking => {
              const event = events.find(e => e.id === booking.eventId)
              if (!event) return null

              return (
                <div
                  key={booking.id}
                  className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden hover:border-purple-500/50 transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#1e293b]">
                      <div>
                        <div className="text-xs text-gray-400">Tickets</div>
                        <div className="text-white font-semibold">{booking.numberOfTickets}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">Total</div>
                        <div className="text-white font-semibold">${booking.totalPrice}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
          <Link 
            to="/events"
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            Browse all →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <Link
              key={event.id}
              to="/events"
              className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden hover:border-purple-500/50 transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs font-medium rounded">
                    {event.category}
                  </span>
                  <span className="text-green-400 font-semibold">${event.price}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="bg-[#0f1535] rounded-xl border border-[#1e293b] p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No upcoming events</h3>
            <p className="text-gray-500 mb-6">Check back soon for new events!</p>
            <Link
              to="/events"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Browse All Events
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}