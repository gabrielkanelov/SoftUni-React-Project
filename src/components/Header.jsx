import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../config/constants'
import './Header.css'

// Gaming Forum Navigation header
// Shows different options for guests vs authenticated users
function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  // When user logs out, clear auth and redirect to login page
  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <header className="site-header">
      <nav className="nav">
        <div className="nav-left">
          <Link to={ROUTES.HOME} className="brand">
            🎮 Gaming Forum
          </Link>
          <Link to={ROUTES.FORUM}>Topics</Link>
        </div>
        <div className="nav-right">
          {/* If user is logged in, show authenticated links */}
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.CREATE}>Create Topic</Link>
              <Link to={`${ROUTES.PROFILE}/${user?.email}`} className="profile-link">
                👤 Profile
              </Link>
              <button type="button" onClick={handleLogout} className="linkish">
                Logout
              </button>
            </>
          ) : (
            /* Otherwise show guest links */
            <>
              <Link to={ROUTES.LOGIN}>Login</Link>
              <Link to={ROUTES.REGISTER}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export { Header }
