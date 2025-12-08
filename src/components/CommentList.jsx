import { useState } from 'react'
import { deleteComment, updateComment } from '../services/commentService'
import { useAuth } from '../contexts/AuthContext'
import { DATE_FORMAT_OPTIONS } from '../config/constants'
import './CommentList.css'

// CommentList component - displays all comments for a post
// Shows comment author, date, and content
// Only comment author can edit/delete their comment
function CommentList({ comments, onCommentDeleted, onCommentUpdated }) {
  const { user } = useAuth()
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')

  // Start editing a comment
  const handleEditStart = (comment) => {
    setEditingId(comment.id)
    setEditContent(comment.content)
  }

  // Cancel editing
  const handleEditCancel = () => {
    setEditingId(null)
    setEditContent('')
  }

  // Save edited comment
  const handleEditSave = async (commentId) => {
    if (!editContent.trim()) {
      alert('Comment cannot be empty')
      return
    }

    try {
      const updatedComment = await updateComment(commentId, editContent)
      onCommentUpdated(commentId, updatedComment)
      setEditingId(null)
      setEditContent('')
    } catch (err) {
      console.error('Failed to update comment:', err)
      alert('Failed to update comment')
    }
  }

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
        const isEditing = editingId === comment.id

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
            
            {isEditing ? (
              <div className="comment-edit-form">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="edit-textarea"
                />
                <div className="edit-actions">
                  <button
                    onClick={() => handleEditSave(comment.id)}
                    className="btn-save"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="comment-content">{comment.content}</p>
            )}

            {isAuthor && !isEditing && (
              <div className="comment-actions">
                <button
                  onClick={() => handleEditStart(comment)}
                  className="btn-edit-comment"
                >
                  ✏️ Edit
                </button>
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
