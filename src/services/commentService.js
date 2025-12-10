const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getStoredToken = () => {
  try {
    const raw = localStorage.getItem('auth_token')
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return localStorage.getItem('auth_token') || null
  }
}

const authHeaders = (token) => (token ? { Authorization: `Bearer ${token}` } : {})

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Request failed with status ${res.status}`)
  }
  return res.json()
}

const mapCommentFromApi = (comment) => ({
  id: comment._id,
  postId: comment.postId || comment.post,
  author: comment.author,
  content: comment.text || comment.content,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
})

export async function getCommentsByPostId(postId) {
  // Comments are embedded in the post; fetch the post and return its comments
  const res = await fetch(`${API_BASE}/api/posts/${postId}`)
  const data = await handleResponse(res)
  return (data.comments || []).map(mapCommentFromApi)
}

export async function addComment(postId, _author, content, tokenOverride) {
  const token = tokenOverride || getStoredToken()
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${API_BASE}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify({ text: content }),
  })

  const data = await handleResponse(res)
  return (data.comments || []).map(mapCommentFromApi).at(-1)
}

export async function updateComment() {
  throw new Error('Updating comments is not implemented in the current API')
}

export async function deleteComment(postId, commentId, tokenOverride) {
  const token = tokenOverride || getStoredToken()
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${API_BASE}/api/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(token),
    },
  })

  await handleResponse(res)
  return { success: true }
}

export async function getCommentsByAuthor(authorEmail) {
  const res = await fetch(`${API_BASE}/api/posts`)
  const data = await handleResponse(res)
  const comments = data.flatMap((post) => post.comments || [])
  return comments
    .filter((c) => c.author === authorEmail)
    .map(mapCommentFromApi)
}
