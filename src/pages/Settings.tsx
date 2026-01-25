import { User, Shield, Bell, Globe, CreditCard, Database, Download } from 'lucide-react'
import Header from '../components/Header'

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings Menu */}
        <div className="lg:col-span-1 space-y-3">
          <div className="metric-card p-0 overflow-hidden">
            <button className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3 border-b border-slate-700/50">
              <User className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">Profile</div>
                <div className="text-slate-400 text-xs">Personal information</div>
              </div>
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3 border-b border-slate-700/50">
              <Shield className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-white font-medium">Security</div>
                <div className="text-slate-400 text-xs">Password and 2FA</div>
              </div>
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3 border-b border-slate-700/50">
              <Bell className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-white font-medium">Notifications</div>
                <div className="text-slate-400 text-xs">Alerts and emails</div>
              </div>
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3 border-b border-slate-700/50">
              <Globe className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-white font-medium">Preferences</div>
                <div className="text-slate-400 text-xs">Language and region</div>
              </div>
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3 border-b border-slate-700/50">
              <CreditCard className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-white font-medium">Billing</div>
                <div className="text-slate-400 text-xs">Payment methods</div>
              </div>
            </button>
            <button className="w-full text-left p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3">
              <Database className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-white font-medium">Data</div>
                <div className="text-slate-400 text-xs">Export and privacy</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column - Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="metric-card">
            <h3 className="text-white font-bold text-lg mb-6">Profile Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30">
                  JD
                </div>
                <div>
                  <button className="btn-secondary mb-2">Change Photo</button>
                  <p className="text-slate-400 text-sm">JPG, GIF or PNG. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                  <input type="text" className="input-field" defaultValue="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                  <input type="text" className="input-field" defaultValue="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input type="email" className="input-field" defaultValue="john.doe@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                <input type="text" className="input-field" placeholder="e.g., Senior Developer" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                <input type="text" className="input-field" placeholder="e.g., Tech Corp Inc." />
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="metric-card">
            <h3 className="text-white font-bold text-lg mb-4">Data Export</h3>
            <p className="text-slate-400 mb-4">Export your personal data from EventHub</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Event History</div>
                    <div className="text-slate-400 text-xs">Your past and upcoming events</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm hover:bg-slate-700/50 transition-all">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Payment History</div>
                    <div className="text-slate-400 text-xs">All your transactions</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm hover:bg-slate-700/50 transition-all">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Account Data</div>
                    <div className="text-slate-400 text-xs">Your profile information</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm hover:bg-slate-700/50 transition-all">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <button className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all text-sm font-medium">
                Request Account Deletion
              </button>
              <p className="text-slate-400 text-xs mt-2">This will permanently delete all your data from our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}