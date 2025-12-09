import { Link } from 'react-router-dom'
import { ROUTES } from '../config/constants'
import './Footer.css'

// Enhanced footer with navigation links and information
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">🎮 Gaming Forum</h3>
          <p className="footer-tagline">Connect with gamers worldwide</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <nav className="footer-links">
            <Link to={ROUTES.HOME}>Home</Link>
            <Link to={ROUTES.FORUM}>Forum</Link>
            <Link to={ROUTES.CREATE}>Create Topic</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <div className="footer-links">
            <a href="#">Guidelines</a>
            <a href="#">Support</a>
            <a href="#">About</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Gaming Forum. Built with React & Vite.</p>
        <p className="footer-credit">SoftUni React Project</p>
      </div>
    </footer>
  )
}

export { Footer }
