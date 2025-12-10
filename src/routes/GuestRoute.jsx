import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Route guard for guests only (not logged in)
// If user is already logged in, redirect to catalog
// This prevents logged-in users from seeing login/register pages
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // Already logged in? No need to see login/register
  if (isAuthenticated) {
    return <Navigate to="/forum" replace />
  }

  // Not logged in, show the guest page (login or register)
  return children
}

export { GuestRoute }
