// Application-wide configuration constants
// All hardcoded values should be defined here for easy maintenance

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_USER: 'auth_user',
}

// API Simulation
export const API_DELAYS = {
  POST_OPERATIONS: 300, // ms delay for post service operations
  COMMENT_OPERATIONS: 200, // ms delay for comment service operations
  PROFILE_OPERATIONS: 300, // ms delay for profile service operations
}

// Form Validation
export const VALIDATION_RULES = {
  POST_TITLE: {
    min: 3,
    message: 'Title must be at least 3 characters',
  },
  POST_CONTENT: {
    min: 10,
    message: 'Content must be at least 10 characters',
  },
  COMMENT_CONTENT: {
    min: 2,
    message: 'Comment must be at least 2 characters',
  },
}

// UI Constants
export const UI_CONSTANTS = {
  POST_SNIPPET_LENGTH: 150, // characters to show in post preview
  COMMENT_TEXTAREA_ROWS: 3,
}

// Gaming Forum Categories
export const GAMING_CATEGORIES = [
  { id: 'pc-games', label: 'PC Games', emoji: '🖥️' },
  { id: 'console-games', label: 'Console Games', emoji: '🎮' },
  { id: 'mobile-games', label: 'Mobile Games', emoji: '📱' },
  { id: 'gaming-news', label: 'Gaming News', emoji: '📰' },
]

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORUM: '/forum',
  CATEGORY: '/category',
  CREATE: '/create',
  EDIT: '/edit',
  PROFILE: '/profile',
  TOPIC_DETAILS: '/topics',
}

// Date Format Options for Comments
export const DATE_FORMAT_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
}

// Seed Data - Initial Gaming Topics
export const SEED_TOPICS = [
  {
    id: 1,
    title: 'Best RPGs of 2024',
    content: 'What are your favorite RPGs released this year? Looking for recommendations!',
    category: 'pc-games',
    author: 'admin',
    likes: 5,
    likedBy: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: 'PlayStation 5 vs Xbox Series X',
    content: 'Which console do you prefer and why? Lets discuss the differences.',
    category: 'console-games',
    author: 'admin',
    likes: 3,
    likedBy: [],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: 'Top Mobile Games for Casual Gaming',
    content: 'Share your favorite casual mobile games that pass the time!',
    category: 'mobile-games',
    author: 'admin',
    likes: 7,
    likedBy: [],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 4,
    title: 'GTA 6 Official Trailer Released!',
    content: 'GTA 6 trailer just dropped! Check it out and share your thoughts.',
    category: 'gaming-news',
    author: 'admin',
    likes: 12,
    likedBy: [],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
]

// Seed Data - Initial Comments
export const SEED_COMMENTS = []
