import { useAuth } from '../../contexts/AuthContext'

// Profile page - shows current user info
// This is a protected route so user should always exist here
function Profile() {
  const { user } = useAuth()

  return (
    <section>
      <h1>Profile</h1>
      {user ? (
        <p>Signed in as {user.email}</p>
      ) : (
        <p>No user data available.</p>
      )}
    </section>
  )
}

export { Profile }
