// Simulated comments database - in real app would use Firebase or API
import { API_DELAYS, SEED_COMMENTS } from '../config/constants'

let comments = [...SEED_COMMENTS]

let nextCommentId = 3
// Get all comments for a specific post
export function getCommentsByPostId(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const postComments = comments.filter((c) => c.postId === Number(postId))
      resolve([...postComments])
    }, API_DELAYS.COMMENT_OPERATIONS)
  })
}

// Add new comment to a post
export function addComment(postId, author, content) {
  return new Promise((resolve) => {
    const newComment = {
      id: nextCommentId++,
      postId: Number(postId),
      author,
      content,
      createdAt: new Date(),
    }
    comments.push(newComment)
    setTimeout(() => resolve(newComment), API_DELAYS.COMMENT_OPERATIONS)
  })
}

// Update comment - only author can do this
export function updateComment(commentId, content) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comment = comments.find((c) => c.id === Number(commentId))
      if (!comment) {
        reject(new Error('Comment not found'))
        return
      }
      comment.content = content
      comment.updatedAt = new Date()
      resolve({ ...comment })
    }, API_DELAYS.COMMENT_OPERATIONS)
  })
}

// Delete comment - only author or post author can do this
export function deleteComment(commentId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = comments.findIndex((c) => c.id === Number(commentId))
      if (index === -1) {
        reject(new Error('Comment not found'))
        return
      }
      comments.splice(index, 1)
      resolve({ success: true })
    }, API_DELAYS.COMMENT_OPERATIONS)
  })
}

// Get comments by author
export function getCommentsByAuthor(authorEmail) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const authorComments = comments.filter((c) => c.author === authorEmail)
      resolve([...authorComments])
    }, API_DELAYS.COMMENT_OPERATIONS)
  })
}
