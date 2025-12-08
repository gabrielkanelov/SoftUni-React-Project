// Create page - for adding new gaming topics
// Protected route - only authenticated users can create
// Users select category: PC Games, Console Games, Mobile Games, Gaming News
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import { VALIDATION_RULES, ROUTES, GAMING_CATEGORIES } from '../../config/constants'
import './Create.css'

// Create topic page - form for adding new gaming discussion
// Only accessible to authenticated users (PrivateRoute)
// Validates that title, content, and category are provided
function Create() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
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

    if (!category) {
      newErrors.category = 'Please select a category'
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

      // Create topic with current user as author and selected category
      await createPost(title, content, category, user.email)

      // Redirect to forum on success
      navigate(ROUTES.FORUM)
    } catch (err) {
      setErrors({ submit: 'Failed to create topic. Please try again.' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="create-container">
      <h1>🎮 Create New Gaming Topic</h1>

      <form onSubmit={handleSubmit} className="form">
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="form-select"
          >
            <option value="">Select a category...</option>
            {GAMING_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's the topic about?"
            disabled={loading}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts and discussion..."
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
            {loading ? 'Creating...' : 'Create Topic'}
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.FORUM)}
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
