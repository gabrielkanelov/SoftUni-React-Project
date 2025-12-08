import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../config/constants'
import './Home.css'

// Landing page - public, no auth required
// Welcome screen with call-to-action for gaming forum
function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🎮 Welcome to Gaming Forum</h1>
          <p className="hero-subtitle">Join the ultimate gaming community</p>
          <p className="hero-description">
            Discuss your favorite PC games, console titles, mobile games, and stay updated 
            with the latest gaming news. Connect with gamers from around the world!
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to={ROUTES.FORUM} className="btn-hero btn-primary">
                → Explore Forum
              </Link>
            ) : (
              <>
                <Link to={ROUTES.REGISTER} className="btn-hero btn-primary">
                  Get Started
                </Link>
                <Link to={ROUTES.LOGIN} className="btn-hero btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Join?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🖥️</div>
            <h3>PC Games</h3>
            <p>Discuss the latest PC gaming releases and share gameplay experiences</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Console Gaming</h3>
            <p>Connect with PlayStation, Xbox, and Nintendo enthusiasts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Games</h3>
            <p>Find your next favorite mobile game in our active community</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📰</div>
            <h3>Gaming News</h3>
            <p>Stay updated with the latest gaming industry news and announcements</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Community Events</h3>
            <p>Join tournaments, challenges, and seasonal events hosted by fellow members</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Guides & Tips</h3>
            <p>Discover builds, strategies, and how-tos shared by experienced players</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Join?</h2>
        <p>Start your gaming conversation today</p>
        <div className="cta-actions">
          {!isAuthenticated && (
            <>
              <Link to={ROUTES.REGISTER} className="btn-cta btn-primary">
                Create Account
              </Link>
              <Link to={ROUTES.LOGIN} className="btn-cta btn-secondary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export { Home }
