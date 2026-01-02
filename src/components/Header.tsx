import { Download, Plus } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-[#0f1535] text-white rounded-lg text-sm font-medium hover:bg-[#1a2147] transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export data
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create report
        </button>
      </div>
    </div>
  )
}
