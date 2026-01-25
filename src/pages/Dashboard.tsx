import { Users, TrendingUp, Ticket, Eye, ArrowUpRight, MoreHorizontal, Calendar as CalendarIcon } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Header from '../components/Header'
import MetricCard from '../components/MetricCard'
import { useAuth } from '../context/AuthContext'
import { useEvents } from '../context/EventsContext'

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 35000 },
  { month: 'Mar', revenue: 48000, expenses: 31000 },
  { month: 'Apr', revenue: 61000, expenses: 38000 },
  { month: 'May', revenue: 55000, expenses: 36000 },
  { month: 'Jun', revenue: 67000, expenses: 42000 },
  { month: 'Jul', revenue: 72000, expenses: 45000 },
  { month: 'Aug', revenue: 68000, expenses: 43000 },
  { month: 'Sep', revenue: 78000, expenses: 48000 },
  { month: 'Oct', revenue: 85000, expenses: 52000 },
  { month: 'Nov', revenue: 92000, expenses: 56000 },
  { month: 'Dec', revenue: 88000, expenses: 54000 },
]

const sessionsData = [
  { time: '12 AM', sessions: 120 },
  { time: '3 AM', sessions: 80 },
  { time: '6 AM', sessions: 180 },
  { time: '9 AM', sessions: 320 },
  { time: '12 PM', sessions: 280 },
  { time: '3 PM', sessions: 380 },
  { time: '6 PM', sessions: 450 },
  { time: '9 PM', sessions: 350 },
  { time: '12 PM', sessions: 220 },
]

const profitData = [
  { time: '12 AM', profit: 45 },
  { time: '3 AM', profit: 52 },
  { time: '6 AM', profit: 78 },
  { time: '9 AM', profit: 95 },
  { time: '12 PM', profit: 88 },
  { time: '3 PM', profit: 112 },
  { time: '6 PM', profit: 128 },
  { time: '9 PM', profit: 98 },
  { time: '12 PM', profit: 75 },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { events, bookings } = useEvents()

  const userBookings = bookings.filter(b => b.userId === user?.id && b.status === 'confirmed')
  const upcomingEvents = events.filter(e => e.status === 'approved' && new Date(e.date) > new Date()).slice(0, 5)

  const handleExport = () => {
    alert('📊 Dashboard data export initiated!\nYour report will be available for download shortly.')
  }

  const handleCreateReport = () => {
    alert('📈 Custom report creation is in development!\nThis feature will be available in the next update.')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Guest'}`}
        subtitle="Measure your advertising ROI and report website traffic."
        showExport={true}
        showCreateReport={true}
        onExport={handleExport}
        onCreateReport={handleCreateReport}
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Pageviews"
          value="50.8K"
          change="29.4%"
          isPositive={true}
          icon={Eye}
          color="purple"
        />
        <MetricCard
          title="Monthly users"
          value="23.6K"
          change="12.6%"
          isPositive={false}
          icon={Users}
          color="cyan"
        />
        <MetricCard
          title="New sign ups"
          value="756"
          change="3.1%"
          isPositive={true}
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Tickets"
          value="2.3K"
          change="11.3%"
          isPositive={true}
          icon={Ticket}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 metric-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Total revenue</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">$240.8K</span>
                <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  24.6%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <span className="text-slate-400 text-sm">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <span className="text-slate-400 text-sm">Expenses</span>
              </div>
              <select className="bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Jan 2024 - Dec 2024</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="expenses" stroke="#3b82f6" strokeWidth={2} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Total Profit */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Total profit</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">$144.6K</span>
                <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  29.5%
                </span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={profitData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '10px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Bar dataKey="profit" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-slate-400 text-xs mb-2">Last 12 months</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-green-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">+ Live</span>
              </div>
              <span className="text-slate-400 text-xs">10k visitors</span>
              <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
                View report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Chart */}
      <div className="metric-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Total sessions</h3>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">400</span>
              <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                16.8%
              </span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={sessionsData}>
            <defs>
              <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9'
              }}
            />
            <Area type="monotone" dataKey="sessions" stroke="#ec4899" strokeWidth={3} fill="url(#sessionGradient)" />
            <Line type="monotone" dataKey="sessions" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* My Bookings Section */}
      {userBookings.length > 0 && (
        <div className="metric-card">
          <h3 className="text-white font-semibold text-lg mb-4">My Upcoming Registrations</h3>
          <div className="space-y-3">
            {userBookings.slice(0, 3).map(booking => {
              const event = events.find(e => e.id === booking.eventId)
              if (!event) return null
              
              return (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-800/50 transition-all">
                  <div className="flex items-center gap-4">
                    <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-white font-semibold">{event.title}</h4>
                      <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{booking.numberOfTickets} tickets</div>
                    <div className="text-slate-400 text-sm">${booking.totalPrice}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}