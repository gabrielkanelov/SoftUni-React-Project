import { useState, useRef, useEffect } from 'react'
import { addComment } from '../services/commentService'
import { VALIDATION_RULES, STORAGE_KEYS, UI_CONSTANTS } from '../config/constants'
import { trackActivity, ACTIVITY_TYPES } from '../utils/activityTracker'
import './CommentForm.css'

// CommentForm component - form for adding new comment to a post
// Only visible to and usable by logged-in users
// Validates that comment content is provided
function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef(null)

  // Auto-focus textarea when navigating from comment button
  useEffect(() => {
    if (window.location.hash === '#comments') {
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate
    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    if (content.length < VALIDATION_RULES.COMMENT_CONTENT.min) {
      setError(VALIDATION_RULES.COMMENT_CONTENT.message)
      return
    }

    try {
      setLoading(true)
      setError('')

      // Get user email from localStorage
      const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER)
      const user = storedUser ? JSON.parse(storedUser) : null

      if (!user) {
        setError('You must be logged in to comment')
        return
      }

      // Add comment
      const newComment = await addComment(postId, user.email, content)
      
      // Track activity with comment preview
      trackActivity(ACTIVITY_TYPES.COMMENT_ADDED, {
        postId: postId,
        commentContent: content.substring(0, 120),
        commenterEmail: user.email
      })

      // Call callback to add comment to UI
      onCommentAdded(newComment)

      // Clear form
      setContent('')
    } catch (err) {
      setError('Failed to post comment. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      {error && <div className="error-message">{error}</div>}

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        rows={UI_CONSTANTS.COMMENT_TEXTAREA_ROWS}
        disabled={loading}
        className="comment-input"
      />

      <button
        type="submit"
        disabled={loading}
        className="btn-comment"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  )
}

export { CommentForm }
