// Create page - for adding new threads/posts
// Protected route - only authenticated users can create
// Will have a form here later
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import { VALIDATION_RULES, ROUTES } from '../../config/constants'
import './Create.css'

// Create post page - form for adding new thread
// Only accessible to authenticated users (PrivateRoute)
// Validates that title and content are provided
function Create() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  // Validate form before submission
  const validate = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length < VALIDATION_RULES.POST_TITLE.min) {
      newErrors.title = VALIDATION_RULES.POST_TITLE.message
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required'
    } else if (content.length < VALIDATION_RULES.POST_CONTENT.min) {
      newErrors.content = VALIDATION_RULES.POST_CONTENT.message
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate first
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      setErrors({})

      // Create post with current user as author
      await createPost(title, content, user.email)

      // Redirect to catalog on success
      navigate(ROUTES.CATALOG)
    } catch (err) {
      setErrors({ submit: 'Failed to create post. Please try again.' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1>Create New Post</h1>

      <form onSubmit={handleSubmit} className="form">
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            disabled={loading}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows="8"
            disabled={loading}
          />
          {errors.content && <span className="error">{errors.content}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/catalog')}
            disabled={loading}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export { Create }
