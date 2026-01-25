import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

export type EventStatus = 'pending' | 'approved' | 'rejected'

export type Event = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  price: number
  capacity: number
  availableSeats: number
  image: string
  organizerId: string
  organizerName: string
  status: EventStatus
  createdAt: string
}

export type Booking = {
  id: string
  eventId: string
  userId: string
  userName: string
  userEmail: string
  numberOfTickets: number
  totalPrice: number
  bookingDate: string
  status: 'confirmed' | 'cancelled'
}

type EventsContextType = {
  events: Event[]
  bookings: Booking[]
  createEvent: (event: Omit<Event, 'id' | 'organizerId' | 'organizerName' | 'status' | 'createdAt' | 'availableSeats'>) => void
  updateEventStatus: (eventId: string, status: EventStatus) => void
  bookEvent: (eventId: string, numberOfTickets: number) => void
  cancelBooking: (bookingId: string) => void
  getUserBookings: () => Booking[]
  getOrganizerEvents: () => Event[]
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

const EVENTS_KEY = 'eventhub_events'
const BOOKINGS_KEY = 'eventhub_bookings'

function getDefaultEvents(): Event[] {
  return [
    {
      id: '1',
      title: 'Tech Conference 2026',
      description: 'Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing. Join industry leaders and innovators.',
      date: '2026-03-15',
      time: '09:00',
      location: 'San Francisco Convention Center',
      category: 'Technology',
      price: 299,
      capacity: 500,
      availableSeats: 500,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-20T10:00:00Z'
    },
    {
      id: '2',
      title: 'Music Festival Summer Vibes',
      description: 'Three-day music festival featuring top artists from around the world. Food, drinks, and unforgettable experiences.',
      date: '2026-07-10',
      time: '14:00',
      location: 'Central Park, New York',
      category: 'Music',
      price: 150,
      capacity: 2000,
      availableSeats: 2000,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-21T14:30:00Z'
    },
    {
      id: '3',
      title: 'Startup Pitch Night',
      description: 'Watch innovative startups pitch their ideas to top investors. Network with entrepreneurs and venture capitalists.',
      date: '2026-02-28',
      time: '18:00',
      location: 'Innovation Hub, Austin',
      category: 'Business',
      price: 50,
      capacity: 200,
      availableSeats: 200,
      image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-22T09:15:00Z'
    },
    {
      id: '4',
      title: 'Food & Wine Festival',
      description: 'Taste exquisite dishes from renowned chefs paired with premium wines from around the world.',
      date: '2026-04-20',
      time: '17:00',
      location: 'Harbor District, Miami',
      category: 'Food',
      price: 120,
      capacity: 300,
      availableSeats: 300,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-23T11:00:00Z'
    },
    {
      id: '5',
      title: 'Art Exhibition: Modern Masters',
      description: 'Explore contemporary art from emerging and established artists. Gallery opening with live performances.',
      date: '2026-05-05',
      time: '19:00',
      location: 'Modern Art Gallery, Chicago',
      category: 'Art',
      price: 35,
      capacity: 150,
      availableSeats: 150,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-24T16:45:00Z'
    }
  ]
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const storedEvents = localStorage.getItem(EVENTS_KEY)
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    } else {
      const defaultEvents = getDefaultEvents()
      setEvents(defaultEvents)
      localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEvents))
    }

    const storedBookings = localStorage.getItem(BOOKINGS_KEY)
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }, [])

  const saveEvents = (newEvents: Event[]) => {
    setEvents(newEvents)
    localStorage.setItem(EVENTS_KEY, JSON.stringify(newEvents))
  }

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings)
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(newBookings))
  }

  const createEvent = (eventData: Omit<Event, 'id' | 'organizerId' | 'organizerName' | 'status' | 'createdAt' | 'availableSeats'>) => {
    if (!user || user.role !== 'organizer') {
      throw new Error('Only organizers can create events')
    }

    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      organizerId: user.id,
      organizerName: user.name,
      status: 'pending',
      availableSeats: eventData.capacity,
      createdAt: new Date().toISOString()
    }

    saveEvents([...events, newEvent])
  }

  const updateEventStatus = (eventId: string, status: EventStatus) => {
    if (!user || user.role !== 'admin') {
      throw new Error('Only admins can update event status')
    }

    const updatedEvents = events.map(event =>
      event.id === eventId ? { ...event, status } : event
    )
    saveEvents(updatedEvents)
  }

  const bookEvent = (eventId: string, numberOfTickets: number) => {
    if (!user) {
      throw new Error('You must be logged in to book events')
    }

    const event = events.find(e => e.id === eventId)
    if (!event) {
      throw new Error('Event not found')
    }

    if (event.availableSeats < numberOfTickets) {
      throw new Error('Not enough available seats')
    }

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      eventId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      numberOfTickets,
      totalPrice: event.price * numberOfTickets,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    }

    const updatedEvents = events.map(e =>
      e.id === eventId
        ? { ...e, availableSeats: e.availableSeats - numberOfTickets }
        : e
    )

    saveEvents(updatedEvents)
    saveBookings([...bookings, newBooking])
  }

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId)
    if (!booking) {
      throw new Error('Booking not found')
    }

    if (!user || (booking.userId !== user.id && user.role !== 'admin')) {
      throw new Error('You can only cancel your own bookings')
    }

    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    )

    const updatedEvents = events.map(e =>
      e.id === booking.eventId
        ? { ...e, availableSeats: e.availableSeats + booking.numberOfTickets }
        : e
    )

    saveEvents(updatedEvents)
    saveBookings(updatedBookings)
  }

  const getUserBookings = () => {
    if (!user) return []
    return bookings.filter(b => b.userId === user.id)
  }

  const getOrganizerEvents = () => {
    if (!user || user.role !== 'organizer') return []
    return events.filter(e => e.organizerId === user.id)
  }

  const value: EventsContextType = {
    events,
    bookings,
    createEvent,
    updateEventStatus,
    bookEvent,
    cancelBooking,
    getUserBookings,
    getOrganizerEvents
  }

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) {
    throw new Error('useEvents must be used within EventsProvider')
  }
  return ctx
}