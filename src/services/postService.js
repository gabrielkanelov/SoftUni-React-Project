// Simulated posts database - in real app would use Firebase or API
// Import configuration constants to avoid hardcoding values
import { API_DELAYS, SEED_POSTS } from '../config/constants'

let posts = [...SEED_POSTS]

let nextPostId = 3

// Get all posts - simulates fetching from backend
export function getAllPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...posts]), API_DELAYS.POST_OPERATIONS)
  })
}

// Get single post by id
export function getPostById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = posts.find((p) => p.id === Number(id))
      if (post) {
        resolve({ ...post })
      } else {
        reject(new Error('Post not found'))
      }
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Create new post - called when user submits Create form
export function createPost(title, content, author) {
  return new Promise((resolve) => {
    const newPost = {
      id: nextPostId++,
      title,
      content,
      author,
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
    }
    posts.push(newPost)
    setTimeout(() => resolve(newPost), API_DELAYS.POST_OPERATIONS)
  })
}

// Update existing post - only author can do this
export function updatePost(id, title, content) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = posts.find((p) => p.id === Number(id))
      if (!post) {
        reject(new Error('Post not found'))
        return
      }
      post.title = title
      post.content = content
      resolve({ ...post })
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Delete post - only author can do this
export function deletePost(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = posts.findIndex((p) => p.id === Number(id))
      if (index === -1) {
        reject(new Error('Post not found'))
        return
      }
      posts.splice(index, 1)
      resolve({ success: true })
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Like post - adds/removes user from likedBy array
export function likePost(postId, userEmail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = posts.find((p) => p.id === Number(postId))
      if (!post) {
        reject(new Error('Post not found'))
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
