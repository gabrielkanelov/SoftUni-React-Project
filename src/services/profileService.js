// Profile service - handles user profile data and statistics
// In a real app, this would fetch from a backend API
import { API_DELAYS } from '../config/constants'
import { getPostsByAuthor } from './postService'
import { getCommentsByAuthor } from './commentService'

// Mock user profiles database
let userProfiles = {
  admin: {
    email: 'admin',
    username: 'Admin User',
    bio: 'Administrator of this forum',
    joinDate: new Date('2025-11-01'),
    avatar: '👨‍💼',
  },
  'user123@example.com': {
    email: 'user123@example.com',
    username: 'User One',
    bio: 'Active community member',
    joinDate: new Date('2025-11-15'),
    avatar: '👤',
  },
  'dev@example.com': {
    email: 'dev@example.com',
    username: 'Developer',
    bio: 'Senior developer sharing knowledge',
    joinDate: new Date('2025-10-20'),
    avatar: '👨‍💻',
  },
}

// Get user profile by email
export function getUserProfile(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const profile = userProfiles[email]
      if (profile) {
        resolve({ ...profile })
      } else {
        // Return default profile if user doesn't exist
        resolve({
          email,
          username: email.split('@')[0] || 'Unknown User',
          bio: 'Member of the community',
          joinDate: new Date(),
          avatar: '👤',
        })
      }
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Get user's posts count
export function getUserPostsCount(email) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const userPosts = await getPostsByAuthor(email)
      resolve(userPosts.length)
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Get user's comments count
export function getUserCommentsCount(email) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const userComments = await getCommentsByAuthor(email)
      resolve(userComments.length)
    }, API_DELAYS.POST_OPERATIONS)
  })
}

// Update user profile
export function updateUserProfile(email, updatedData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const profile = userProfiles[email]
      if (profile) {
        userProfiles[email] = { ...profile, ...updatedData }
        resolve(userProfiles[email])
      } else {
        reject(new Error('User profile not found'))
      }
    }, API_DELAYS.POST_OPERATIONS)
  })
}
