import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom' // CHANGE THIS LINE
import Layout from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { EventsProvider } from './context/EventsContext'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/Auth'
import Events from './pages/Events'
import AllPages from './pages/AllPages'
import MyBookings from './pages/MyBookings'
import Messages from './pages/Messages'
import Reports from './pages/Reports'
import AdminDashboard from './pages/AdminDashboard'
import OrganizerDashboard from './pages/OrganizerDashboard'
import Users from './pages/Users'
import Features from './pages/Features'
import UsersList from './pages/UsersList'
import Pricing from './pages/Pricing'
import Integrations from './pages/Integrations'
import Settings from './pages/Settings'
import './index.css'

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) {
  const user = JSON.parse(localStorage.getItem('eventhub_auth_user') || 'null')
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <Router> {/* This now uses HashRouter */}
      <AuthProvider>
        <EventsProvider>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/all-pages" element={
              <ProtectedRoute>
                <Layout>
                  <AllPages />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events" element={
              <ProtectedRoute>
                <Layout>
                  <Events />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-bookings" element={
              <ProtectedRoute>
                <Layout>
                  <MyBookings />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/messages" element={
              <ProtectedRoute>
                <Layout>
                  <Messages />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/organizer" element={
              <ProtectedRoute requiredRole="organizer">
                <Layout>
                  <OrganizerDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/features" element={
              <ProtectedRoute>
                <Layout>
                  <Features />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/users-list" element={
              <ProtectedRoute>
                <Layout>
                  <UsersList />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/pricing" element={
              <ProtectedRoute>
                <Layout>
                  <Pricing />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/integrations" element={
              <ProtectedRoute>
                <Layout>
                  <Integrations />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </EventsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App