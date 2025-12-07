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

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CATALOG: '/catalog',
  CREATE: '/create',
  DETAILS: '/details',
  EDIT: '/edit',
  PROFILE: '/profile',
}

// Date Format Options for Comments
export const DATE_FORMAT_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit',
}

// Seed Data - Initial Posts
export const SEED_POSTS = []

// Seed Data - Initial Comments
export const SEED_COMMENTS = []
