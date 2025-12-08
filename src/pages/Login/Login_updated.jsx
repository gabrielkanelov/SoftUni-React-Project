import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../config/constants'
import './Login.css'

// Login page with controlled form
// Uses useState to track email/password inputs
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  // On submit, call login from context and redirect to catalog
  const handleSubmit = (event) => {
    event.preventDefault()
    login(email, password)
    navigate('/catalog')
  }

  return (
    <section className="form-shell">
      <h1>Login</h1>
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
        <button type="submit">Login</button>
        <div className="form-footer">
          Нямаш акаунт? <Link to={ROUTES.REGISTER}>Регистрирай се</Link>
        </div>
      </form>
    </section>
  )
}

export { Login }
