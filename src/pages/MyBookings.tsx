import { Calendar, MapPin, Ticket as TicketIcon, XCircle, CheckCircle, AlertCircle } from 'lucide-react'
import Header from '../components/Header'
import { useEvents } from '../context/EventsContext'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function MyBookings() {
  const { events, getUserBookings, cancelBooking } = useEvents()
  const { user } = useAuth()
  const bookings = getUserBookings()

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?\nCancellation may be subject to terms.')) {
      try {
        cancelBooking(bookingId)
        alert('✅ Booking cancelled successfully')
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to cancel booking')
      }
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header 
          title="My Bookings"
          subtitle="View and manage your event registrations"
        />
        <div className="metric-card text-center py-16">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-xl mb-2">Authentication Required</h3>
          <p className="text-slate-400 mb-6">Please log in to view your bookings</p>
          <Link to="/login" className="btn-primary inline-block">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="My Bookings"
        subtitle="View and manage your event registrations"
      />

      {bookings.length === 0 ? (
        <div className="metric-card text-center py-16">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <TicketIcon className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-white font-semibold text-xl mb-2">No bookings yet</h3>
          <p className="text-slate-400 mb-6">Start exploring events and make your first booking!</p>
          <Link to="/events" className="btn-primary inline-block">
            Browse Professional Events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => {
            const event = events.find(e => e.id === booking.eventId)
            if (!event) return null

            const isUpcoming = new Date(event.date) > new Date()
            const isPast = new Date(event.date) < new Date()
            const isToday = new Date(event.date).toDateString() === new Date().toDateString()

            return (
              <div key={booking.id} className="metric-card">
                <div className="flex flex-col lg:flex-row gap-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full lg:w-48 h-48 lg:h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-xl mb-3">{event.title}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span>{new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <TicketIcon className="w-4 h-4 text-purple-400" />
                            <span>{booking.numberOfTickets} ticket(s) • Booking ID: {booking.id.slice(0, 8)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:text-right">
                        <div className="text-slate-400 text-sm mb-1">Total Amount</div>
                        <div className="text-white font-bold text-2xl mb-3">${booking.totalPrice}</div>
                        
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                          isPast 
                            ? 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                            : isToday
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                          {isPast ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Completed
                            </>
                          ) : isToday ? (
                            <>
                              <Calendar className="w-4 h-4" />
                              Happening Today
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Confirmed
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-700/50 gap-4">
                      <div className="text-slate-400 text-sm">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString()} • 
                        Category: <span className="text-blue-400">{event.category}</span>
                      </div>
                      
                      {isUpcoming && !isToday && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg transition-all text-sm font-medium flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel Registration
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}