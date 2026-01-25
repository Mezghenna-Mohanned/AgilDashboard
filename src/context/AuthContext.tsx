import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type User = {
  id: string
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'eventhub_auth_user'
const USERS_DB_KEY = 'eventhub_users_db'

type StoredUser = User & { password: string }

function readUsers(): StoredUser[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(USERS_DB_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // No persistence - always start logged out
  useEffect(() => {
    setLoading(false)
  }, [])

  async function login(email: string, password: string) {
    const users = readUsers()
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!found || found.password !== password) {
      throw new Error('Invalid email or password')
    }
    const loggedIn: User = { id: found.id, email: found.email, name: found.name }
    setUser(loggedIn)
  }

  async function register(name: string, email: string, password: string) {
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered')
    }
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
    const newUser: StoredUser = { id, name, email, password }
    const updated = [...users, newUser]
    writeUsers(updated)
    const sanitized: User = { id, name, email }
    setUser(sanitized)
  }

  function logout() {
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}


