import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

// Navigation header with conditional links based on auth status
// Shows different options for guests vs authenticated users
function Header() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  // When user logs out, clear auth and redirect to login page
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="site-header">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="brand">
            Forum
          </Link>
          <Link to="/catalog">Catalog</Link>
        </div>
        <div className="nav-right">
          {/* If user is logged in, show authenticated links */}
          {isAuthenticated ? (
            <>
              <Link to="/create">Create</Link>
              <Link to="/profile">Profile</Link>
              <button type="button" onClick={handleLogout} className="linkish">
                Logout
              </button>
            </>
          ) : (
            /* Otherwise show guest links */
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export { Header }
