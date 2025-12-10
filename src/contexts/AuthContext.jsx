import { createContext, useContext, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '../config/constants'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const TOKEN_KEY = 'auth_token'
const AuthContext = createContext(null)
const STORAGE_KEY = STORAGE_KEYS.AUTH_USER

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Authentication failed')
  }
  return res.json()
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUserRaw = localStorage.getItem(STORAGE_KEY)
    const storedToken = localStorage.getItem(TOKEN_KEY)

    if (storedUserRaw) {
      try {
        const parsed = JSON.parse(storedUserRaw)
        const token = parsed?.token || storedToken || null
        setUser(token ? { ...parsed, token } : null)
      } catch (err) {
        console.error('Failed to parse stored user', err)
        setUser(null)
      }
    } else if (storedToken) {
      setUser({ token: storedToken })
    }
  }, [])

  const persistSession = (nextUser) => {
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    if (nextUser?.token) {
      localStorage.setItem(TOKEN_KEY, nextUser.token)
    }
  }

  const clearSession = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await handleResponse(res)
    const nextUser = {
      email: data.user?.email || email,
      name: data.user?.name || '',
      token: data.token,
    }

    persistSession(nextUser)
    return nextUser
  }

  const register = async (email, password, confirmPassword) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, confirmPassword }),
    })

    const data = await handleResponse(res)
    const nextUser = {
      email: data.user?.email || email,
      name: data.user?.name || '',
      token: data.token,
    }

    persistSession(nextUser)
    return nextUser
  }

  const logout = () => clearSession()

  const value = {
    user,
    isAuthenticated: Boolean(user?.token),
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
