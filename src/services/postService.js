const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Map frontend category ids to backend numeric enums
const CATEGORY_MAP = {
  'pc-games': 1,
  'console-games': 2,
  'mobile-games': 3,
  'gaming-news': 4,
  events: 5,
  guides: 6,
}

const reverseCategory = Object.entries(CATEGORY_MAP).reduce((acc, [key, val]) => {
  acc[val] = key
  return acc
}, {})

const mapCategoryToApi = (categoryId) => CATEGORY_MAP[categoryId] ?? CATEGORY_MAP['pc-games']
const mapCategoryFromApi = (categoryNumber) => reverseCategory[categoryNumber] ?? 'pc-games'

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

const mapPostFromApi = (post) => ({
  id: post._id,
  title: post.title,
  content: post.content,
  category: mapCategoryFromApi(post.category),
  author: post.author,
  likes: post.likes ?? 0,
  likedBy: post.likedBy ?? [],
  comments: post.comments ?? [],
  createdAt: post.createdAt,
})

export async function getAllPosts() {
  const res = await fetch(`${API_BASE}/api/posts`)
  const data = await handleResponse(res)
  return data.map(mapPostFromApi)
}

export async function getPostsByCategory(categoryId) {
  const categoryNumber = mapCategoryToApi(categoryId)
  const res = await fetch(`${API_BASE}/api/posts/category/${categoryNumber}`)
  const data = await handleResponse(res)
  return data.map(mapPostFromApi)
}

export async function getPostById(id) {
  const res = await fetch(`${API_BASE}/api/posts/${id}`)
  const data = await handleResponse(res)
  return mapPostFromApi(data)
}

export async function createPost(title, content, categoryId, _author, tokenOverride) {
  const token = tokenOverride || getStoredToken()
  if (!token) throw new Error('Missing auth token')

  const payload = {
    title,
    content,
    category: mapCategoryToApi(categoryId),
  }

  const res = await fetch(`${API_BASE}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(payload),
  })

  const data = await handleResponse(res)
  return mapPostFromApi(data)
}

export async function updatePost(id, title, content, categoryId, tokenOverride) {
  const token = tokenOverride || getStoredToken()
  if (!token) throw new Error('Missing auth token')

  const payload = {
    title,
    content,
    category: mapCategoryToApi(categoryId),
  }

  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(token),
    },
    body: JSON.stringify(payload),
  })

  const data = await handleResponse(res)
  return mapPostFromApi(data)
}

export async function deletePost(id, tokenOverride) {
  const token = tokenOverride || getStoredToken()
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(token),
    },
  })

  await handleResponse(res)
  return { success: true }
}

export async function likePost(postId, tokenOverride) {
  const token = tokenOverride || getStoredToken()
  if (!token) throw new Error('Missing auth token')

  const res = await fetch(`${API_BASE}/api/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      ...authHeaders(token),
    },
  })

  const data = await handleResponse(res)
  return mapPostFromApi(data)
}

export async function getPostsByAuthor(authorEmail) {
  const all = await getAllPosts()
  return all.filter((p) => p.author === authorEmail)
}
