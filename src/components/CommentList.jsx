import { deleteComment } from '../services/commentService'
import { useAuth } from '../contexts/AuthContext'
import { DATE_FORMAT_OPTIONS } from '../config/constants'
import { trackActivity, ACTIVITY_TYPES } from '../utils/activityTracker'
import './CommentList.css'

// CommentList component - displays all comments for a post
// Shows comment author, date, and content
// Only comment author can delete their comment (editing not supported by API)
function CommentList({ comments, postId, onCommentDeleted }) {
  const { user } = useAuth()

  // Handle comment deletion
  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return

    try {
      await deleteComment(postId, commentId)
      
      // Track activity
      trackActivity(ACTIVITY_TYPES.COMMENT_DELETED, {
        postId: postId
      })
      
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
                {comment.updatedAt && ' (edited)'}
              </span>
            </div>
            
            <p className="comment-content">{comment.content}</p>

            {isAuthor && (
              <div className="comment-actions">
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="btn-delete-comment"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export { CommentList }
