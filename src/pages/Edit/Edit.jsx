import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, updatePost } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import { VALIDATION_RULES, ROUTES, GAMING_CATEGORIES } from '../../config/constants'
import { trackActivity, ACTIVITY_TYPES } from '../../utils/activityTracker'
import './Edit.css'

// Edit topic page - form to update existing gaming topic
// Only the original author can edit their topic
// Can update title, content, and category
// Redirects to topic details after successful update
function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [post, setPost] = useState(null)

  // Fetch topic data on mount
  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const postData = await getPostById(id)

        // Check if current user is the author
        if (postData.author !== user.email) {
          navigate(ROUTES.FORUM)
          return
        }

        setPost(postData)
        setTitle(postData.title)
        setContent(postData.content)
        setCategory(postData.category)
        setErrors({})
      } catch (err) {
        setErrors({ load: 'Failed to load topic.' })
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id, user.email, navigate])

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
      setSaving(true)
      setErrors({})

      // Update topic with new values
      await updatePost(id, title, content, category)
      
      // Track activity
      trackActivity(ACTIVITY_TYPES.POST_EDITED, {
        postTitle: title,
        postId: id
      })

      // Redirect to topic details on success
      navigate(`${ROUTES.TOPIC_DETAILS}/${id}`)
    } catch (err) {
      setErrors({ submit: 'Failed to save changes. Please try again.' })
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section className="edit-container">
        <h1>Edit Topic</h1>
        <p>Loading topic...</p>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="edit-container">
        <h1>Edit Topic</h1>
        <p>Topic not found or you don't have permission to edit it.</p>
      </section>
    )
  }

  return (
    <section className="edit-container">
      <h1>✏️ Edit Gaming Topic</h1>

      <form onSubmit={handleSubmit} className="form">
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        {errors.load && <div className="error-message">{errors.load}</div>}

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={saving}
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
            placeholder="Update topic title..."
            disabled={saving}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Update your discussion..."
            rows="8"
            disabled={saving}
          />
          {errors.content && <span className="error">{errors.content}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`${ROUTES.TOPIC_DETAILS}/${id}`)}
            disabled={saving}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export { Edit }
