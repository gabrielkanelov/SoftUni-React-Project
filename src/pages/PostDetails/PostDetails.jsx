import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPostById, deletePost, likePost } from '../../services/postService'
import { getCommentsByPostId, addComment, deleteComment } from '../../services/commentService'
import { useAuth } from '../../contexts/AuthContext'
import { CommentList } from '../../components/CommentList'
import { CommentForm } from '../../components/CommentForm'
import { ROUTES, GAMING_CATEGORIES } from '../../config/constants'
import './PostDetails.css'

// Topic Details page - shows full gaming topic with comments
// Accessible to anyone for viewing
// Only author can edit/delete
// Only authenticated users can comment and like
function PostDetails() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const isAuthor = user && post && post.author === user.email
  const hasLiked = post && user && post.likedBy?.includes(user.email)
  const category = post && GAMING_CATEGORIES.find((c) => c.id === post.category)

  // Load topic and comments
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError('')

        const postData = await getPostById(postId)
        setPost(postData)

        const commentsData = await getCommentsByPostId(postId)
        setComments(commentsData)
      } catch (err) {
        setError('Post not found')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [postId])

  // Handle like/unlike
  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN)
      return
    }

    try {
      const updatedPost = await likePost(post.id, user.email)
      setPost(updatedPost)
    } catch (err) {
      setError('Failed to update like')
      console.error(err)
    }
  }

  // Handle delete topic
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this topic?')) return

    try {
      setDeleting(true)
      await deletePost(post.id)
      navigate(ROUTES.FORUM)
    } catch (err) {
      setError('Failed to delete topic')
      setDeleting(false)
      console.error(err)
    }
  }

  // Handle comment added
  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment])
  }

  // Handle comment updated
  const handleCommentUpdated = (commentId, updatedComment) => {
    setComments(comments.map(c => c.id === commentId ? updatedComment : c))
  }

  // Handle comment deleted
  const handleCommentDeleted = () => {
    // Reload comments after deletion
    getCommentsByPostId(postId)
      .then(setComments)
      .catch(console.error)
  }

  if (loading) {
    return (
      <div className="post-details-container">
        <div className="loading">Loading post...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="post-details-container">
        <div className="error-message">{error}</div>
        <Link to={ROUTES.CATALOG} className="btn-primary">
          Back to Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="post-details-container">
      {/* Topic Card */}
      <article className="post-details-card">
        {/* Topic Header */}
        <div className="post-header">
          <div>
            <div className="category-info">
              <span className="category-badge-large">{category?.emoji} {category?.label || 'Uncategorized'}</span>
            </div>
            <h1 className="post-title">{post?.title}</h1>
            <div className="post-meta">
              <span className="author">By {post?.author}</span>
              <span className="date">
                {new Date(post?.createdAt).toLocaleDateString()}
              </span>
              <span className="likes">❤️ {post?.likes}</span>
            </div>
          </div>

          {isAuthor && (
            <div className="post-actions">
              <Link to={`${ROUTES.EDIT}/${post.id}`} className="btn-edit">
                ✏️ Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn-delete"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="post-content">
          <p>{post?.content}</p>
        </div>

        {/* Post Footer with Like Button */}
        <div className="post-footer">
          <button
            onClick={handleLike}
            disabled={!isAuthenticated}
            className={`btn-like ${hasLiked ? 'liked' : ''}`}
            title={!isAuthenticated ? 'Login to like' : ''}
          >
            ❤️ {hasLiked ? 'Unlike' : 'Like'}
          </button>
          <Link
            to={`${ROUTES.PROFILE}/${post?.author}`}
            className="btn-profile"
          >
            View Profile
          </Link>
        </div>
      </article>

      {/* Comments Section */}
      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>

        {/* Comment Form - only for authenticated users */}
        {isAuthenticated ? (
          <CommentForm postId={post?.id} onCommentAdded={handleCommentAdded} />
        ) : (
          <div className="login-prompt">
            <p>Please log in to leave a comment</p>
            <Link to={ROUTES.LOGIN} className="btn-primary">
              Login
            </Link>
          </div>
        )}

        {/* Comments List */}
        <CommentList
          comments={comments}
          onCommentDeleted={handleCommentDeleted}
          onCommentUpdated={handleCommentUpdated}
        />
      </section>
    </div>
  )
}

export { PostDetails }
