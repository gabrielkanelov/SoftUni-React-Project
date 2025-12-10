import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../config/constants'
import './Header.css'

const MAX_SEARCH_HISTORY = 5
const SEARCH_HISTORY_KEY = 'search_history'

// Gaming Forum Navigation header
// Shows different options for guests vs authenticated users
function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showSearchHistory, setShowSearchHistory] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])
  const searchFormRef = useRef(null)

  // Load search history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse search history', e)
      }
    }
  }, [])

  // Close search history when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchFormRef.current && !searchFormRef.current.contains(e.target)) {
        setShowSearchHistory(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const saveSearchHistory = (query) => {
    const newHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, MAX_SEARCH_HISTORY)
    setSearchHistory(newHistory)
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  }

  const deleteFromHistory = (e, queryToDelete) => {
    e.stopPropagation()
    const newHistory = searchHistory.filter(q => q !== queryToDelete)
    setSearchHistory(newHistory)
    if (newHistory.length === 0) {
      localStorage.removeItem(SEARCH_HISTORY_KEY)
      setShowSearchHistory(false)
    } else {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
    }
  }

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
    navigate(ROUTES.LOGIN)
  }

  const handleSearch = (e, query = null) => {
    e.preventDefault()
    const searchTerm = query || searchQuery.trim()
    if (searchTerm) {
      saveSearchHistory(searchTerm)
      navigate(`${ROUTES.FORUM}?search=${encodeURIComponent(searchTerm)}`)
      setSearchQuery('')
      setShowSearchHistory(false)
    }
  }

  const handleSearchHistoryClick = (query) => {
    setSearchQuery(query)
    const fakeEvent = { preventDefault: () => {} }
    handleSearch(fakeEvent, query)
  }

  return (
    <header className="site-header">
      <nav className="nav">
        <div className="nav-left">
          <Link to={ROUTES.FORUM} className="nav-link">Topics</Link>
          {isAuthenticated && (
            <Link to={ROUTES.CREATE} className="nav-link create-btn">+ Create</Link>
          )}
        </div>
        
        <Link to={ROUTES.HOME} className="brand">
          🎮 Gaming Forum
        </Link>

        <div className="nav-right">
          <div className="search-container" ref={searchFormRef}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchHistory(true)}
                className="search-input"
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>
            {showSearchHistory && searchHistory.length > 0 && (
              <div className="search-history-dropdown">
                <div className="search-history-header">
                  <span>Recent Searches</span>
                </div>
                {searchHistory.map((query, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSearchHistoryClick(query)}
                    className="search-history-item"
                  >
                    <span className="history-icon">🕒</span>
                    <span className="history-text">{query}</span>
                    <button
                      type="button"
                      onClick={(e) => deleteFromHistory(e, query)}
                      className="delete-history-btn"
                      aria-label="Delete"
                    >
                      ✕
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="user-menu">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="user-menu-btn"
              >
                👤 {user?.email?.split('@')[0] || 'User'}
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link
                    to={ROUTES.PROFILE}
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    👤 Profile
                  </Link>
                  
                  <Link
                    to={ROUTES.ACTIVITY}
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    📊 Activity
                  </Link>
                  
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="dropdown-item logout-item"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to={ROUTES.LOGIN} className="nav-link">Login</Link>
              <Link to={ROUTES.REGISTER} className="nav-link register-btn">Register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export { Header }
