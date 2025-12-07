import { useParams } from 'react-router-dom'

// Details page for a single thread
// Uses useParams to get the id from the URL
// Public route - anyone can view thread details
function Details() {
  const { id } = useParams()

  return (
    <section>
      <h1>Details</h1>
      <p>Viewing thread {id}.</p>
    </section>
  )
}

export { Details }
