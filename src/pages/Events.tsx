import { useState } from 'react'
import { useEvents } from '../context/EventsContext'
import { useAuth } from '../context/AuthContext'
import { Search, Calendar, MapPin, Users, DollarSign, Clock, Filter, X } from 'lucide-react'

export default function Events() {
  const { events, bookEvent } = useEvents()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [numberOfTickets, setNumberOfTickets] = useState(1)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)

  const categories = ['all', 'Technology', 'Music', 'Business', 'Food', 'Art', 'Sports']

  const approvedEvents = events.filter(e => e.status === 'approved')

  const filteredEvents = approvedEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBooking = async () => {
    if (!selectedEvent) return
    
    setBookingError(null)
    setBookingSuccess(false)

    try {
      bookEvent(selectedEvent, numberOfTickets)
      setBookingSuccess(true)
      setSelectedEvent(null)
      setNumberOfTickets(1)
      setTimeout(() => setBookingSuccess(false), 3000)
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Booking failed')
    }
  }

  const selectedEventData = events.find(e => e.id === selectedEvent)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Discover Events</h1>
        <p className="text-gray-400">Find and book amazing events happening near you</p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events by name, location, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0f1535] text-white rounded-lg py-3 pl-12 pr-4 border border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="px-6 py-3 bg-[#0f1535] text-white rounded-lg border border-[#1e293b] hover:bg-[#1a2147] transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="mb-8 flex gap-2 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-[#0f1535] text-gray-400 hover:text-white border border-[#1e293b]'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {bookingSuccess && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">Booking Confirmed!</div>
              <div className="text-green-200 text-sm">Your tickets have been reserved successfully</div>
            </div>
          </div>
          <button onClick={() => setBookingSuccess(false)}>
            <X className="w-5 h-5 text-green-200 hover:text-white" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden hover:border-purple-500/50 transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                {event.category}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>{event.availableSeats} / {event.capacity} seats available</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-bold text-white">{event.price}</span>
                </div>
                <button
                  onClick={() => setSelectedEvent(event.id)}
                  disabled={event.availableSeats === 0}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    event.availableSeats === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                  }`}
                >
                  {event.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {selectedEvent && selectedEventData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
          <div className="bg-[#0f1535] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#1e293b]">
            <div className="relative h-64">
              <img
                src={selectedEventData.image}
                alt={selectedEventData.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setSelectedEvent(null)
                  setBookingError(null)
                  setNumberOfTickets(1)
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">{selectedEventData.title}</h2>
              <p className="text-gray-300 mb-6">{selectedEventData.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0a0e27] p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Date & Time</span>
                  </div>
                  <div className="text-white font-medium">
                    {new Date(selectedEventData.date).toLocaleDateString()}
                  </div>
                  <div className="text-gray-400 text-sm">{selectedEventData.time}</div>
                </div>

                <div className="bg-[#0a0e27] p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <div className="text-white font-medium">{selectedEventData.location}</div>
                </div>

                <div className="bg-[#0a0e27] p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Price per ticket</span>
                  </div>
                  <div className="text-white font-medium text-xl">${selectedEventData.price}</div>
                </div>

                <div className="bg-[#0a0e27] p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Available Seats</span>
                  </div>
                  <div className="text-white font-medium">{selectedEventData.availableSeats} / {selectedEventData.capacity}</div>
                </div>
              </div>

              <div className="bg-[#0a0e27] p-6 rounded-lg mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Number of Tickets
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setNumberOfTickets(Math.max(1, numberOfTickets - 1))}
                    className="w-10 h-10 bg-[#0f1535] border border-[#1e293b] rounded-lg text-white hover:bg-[#1a2147] transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={selectedEventData.availableSeats}
                    value={numberOfTickets}
                    onChange={(e) => setNumberOfTickets(Math.min(selectedEventData.availableSeats, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="flex-1 bg-[#0f1535] border border-[#1e293b] rounded-lg px-4 py-2 text-white text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => setNumberOfTickets(Math.min(selectedEventData.availableSeats, numberOfTickets + 1))}
                    className="w-10 h-10 bg-[#0f1535] border border-[#1e293b] rounded-lg text-white hover:bg-[#1a2147] transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between text-lg">
                  <span className="text-gray-400">Total Price:</span>
                  <span className="text-2xl font-bold text-white">
                    ${(selectedEventData.price * numberOfTickets).toFixed(2)}
                  </span>
                </div>
              </div>

              {bookingError && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-red-400 text-sm">{bookingError}</p>
                </div>
              )}

              <button
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}