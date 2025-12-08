// Simulated topics database - in real app would use Firebase or API
// Import configuration constants to avoid hardcoding values
import { API_DELAYS, SEED_TOPICS } from '../config/constants'

let posts = [...SEED_TOPICS]

let nextPostId = 5

// Get all topics - simulates fetching from backend
export function getAllPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...posts]), API_DELAYS.POST_OPERATIONS)
  })
}

// Get topics by category
export function getPostsByCategory(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categoryPosts = posts.filter((p) => p.category === categoryId)
      resolve([...categoryPosts])
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Get single topic by id
export function getPostById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = posts.find((p) => p.id === Number(id))
      if (post) {
        resolve({ ...post })
      } else {
        reject(new Error('Topic not found'))
      }
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Create new topic - called when user submits Create form
export function createPost(title, content, category, author) {
  return new Promise((resolve) => {
    const newPost = {
      id: nextPostId++,
      title,
      content,
      category,
      author,
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
    }
    posts.push(newPost)
    setTimeout(() => resolve(newPost), API_DELAYS.POST_OPERATIONS)
  })
}

// Update existing topic - only author can do this
export function updatePost(id, title, content, category) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = posts.find((p) => p.id === Number(id))
      if (!post) {
        reject(new Error('Topic not found'))
        return
      }
      post.title = title
      post.content = content
      post.category = category
      resolve({ ...post })
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Delete topic - only author can do this
export function deletePost(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = posts.findIndex((p) => p.id === Number(id))
      if (index === -1) {
        reject(new Error('Topic not found'))
        return
      }
      posts.splice(index, 1)
      resolve({ success: true })
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Like topic - adds/removes user from likedBy array
export function likePost(postId, userEmail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = posts.find((p) => p.id === Number(postId))
      if (!post) {
        reject(new Error('Topic not found'))
        return
      }
      const alreadyLiked = post.likedBy.includes(userEmail)
      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter((email) => email !== userEmail)
        post.likes--
      } else {
        post.likedBy.push(userEmail)
        post.likes++
      }
      resolve({ ...post })
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Get topics by author email
export function getPostsByAuthor(authorEmail) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const authorPosts = posts.filter((p) => p.author === authorEmail)
      resolve([...authorPosts])
    }, API_DELAYS.POST_OPERATIONS)
  })
}
