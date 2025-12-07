import { deleteComment } from '../services/commentService'
import { useAuth } from '../contexts/AuthContext'
import { DATE_FORMAT_OPTIONS } from '../config/constants'
import './CommentList.css'

// CommentList component - displays all comments for a post
// Shows comment author, date, and content
// Only comment author can delete their comment
function CommentList({ comments, onCommentDeleted }) {
  const { user } = useAuth()

  // Handle comment deletion
  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return

    try {
      await deleteComment(commentId)
      onCommentDeleted(commentId)
    } catch (err) {
      console.error('Failed to delete comment:', err)
      alert('Failed to delete comment')
    }
  }

  if (comments.length === 0) {
    return (
      <div className="comments-empty">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => {
        const isAuthor = user && comment.author === user.email

        return (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="comment-author">{comment.author}</span>
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()} at{' '}
                {new Date(comment.createdAt).toLocaleTimeString(
                  'en-US',
                  DATE_FORMAT_OPTIONS
                )}
              </span>
            </div>
            <p className="comment-content">{comment.content}</p>
            {isAuthor && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="btn-delete-comment"
              >
                Delete
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export { CommentList }
