import { createContext, useContext, useEffect, useState } from 'react'

// Create context for auth - this will be accessible from any component
const AuthContext = createContext(null)
const STORAGE_KEY = 'auth_user'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // On mount, check if there's a saved user in localStorage
  // This way the user stays logged in even after refresh
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  // Whenever user changes, sync to localStorage
  // If user logs out (user becomes null), remove from storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  // Dummy login - in real app this would call an API
  // For now just store the email as the user object
  const login = (email, password) => {
    const nextUser = { email }
    setUser(nextUser)
    return nextUser
  }

  // Same as login for this demo
  const register = (email, password) => {
    const nextUser = { email }
    setUser(nextUser)
    return nextUser
  }

  // Clear user state to log out
  const logout = () => setUser(null)

  // Bundle everything we want to expose
  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context - makes it easier to consume
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
