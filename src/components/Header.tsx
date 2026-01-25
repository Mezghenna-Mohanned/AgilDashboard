import { Download, Search, ChevronDown, FileDown, AlertCircle } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  showSearch?: boolean
  showExport?: boolean
  showCreateReport?: boolean
  onExport?: () => void
  onCreateReport?: () => void
}

export default function Header({ 
  title, 
  subtitle, 
  showSearch = false,
  showExport = false,
  showCreateReport = false,
  onExport,
  onCreateReport
}: HeaderProps) {
  
  const handleExport = () => {
    if (onExport) {
      onExport()
    } else {
      alert('📊 Export functionality is coming soon!\nYour data export will be available in the next update.')
    }
  }

  const handleCreateReport = () => {
    if (onCreateReport) {
      onCreateReport()
    } else {
      alert('📈 Report generation is coming soon!\nThis feature will allow you to create custom reports in the next update.')
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
        {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for..."
              className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full md:w-64"
            />
          </div>
        )}

        {showExport && (
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-700/50 hover:border-slate-600/50 transition-all"
          >
            <FileDown className="w-4 h-4" />
            Export data
          </button>
        )}

        {showCreateReport && (
          <button 
            onClick={handleCreateReport}
            className="btn-primary flex items-center gap-2"
          >
            Create report
          </button>
        )}
        
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30">
            {(title.charAt(0) || 'U').toUpperCase()}
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  )
}