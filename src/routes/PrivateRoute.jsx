import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Route guard for authenticated users only
// If user is not logged in, redirect them to login page
// Otherwise render the protected content (children)
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // Not logged in? Send to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Logged in, show the page
  return children
}

export { PrivateRoute }
