import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UI_CONSTANTS, ROUTES } from '../config/constants'
import './PostCard.css'

// PostCard component - displays post preview in catalog
// Shows title, author, snippet of content
// Logged-in users can like posts
// Author can edit/delete their own posts
function PostCard({ post }) {
  const { user, isAuthenticated } = useAuth()

  // Truncate content to show snippet
  const snippet =
    post.content.length > UI_CONSTANTS.POST_SNIPPET_LENGTH
      ? post.content.substring(0, UI_CONSTANTS.POST_SNIPPET_LENGTH) + '...'
      : post.content

  const isAuthor = user && post.author === user.email

  return (
    <article className="post-card">
      <Link to={`${ROUTES.DETAILS}/${post.id}`} className="post-link">
        <h2>{post.title}</h2>
        <p className="snippet">{snippet}</p>
      </Link>

      <div className="post-card-footer">
        <span className="author">{post.author}</span>
        <span className="date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="likes">❤️ {post.likes}</span>
      </div>

      {isAuthor && (
        <div className="post-card-actions">
          <Link to={`${ROUTES.EDIT}/${post.id}`} className="btn-small btn-edit">
            Edit
          </Link>
          <button className="btn-small btn-delete">Delete</button>
        </div>
      )}
    </article>
  )
}

export { PostCard }
