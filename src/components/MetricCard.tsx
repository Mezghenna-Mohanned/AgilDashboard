import { TrendingUp, TrendingDown, MoreHorizontal, Eye } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: LucideIcon
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan'
  iconColor?: string
}

const iconBackgrounds = {
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon,
  color = 'blue',
  iconColor
}: MetricCardProps) {
  return (
    <div className="metric-card group">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBackgrounds[color]} border flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6" style={iconColor ? { color: iconColor } : {}} />
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors p-1.5 hover:bg-slate-700/50 rounded-lg opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-slate-400 mb-3 flex items-center gap-2">
          <Eye className="w-3.5 h-3.5" />
          {title}
        </div>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          isPositive 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{change}</span>
        </div>
      </div>
    </div>
  )
}