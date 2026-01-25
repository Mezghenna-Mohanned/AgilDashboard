import { useEvents } from '../context/EventsContext'
import { Calendar, MapPin, DollarSign, Ticket, X } from 'lucide-react'
import { useState } from 'react'

export default function MyBookings() {
  const { getUserBookings, cancelBooking, events } = useEvents()
  const bookings = getUserBookings()
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        cancelBooking(bookingId)
        setCancellingId(null)
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to cancel booking')
      }
    }
  }

  const activeBookings = bookings.filter(b => b.status === 'confirmed')
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
        <p className="text-gray-400">Manage all your event bookings in one place</p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Ticket className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{activeBookings.length}</div>
              <div className="text-gray-400 text-sm">Active Bookings</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <X className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{cancelledBookings.length}</div>
              <div className="text-gray-400 text-sm">Cancelled</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                ${activeBookings.reduce((sum, b) => sum + b.totalPrice, 0).toFixed(2)}
              </div>
              <div className="text-gray-400 text-sm">Total Spent</div>
            </div>
          </div>
        </div>
      </div>

      {activeBookings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Active Bookings</h2>
          <div className="space-y-4">
            {activeBookings.map(booking => {
              const event = events.find(e => e.id === booking.eventId)
              if (!event) return null

              return (
                <div
                  key={booking.id}
                  className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden hover:border-purple-500/50 transition-all"
                >
                  <div className="flex gap-6 p-6">
                    <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                          Confirmed
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-[#0a0e27] p-3 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Tickets</div>
                          <div className="text-white font-semibold">{booking.numberOfTickets}</div>
                        </div>
                        <div className="bg-[#0a0e27] p-3 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Total Price</div>
                          <div className="text-white font-semibold">${booking.totalPrice}</div>
                        </div>
                        <div className="bg-[#0a0e27] p-3 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Booking Date</div>
                          <div className="text-white font-semibold">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          View Ticket
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {cancelledBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Cancelled Bookings</h2>
          <div className="space-y-4">
            {cancelledBookings.map(booking => {
              const event = events.find(e => e.id === booking.eventId)
              if (!event) return null

              return (
                <div
                  key={booking.id}
                  className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden opacity-60"
                >
                  <div className="flex gap-6 p-6">
                    <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 grayscale">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                          Cancelled
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#0a0e27] p-3 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Tickets</div>
                          <div className="text-white font-semibold">{booking.numberOfTickets}</div>
                        </div>
                        <div className="bg-[#0a0e27] p-3 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Refund Amount</div>
                          <div className="text-white font-semibold">${booking.totalPrice}</div>
                        </div>
                        <div className="bg-[#0a0e27] p-3 rounded-lg">
                          <div className="text-gray-400 text-xs mb-1">Cancellation Date</div>
                          <div className="text-white font-semibold">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {bookings.length === 0 && (
        <div className="text-center py-20">
          <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6">Start exploring events and book your first ticket!</p>
          <a
            href="/events"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Browse Events
          </a>
        </div>
      )}
    </div>
  )
}