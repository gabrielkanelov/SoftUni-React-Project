import { getPostsByAuthor } from './postService'
import { getCommentsByAuthor } from './commentService'

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

// Get user profile from backend
export async function getUserProfile(_email, tokenOverride) {
  const token = tokenOverride || getStoredToken()
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${API_BASE}/api/auth/profile`, {
    headers: {
      ...authHeaders(token),
    },
  })

  return handleResponse(res)
}

// Count posts by author (client-side filter after fetching all posts)
export async function getUserPostsCount(email) {
  const posts = await getPostsByAuthor(email)
  return posts.length
}

// Count comments by author (client-side aggregation)
export async function getUserCommentsCount(email) {
  const comments = await getCommentsByAuthor(email)
  return comments.length
}

// Placeholder for updating user profile (not implemented in API)
export async function updateUserProfile() {
  throw new Error('Updating user profile is not implemented in the current API')
}
