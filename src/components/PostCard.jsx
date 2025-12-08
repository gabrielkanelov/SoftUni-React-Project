import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UI_CONSTANTS, ROUTES, GAMING_CATEGORIES } from '../config/constants'
import './PostCard.css'

// PostCard component - displays gaming topic preview in forum
// Shows title, category, author, snippet of content
// Logged-in users can like topics
// Author can edit/delete their own topics
function PostCard({ post, className = '', style, innerRef }) {
  const { user, isAuthenticated } = useAuth()

  // Get category label and emoji
  const category = GAMING_CATEGORIES.find((c) => c.id === post.category)
  const categoryLabel = category ? `${category.emoji} ${category.label}` : 'Uncategorized'

  // Truncate content to show snippet
  const snippet =
    post.content.length > UI_CONSTANTS.POST_SNIPPET_LENGTH
      ? post.content.substring(0, UI_CONSTANTS.POST_SNIPPET_LENGTH) + '...'
      : post.content

  const isAuthor = user && post.author === user.email

  const mergedClassName = `post-card ${className}`.trim()

  return (
    <article ref={innerRef} className={mergedClassName} style={style}>
      <div className="post-card-header">
        <span className="category-badge">{categoryLabel}</span>
        <span className="likes-badge">❤️ {post.likes}</span>
      </div>

      <Link to={`${ROUTES.TOPIC_DETAILS}/${post.id}`} className="post-link">
        <h2>{post.title}</h2>
        <p className="snippet">{snippet}</p>
      </Link>

      <div className="post-card-footer">
        <span className="author">By {post.author}</span>
        <span className="date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>

      {isAuthor && (
        <div className="post-card-actions">
          <Link to={`${ROUTES.EDIT}/${post.id}`} className="btn-small btn-edit">
            ✏️ Edit
          </Link>
          <button className="btn-small btn-delete">🗑️ Delete</button>
        </div>
      )}
    </article>
  )
}

export { PostCard }
