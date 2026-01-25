import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import MetricCard from '../components/MetricCard'
import { Eye, Users, UserPlus, Ticket } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000 },
  { month: 'Feb', revenue: 52000, expenses: 38000 },
  { month: 'Mar', revenue: 61000, expenses: 42000 },
  { month: 'Apr', revenue: 75000, expenses: 48000 },
  { month: 'May', revenue: 95000, expenses: 55000 },
  { month: 'Jun', revenue: 125200, expenses: 68000 },
  { month: 'Jul', revenue: 142000, expenses: 75000 },
  { month: 'Aug', revenue: 168000, expenses: 82000 },
  { month: 'Sep', revenue: 185000, expenses: 88000 },
  { month: 'Oct', revenue: 202000, expenses: 95000 },
  { month: 'Nov', revenue: 218000, expenses: 102000 },
  { month: 'Dec', revenue: 240800, expenses: 110000 },
]

const profitData = [
  { month: '17 AM', value: 120 },
  { month: '9 AM', value: 145 },
  { month: '1 PM', value: 98 },
  { month: '4 PM', value: 132 },
  { month: '7 PM', value: 156 },
  { month: '10 PM', value: 178 },
  { month: '11 PM', value: 165 },
  { month: '12 PM', value: 188 },
]

const sessionsData = [
  { time: '12 AM', value: 250 },
  { time: '3 AM', value: 180 },
  { time: '6 AM', value: 320 },
  { time: '9 AM', value: 420 },
  { time: '12 PM', value: 280 },
]

const visitorsData = [
  { time: '12 AM', value: 520 },
  { time: '3 AM', value: 480 },
  { time: '6 AM', value: 580 },
  { time: '9 AM', value: 720 },
  { time: '12 PM', value: 650 },
]

export default function Dashboard() {
  const { user } = useAuth()

  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div>
      <Header
        title={`Welcome back, ${firstName}`}
        subtitle="Measure your advertising ROI and report website traffic"
      />

      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Pageviews"
          value="50.8K"
          change="+6.4%"
          isPositive={true}
          icon={Eye}
        />
        <MetricCard
          title="Monthly users"
          value="23.6K"
          change="10.5%"
          isPositive={false}
          icon={Users}
        />
        <MetricCard
          title="New sign ups"
          value="756"
          change="+13.2%"
          isPositive={true}
          icon={UserPlus}
        />
        <MetricCard
          title="tickets"
          value="2.3K"
          change="15.2%"
          isPositive={true}
          icon={Ticket}
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-gray-400 text-sm mb-2">Total revenue</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white">$240.8K</span>
                <span className="text-green-400 text-sm">+4.6%</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <span className="text-gray-400">Expenses</span>
              </div>
              <select className="bg-[#0a0e27] text-gray-400 rounded px-2 py-1 text-sm border border-[#1e293b]">
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
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1535',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="expenses" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-gray-400 text-sm mb-2">Total profit</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white">$144.6K</span>
                <span className="text-green-400 text-sm">+10.5%</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '10px' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-right">
            <p className="text-gray-400 text-xs">Last 12 months</p>
            <button className="text-purple-400 text-xs hover:text-purple-300 transition-colors mt-1">
              View report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-gray-400 text-sm mb-2">Total sessions</div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-white">400</span>
                <span className="text-green-400 text-sm">16.3%</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={sessionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b]">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-sm">+1.2%</span>
              <span className="text-gray-400 text-sm">10k visitors</span>
            </div>
            <button className="text-purple-400 text-xs hover:text-purple-300 transition-colors">
              View report
            </button>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={visitorsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
