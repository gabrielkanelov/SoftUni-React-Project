import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../config/constants'
import './Register.css'

// Register page - similar structure to Login
// Collects email and password, then calls register from context
function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      return
    }

    setError('')
    setLoading(true)

    try {
      await register(email, password, confirmPassword)
      navigate(ROUTES.FORUM)
    } catch (err) {
      setError(err.message || 'Регистрацията се провали')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="form-shell">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Repeat Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={confirmPassword && confirmPassword !== password ? 'input-error' : ''}
            required
          />
          {confirmPassword && confirmPassword !== password && (
            <span className="error-text">Паролите не съвпадат</span>
          )}
        </label>
        {error && <div className="error-text">{error}</div>}
        <button type="submit" disabled={confirmPassword !== password || loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <div className="form-footer">
          Имаш акаунт? <Link to={ROUTES.LOGIN}>Влез</Link>
        </div>
      </form>
    </section>
  )
}

export { Register }
