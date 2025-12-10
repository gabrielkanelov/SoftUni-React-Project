import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { likePost } from '../services/postService'
import { UI_CONSTANTS, ROUTES, GAMING_CATEGORIES } from '../config/constants'
import { trackActivity, ACTIVITY_TYPES } from '../utils/activityTracker'
import './PostCard.css'

// PostCard component - displays gaming topic preview in forum
// Instagram-style card with like, comment, save actions
function PostCard({ post, className = '', style, innerRef, onPostUpdated }) {
  const { user, isAuthenticated } = useAuth()
  const [localPost, setLocalPost] = useState(post)
  const [saving, setSaving] = useState(false)

  // Get category label and emoji
  const category = GAMING_CATEGORIES.find((c) => c.id === localPost.category)
  const categoryLabel = category ? `${category.emoji} ${category.label}` : 'Uncategorized'

  // Truncate content to show snippet
  const snippet =
    localPost.content.length > UI_CONSTANTS.POST_SNIPPET_LENGTH
      ? localPost.content.substring(0, UI_CONSTANTS.POST_SNIPPET_LENGTH) + '...'
      : localPost.content

  const hasLiked = localPost.likedBy?.includes(user?.email)
  const isSaved = localStorage.getItem(`saved_${localPost.id}`) === 'true'
  const [saved, setSaved] = useState(isSaved)

  const handleLike = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) return

    try {
      const updatedPost = await likePost(localPost.id, user.token)
      setLocalPost(updatedPost)
      if (onPostUpdated) onPostUpdated(updatedPost)
      
      if (!hasLiked) {
        trackActivity(ACTIVITY_TYPES.POST_LIKED, {
          postTitle: localPost.title,
          postId: localPost._id || localPost.id
        })
      }
    } catch (err) {
      console.error('Failed to like post:', err)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    const newSavedState = !saved
    setSaved(newSavedState)
    localStorage.setItem(`saved_${localPost.id}`, newSavedState.toString())
    // Dispatch event for other components to update
    window.dispatchEvent(new Event('savedPostsChanged'))
  }

  const mergedClassName = `post-card ${className}`.trim()

  return (
    <article ref={innerRef} className={mergedClassName} style={style}>
      {/* Category Badge */}
      <div className="post-card-category">
        <span className="category-badge">{categoryLabel}</span>
      </div>

      {/* Main Content - clickable */}
      <Link to={`${ROUTES.TOPIC_DETAILS}/${localPost.id}`} className="post-link">
        <h2>{localPost.title}</h2>
        <p className="snippet">{snippet}</p>
      </Link>

      {/* Instagram-style Action Bar */}
      <div className="post-card-actions">
        <div className="action-buttons">
          <button
            onClick={handleLike}
            className={`action-btn ${hasLiked ? 'liked' : ''}`}
            disabled={!isAuthenticated}
            title={isAuthenticated ? (hasLiked ? 'Unlike' : 'Like') : 'Login to like'}
          >
            {hasLiked ? '❤️' : '🤍'}
          </button>
          
          <Link
            to={`${ROUTES.TOPIC_DETAILS}/${localPost.id}#comments`}
            className="action-btn"
            title="Comment"
          >
            💬
          </Link>
          
          <button
            onClick={handleSave}
            className={`action-btn ${saved ? 'saved' : ''}`}
            title={saved ? 'Unsave' : 'Save'}
          >
            {saved ? '🔖' : '📑'}
          </button>
        </div>
      </div>

      {/* Likes and Info */}
      <div className="post-card-info">
        <div className="likes-count">
          {localPost.likes > 0 && (
            <span><strong>{localPost.likes}</strong> {localPost.likes === 1 ? 'like' : 'likes'}</span>
          )}
        </div>
        <div className="post-meta">
          <span className="author">By <strong>{localPost.author}</strong></span>
          <span className="date-separator">•</span>
          <span className="date">{new Date(localPost.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  )
}

export { PostCard }
