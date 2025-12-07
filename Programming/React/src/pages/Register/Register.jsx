import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Register.css'

// Register page - similar structure to Login
// Collects email and password, then calls register from context
function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  // On submit, register the user and go to catalog
  const handleSubmit = (event) => {
    event.preventDefault()
    register(email, password)
    navigate('/catalog')
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
        <button type="submit">Create Account</button>
      </form>
    </section>
  )
}

export { Register }
