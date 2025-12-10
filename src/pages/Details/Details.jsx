import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, likePost, deletePost } from '../../services/postService'
import { getCommentsByPostId } from '../../services/commentService'
import { CommentList } from '../../components/CommentList'
import { CommentForm } from '../../components/CommentForm'
import { useAuth } from '../../contexts/AuthContext'
import './Details.css'

// Details page - shows full post content and comments
// Logged-in users can comment and like
// Post author can edit/delete their post
function Details() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liking, setLiking] = useState(false)

  // Fetch post and comments on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const postData = await getPostById(id)
        setPost(postData)

        const commentsData = await getCommentsByPostId(id)
        setComments(commentsData)

        setError(null)
      } catch (err) {
        setError('Failed to load post. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  // Handle post like
  const handleLike = async () => {
    if (!isAuthenticated || !post || !user?.token) return

    try {
      setLiking(true)
      const updated = await likePost(post.id, user.token)
      setPost(updated)
    } catch (err) {
      console.error('Failed to like post:', err)
    } finally {
      setLiking(false)
    }
  }

  // Handle delete post
  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return

    try {
      await deletePost(post.id)
      navigate('/catalog')
    } catch (err) {
      setError('Failed to delete post.')
      console.error(err)
    }
  }

  // Handle new comment added
  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment])
  }

  // Handle comment deleted
  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId))
  }

  if (loading) {
    return (
      <section>
        <h1>Details</h1>
        <p>Loading post...</p>
      </section>
    )
  }

  if (!post) {
    return (
      <section>
        <h1>Details</h1>
        <p>Post not found.</p>
      </section>
    )
  }

  const isAuthor = user && post.author === user.email
  const userLiked = post.likedBy.includes(user?.email || '')

  return (
    <section>
      <div className="post-details">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="author">By {post.author}</span>
          <span className="date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="post-content">{post.content}</div>

        <div className="post-actions">
          <button
            onClick={handleLike}
            disabled={!isAuthenticated || liking}
            className={`btn-like ${userLiked ? 'liked' : ''}`}
          >
            ❤️ {post.likes} {post.likes === 1 ? 'like' : 'likes'}
          </button>

          {isAuthor && (
            <>
              <button
                onClick={() => navigate(`/edit/${post.id}`)}
                className="btn-edit"
              >
                Edit
              </button>
              <button onClick={handleDelete} className="btn-delete">
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className="comments-section">
        <h2>Comments ({comments.length})</h2>

        {isAuthenticated ? (
          <CommentForm
            postId={post.id}
            onCommentAdded={handleCommentAdded}
          />
        ) : (
          <p className="login-prompt">
            <a href="/login">Log in</a> to comment on this post
          </p>
        )}

          <CommentList
            comments={comments}
            postId={post.id}
            onCommentDeleted={handleCommentDeleted}
          />
      </div>
    </section>
  )
}

export { Details }
