import { TrendingUp, Users, DollarSign, Calendar, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import Header from '../components/Header'
import MetricCard from '../components/MetricCard'

const categoryData = [
  { name: 'Technology', value: 35, color: '#3b82f6' },
  { name: 'Music', value: 25, color: '#a855f7' },
  { name: 'Business', value: 20, color: '#10b981' },
  { name: 'Food', value: 12, color: '#f59e0b' },
  { name: 'Art', value: 8, color: '#ec4899' },
]

const monthlyData = [
  { month: 'Jan', events: 12, revenue: 45000, users: 234 },
  { month: 'Feb', events: 15, revenue: 52000, users: 312 },
  { month: 'Mar', events: 18, revenue: 61000, users: 389 },
  { month: 'Apr', events: 14, revenue: 48000, users: 421 },
  { month: 'May', events: 22, revenue: 78000, users: 523 },
  { month: 'Jun', events: 25, revenue: 85000, users: 634 },
]

const websiteVisitors = [
  { source: 'Organic', percentage: 30, color: '#a855f7' },
  { source: 'Social', percentage: 50, color: '#3b82f6' },
  { source: 'Direct', percentage: 20, color: '#06b6d4' },
]

export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Analytics"
        subtitle="Track performance and gain insights"
        showExport={true}
      />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Saved Events"
          value="50.8K"
          change="26.8%"
          isPositive={true}
          icon={Calendar}
          color="purple"
        />
        <MetricCard
          title="Available Events"
          value="23.6K"
          change="12.6%"
          isPositive={false}
          icon={TrendingUp}
          color="cyan"
        />
        <MetricCard
          title="Booked Events"
          value="756"
          change="4.1%"
          isPositive={true}
          icon={BarChartIcon}
          color="green"
        />
        <MetricCard
          title="Average Revenue"
          value="2.3K"
          change="11.3%"
          isPositive={true}
          icon={DollarSign}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Website Visitors Pie Chart */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Website Visitors</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Export →
              </button>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={websiteVisitors}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="percentage"
              >
                {websiteVisitors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            {websiteVisitors.map(item => (
              <div key={item.source} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-slate-400 text-sm">{item.source}</span>
                </div>
                <span className="text-white font-semibold">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Customer Type */}
        <div className="metric-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Revenue by customer type</h3>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-white">$240.8K</span>
                <span className="text-sm text-green-400 font-semibold">↑ 14.6%</span>
              </div>
            </div>
            <select className="bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none">
              <option>Jan 2024 - Dec 2024</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <defs>
                <linearGradient id="currentClients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="subscribers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="newCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
              <Bar dataKey="revenue" fill="url(#currentClients)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="events" fill="url(#subscribers)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="users" fill="url(#newCustomers)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <span className="text-slate-400">Current clients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <span className="text-slate-400">Subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
              <span className="text-slate-400">New customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="metric-card">
          <h3 className="text-white font-semibold mb-4">Events</h3>
          <div className="text-4xl font-bold text-white mb-2">342</div>
          <p className="text-slate-400 text-sm mb-4">Total events this month</p>
          <div className="pt-4 border-t border-slate-700/50">
            <span className="text-green-400 text-sm font-semibold">↑ 12.5% from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <h3 className="text-white font-semibold mb-4">Team progress</h3>
          <div className="text-4xl font-bold text-white mb-2">76%</div>
          <p className="text-slate-400 text-sm mb-4">Average completion rate</p>
          <div className="w-full bg-slate-700/30 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '76%' }}></div>
          </div>
        </div>

        <div className="metric-card">
          <h3 className="text-white font-semibold mb-4">Website Visitors</h3>
          <div className="text-4xl font-bold text-white mb-2">150k</div>
          <p className="text-slate-400 text-sm mb-4">Unique visitors this month</p>
          <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
            <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
              <span className="text-xs">+ Live</span>
            </span>
            <span className="text-slate-400 text-xs">10k visitors</span>
            <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">
              View report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}