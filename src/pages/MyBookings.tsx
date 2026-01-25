import { Calendar, MapPin, Ticket as TicketIcon, XCircle, CheckCircle } from 'lucide-react'
import Header from '../components/Header'
import { useEvents } from '../context/EventsContext'

export default function MyBookings() {
  const { events, getUserBookings, cancelBooking } = useEvents()
  const bookings = getUserBookings()

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        cancelBooking(bookingId)
        alert('Booking cancelled successfully')
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to cancel booking')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="My Bookings"
        subtitle="View and manage your event bookings"
      />

      {bookings.length === 0 ? (
        <div className="metric-card text-center py-16">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <TicketIcon className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-white font-semibold text-xl mb-2">No bookings yet</h3>
          <p className="text-slate-400 mb-6">Start exploring events and make your first booking!</p>
          <a href="/events" className="btn-primary inline-block">
            Browse Events
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const event = events.find(e => e.id === booking.eventId)
            if (!event) return null

            const isUpcoming = new Date(event.date) > new Date()
            const isCancelled = booking.status === 'cancelled'

            return (
              <div key={booking.id} className="metric-card">
                <div className="flex gap-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-2">{event.title}</h3>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <TicketIcon className="w-4 h-4 text-purple-400" />
                            <span>{booking.numberOfTickets} ticket(s)</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-slate-400 text-sm mb-1">Total Price</div>
                        <div className="text-white font-bold text-2xl mb-3">${booking.totalPrice}</div>
                        
                        {isCancelled ? (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-semibold">
                            <XCircle className="w-4 h-4" />
                            Cancelled
                          </span>
                        ) : isUpcoming ? (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-500/20 text-slate-400 border border-slate-500/30 rounded-lg text-sm font-semibold">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className="text-slate-400 text-sm">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                      
                      {!isCancelled && isUpcoming && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg transition-all text-sm font-medium"
                        >
                          Cancel Booking
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