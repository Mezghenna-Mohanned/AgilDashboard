import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: LucideIcon
}

export default function MetricCard({ title, value, change, isPositive, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-[#0f1535] rounded-xl p-6 border border-[#1e293b] hover:border-purple-500/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{change}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
