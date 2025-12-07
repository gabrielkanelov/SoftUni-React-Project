import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, updatePost } from '../../services/postService'
import { useAuth } from '../../contexts/AuthContext'
import { VALIDATION_RULES, ROUTES } from '../../config/constants'
import './Edit.css'

// Edit post page - form to update existing post
// Only the original author can edit their post
// Redirects to post details after successful update
function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [post, setPost] = useState(null)

  // Fetch post data on mount
  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const postData = await getPostById(id)

        // Check if current user is the author
        if (postData.author !== user.email) {
          navigate(ROUTES.CATALOG)
          return
        }

        setPost(postData)
        setTitle(postData.title)
        setContent(postData.content)
        setErrors({})
      } catch (err) {
        setErrors({ load: 'Failed to load post.' })
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

      // Update post
      await updatePost(id, title, content)

      // Redirect to post details on success
      navigate(`${ROUTES.DETAILS}/${id}`)
    } catch (err) {
      setErrors({ submit: 'Failed to save changes. Please try again.' })
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section>
        <h1>Edit Post</h1>
        <p>Loading post...</p>
      </section>
    )
  }

  if (!post) {
    return (
      <section>
        <h1>Edit Post</h1>
        <p>Post not found or you don't have permission to edit it.</p>
      </section>
    )
  }

  return (
    <section>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit} className="form">
        {errors.submit && <div className="error-message">{errors.submit}</div>}
        {errors.load && <div className="error-message">{errors.load}</div>}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            disabled={saving}
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
            onClick={() => navigate(`/details/${id}`)}
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
