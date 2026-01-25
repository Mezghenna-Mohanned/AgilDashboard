import { useState } from 'react'
import { Calendar, MapPin, Users, DollarSign, Search, Filter, ChevronDown, Star } from 'lucide-react'
import Header from '../components/Header'
import { useEvents } from '../context/EventsContext'
import { useAuth } from '../context/AuthContext'

export default function Events() {
  const { events, bookEvent } = useEvents()
  const { user } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [numberOfTickets, setNumberOfTickets] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showBookingModal, setShowBookingModal] = useState(false)

  const approvedEvents = events.filter(e => e.status === 'approved')
  
  const filteredEvents = approvedEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(events.map(e => e.category)))]

  const handleBooking = async (eventId: string) => {
    setSelectedEvent(eventId)
    setShowBookingModal(true)
  }

  const confirmBooking = async () => {
    if (!selectedEvent) return
    
    try {
      bookEvent(selectedEvent, numberOfTickets)
      alert('Booking successful!')
      setShowBookingModal(false)
      setNumberOfTickets(1)
      setSelectedEvent(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Booking failed')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Browse Events"
        subtitle="Discover and book amazing events happening near you"
        showSearch={false}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <button className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-700/50 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="metric-card group overflow-hidden">
            <div className="relative h-48 overflow-hidden rounded-lg mb-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-blue-400/30">
                  {event.category}
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <button className="w-9 h-9 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-yellow-400 hover:bg-slate-900 transition-all">
                  <Star className="w-4 h-4 fill-yellow-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2">
                  {event.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>{event.availableSeats} / {event.capacity} seats available</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <div>
                  <div className="text-slate-400 text-xs">Price</div>
                  <div className="text-white font-bold text-xl flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {event.price}
                  </div>
                </div>
                <button
                  onClick={() => handleBooking(event.id)}
                  disabled={event.availableSeats === 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {event.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-white font-semibold text-xl mb-2">No events found</h3>
          <p className="text-slate-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            {(() => {
              const event = events.find(e => e.id === selectedEvent)
              if (!event) return null
              
              return (
                <>
                  <h3 className="text-white font-bold text-xl mb-4">Book Event</h3>
                  <div className="space-y-4">
                    <div>
                      <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                      <h4 className="text-white font-semibold">{event.title}</h4>
                      <p className="text-slate-400 text-sm">{event.location}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Number of Tickets
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={event.availableSeats}
                        value={numberOfTickets}
                        onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
                        className="input-field"
                      />
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Price per ticket</span>
                        <span className="text-white font-semibold">${event.price}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Number of tickets</span>
                        <span className="text-white font-semibold">{numberOfTickets}</span>
                      </div>
                      <div className="border-t border-slate-700/50 pt-2 mt-2 flex justify-between">
                        <span className="text-white font-semibold">Total</span>
                        <span className="text-blue-400 font-bold text-lg">${event.price * numberOfTickets}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowBookingModal(false)
                          setNumberOfTickets(1)
                          setSelectedEvent(null)
                        }}
                        className="flex-1 btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmBooking}
                        className="flex-1 btn-primary"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}