import { useParams } from 'react-router-dom'

// Edit page - modify existing thread
// Protected route - only author should be able to edit (will add later)
// Gets thread id from URL params
function Edit() {
  const { id } = useParams()

  return (
    <section>
      <h1>Edit</h1>
      <p>Editing thread {id}.</p>
    </section>
  )
}

export { Edit }
