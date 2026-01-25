import { useState } from 'react'
import { Calendar, MapPin, Users, DollarSign, Plus, Edit2, Trash2 } from 'lucide-react'
import Header from '../components/Header'
import MetricCard from '../components/MetricCard'
import { useEvents } from '../context/EventsContext'

export default function OrganizerDashboard() {
  const { getOrganizerEvents, createEvent, events, bookings } = useEvents()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Technology',
    price: 0,
    capacity: 100,
    image: ''
  })

  const organizerEvents = getOrganizerEvents()
  const pendingEvents = organizerEvents.filter(e => e.status === 'pending')
  const approvedEvents = organizerEvents.filter(e => e.status === 'approved')
  const totalBookings = bookings.filter(b => 
    organizerEvents.some(e => e.id === b.eventId) && b.status === 'confirmed'
  ).length
  const totalRevenue = bookings
    .filter(b => organizerEvents.some(e => e.id === b.eventId) && b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      createEvent({
        ...formData,
        image: formData.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      })
      alert('Event created successfully! Waiting for admin approval.')
      setShowCreateModal(false)
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'Technology',
        price: 0,
        capacity: 100,
        image: ''
      })
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create event')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Organizer Dashboard"
        subtitle="Manage your events and track performance"
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Events"
          value={organizerEvents.length.toString()}
          change="12%"
          isPositive={true}
          icon={Calendar}
          color="blue"
        />
        <MetricCard
          title="Approved Events"
          value={approvedEvents.length.toString()}
          change="8%"
          isPositive={true}
          icon={Calendar}
          color="green"
        />
        <MetricCard
          title="Total Bookings"
          value={totalBookings.toString()}
          change="24%"
          isPositive={true}
          icon={Users}
          color="purple"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="15%"
          isPositive={true}
          icon={DollarSign}
          color="orange"
        />
      </div>

      {/* Create Event Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Event
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {pendingEvents.length > 0 && (
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Pending Approval</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingEvents.map(event => (
                <div key={event.id} className="metric-card border-2 border-yellow-500/30">
                  <div className="flex gap-4">
                    <img src={event.image} alt={event.title} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">{event.title}</h4>
                      <div className="space-y-1 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </div>
                      </div>
                      <span className="inline-block mt-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Approved Events</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {approvedEvents.map(event => {
              const eventBookings = bookings.filter(b => b.eventId === event.id && b.status === 'confirmed')
              const revenue = eventBookings.reduce((sum, b) => sum + b.totalPrice, 0)

              return (
                <div key={event.id} className="metric-card">
                  <div className="flex gap-4">
                    <img src={event.image} alt={event.title} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold">{event.title}</h4>
                        <div className="flex gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-slate-400 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-slate-500">Bookings: </span>
                          <span className="text-white font-semibold">{eventBookings.length}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Revenue: </span>
                          <span className="text-green-400 font-semibold">${revenue}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Seats: </span>
                          <span className="text-white font-semibold">{event.availableSeats}/{event.capacity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8">
            <h3 className="text-white font-bold text-xl mb-6">Create New Event</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field"
                    placeholder="Amazing Conference 2026"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Describe your event..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                    placeholder="Convention Center, City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option>Technology</option>
                    <option>Music</option>
                    <option>Business</option>
                    <option>Food</option>
                    <option>Art</option>
                    <option>Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Capacity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="input-field"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
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