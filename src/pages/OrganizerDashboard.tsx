import { useState } from 'react'
import { useEvents } from '../context/EventsContext'
import { Calendar, Plus, Users, DollarSign, Eye, Clock, MapPin, X } from 'lucide-react'

export default function OrganizerDashboard() {
  const { getOrganizerEvents, createEvent, bookings, events } = useEvents()
  const organizerEvents = getOrganizerEvents()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Technology',
    price: 0,
    capacity: 0,
    image: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      createEvent(formData)
      setShowCreateModal(false)
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'Technology',
        price: 0,
        capacity: 0,
        image: ''
      })
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create event')
    }
  }

  const categories = ['Technology', 'Music', 'Business', 'Food', 'Art', 'Sports']

  const totalRevenue = organizerEvents.reduce((sum, event) => {
    const eventBookings = bookings.filter(b => b.eventId === event.id && b.status === 'confirmed')
    return sum + eventBookings.reduce((bSum, b) => bSum + b.totalPrice, 0)
  }, 0)

  const totalTicketsSold = organizerEvents.reduce((sum, event) => {
    const eventBookings = bookings.filter(b => b.eventId === event.id && b.status === 'confirmed')
    return sum + eventBookings.reduce((bSum, b) => bSum + b.numberOfTickets, 0)
  }, 0)

  const pendingEvents = organizerEvents.filter(e => e.status === 'pending').length
  const approvedEvents = organizerEvents.filter(e => e.status === 'approved').length

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Organizer Dashboard</h1>
          <p className="text-gray-400">Manage your events and track performance</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{organizerEvents.length}</div>
              <div className="text-gray-400 text-sm">Total Events</div>
            </div>
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
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{pendingEvents}</div>
              <div className="text-gray-400 text-sm">Pending Approval</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f1535] rounded-xl border border-[#1e293b] overflow-hidden">
        <div className="p-6 border-b border-[#1e293b]">
          <h2 className="text-xl font-bold text-white">My Events</h2>
        </div>

        <div className="divide-y divide-[#1e293b]">
          {organizerEvents.map(event => {
            const eventBookings = bookings.filter(b => b.eventId === event.id && b.status === 'confirmed')
            const ticketsSold = eventBookings.reduce((sum, b) => sum + b.numberOfTickets, 0)
            const revenue = eventBookings.reduce((sum, b) => sum + b.totalPrice, 0)

            return (
              <div key={event.id} className="p-6 hover:bg-[#0a0e27] transition-colors">
                <div className="flex gap-6">
                  <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
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
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        event.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-[#0a0e27] p-3 rounded-lg">
                        <div className="text-gray-400 text-xs mb-1">Tickets Sold</div>
                        <div className="text-white font-semibold">{ticketsSold} / {event.capacity}</div>
                      </div>
                      <div className="bg-[#0a0e27] p-3 rounded-lg">
                        <div className="text-gray-400 text-xs mb-1">Available</div>
                        <div className="text-white font-semibold">{event.availableSeats}</div>
                      </div>
                      <div className="bg-[#0a0e27] p-3 rounded-lg">
                        <div className="text-gray-400 text-xs mb-1">Revenue</div>
                        <div className="text-white font-semibold">${revenue.toFixed(2)}</div>
                      </div>
                      <div className="bg-[#0a0e27] p-3 rounded-lg">
                        <div className="text-gray-400 text-xs mb-1">Price</div>
                        <div className="text-white font-semibold">${event.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {organizerEvents.length === 0 && (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No events yet</h3>
              <p className="text-gray-500 mb-6">Create your first event to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Event
              </button>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50">
          <div className="bg-[#0f1535] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#1e293b]">
            <div className="p-6 border-b border-[#1e293b] flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Create New Event</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-lg bg-[#0a0e27] hover:bg-[#1a2147] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your event"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Event location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#0a0e27] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 px-4 bg-[#0a0e27] text-gray-300 rounded-lg font-medium hover:bg-[#1a2147] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}