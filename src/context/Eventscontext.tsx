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
      title: 'AI & Machine Learning Summit 2026',
      description: 'Leading conference on artificial intelligence, machine learning, and data science. Features workshops, research papers, and networking.',
      date: '2026-03-15',
      time: '09:00',
      location: 'San Francisco Convention Center',
      category: 'Technology',
      price: 499,
      capacity: 1000,
      availableSeats: 750,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-20T10:00:00Z'
    },
    {
      id: '2',
      title: 'Global FinTech Conference',
      description: 'Annual financial technology conference featuring blockchain, digital banking, and investment innovations.',
      date: '2026-04-22',
      time: '10:00',
      location: 'London ExCeL Centre',
      category: 'Finance',
      price: 650,
      capacity: 800,
      availableSeats: 450,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-21T14:30:00Z'
    },
    {
      id: '3',
      title: 'Healthcare Innovation Symposium',
      description: 'Advancements in medical technology, telemedicine, and healthcare management systems.',
      date: '2026-05-18',
      time: '08:30',
      location: 'Boston Convention Center',
      category: 'Science',
      price: 350,
      capacity: 500,
      availableSeats: 320,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-22T09:15:00Z'
    },
    {
      id: '4',
      title: 'Cybersecurity Leaders Forum',
      description: 'Enterprise security, threat intelligence, and data protection strategies for modern organizations.',
      date: '2026-06-10',
      time: '13:00',
      location: 'Washington DC Convention Center',
      category: 'Security',
      price: 550,
      capacity: 600,
      availableSeats: 280,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-23T11:00:00Z'
    },
    {
      id: '5',
      title: 'Sustainable Business Conference',
      description: 'ESG initiatives, circular economy, and sustainable corporate practices for the modern enterprise.',
      date: '2026-07-05',
      time: '09:30',
      location: 'Amsterdam RAI',
      category: 'Business',
      price: 420,
      capacity: 700,
      availableSeats: 420,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-24T16:45:00Z'
    },
    {
      id: '6',
      title: 'Quantum Computing Workshop',
      description: 'Hands-on workshop exploring quantum algorithms, hardware, and practical applications.',
      date: '2026-08-12',
      time: '14:00',
      location: 'MIT Campus, Cambridge',
      category: 'Technology',
      price: 299,
      capacity: 150,
      availableSeats: 85,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-25T10:20:00Z'
    },
    {
      id: '7',
      title: 'Digital Transformation Leaders',
      description: 'Strategies for digital transformation, cloud migration, and organizational change management.',
      date: '2026-09-20',
      time: '11:00',
      location: 'Singapore Marina Bay Sands',
      category: 'Business',
      price: 580,
      capacity: 900,
      availableSeats: 560,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-26T15:10:00Z'
    },
    {
      id: '8',
      title: 'EdTech Innovation Summit',
      description: 'Future of education technology, online learning platforms, and educational software development.',
      date: '2026-10-15',
      time: '10:00',
      location: 'Austin Convention Center',
      category: 'Education',
      price: 320,
      capacity: 400,
      availableSeats: 240,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-27T12:30:00Z'
    },
    {
      id: '9',
      title: 'Enterprise Blockchain Forum',
      description: 'Blockchain applications for supply chain, finance, and enterprise solutions.',
      date: '2026-11-08',
      time: '09:00',
      location: 'Dubai World Trade Centre',
      category: 'Technology',
      price: 480,
      capacity: 650,
      availableSeats: 390,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-28T14:00:00Z'
    },
    {
      id: '10',
      title: 'Clean Energy Technology Expo',
      description: 'Renewable energy innovations, smart grids, and sustainable infrastructure development.',
      date: '2026-12-03',
      time: '08:30',
      location: 'Berlin Messe',
      category: 'Science',
      price: 390,
      capacity: 850,
      availableSeats: 510,
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
      organizerId: '2',
      organizerName: 'John Organizer',
      status: 'approved',
      createdAt: '2026-01-29T11:45:00Z'
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
    return bookings.filter(b => b.userId === user.id && b.status === 'confirmed')
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