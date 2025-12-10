// Activity tracking utilities
const ACTIVITY_KEY = 'user_activity'
const MAX_ACTIVITIES = 10

export const ACTIVITY_TYPES = {
  POST_CREATED: 'post_created',
  POST_EDITED: 'post_edited',
  POST_DELETED: 'post_deleted',
  POST_LIKED: 'post_liked',
  COMMENT_ADDED: 'comment_added',
  COMMENT_DELETED: 'comment_deleted',
  POST_VIEWED: 'post_viewed'
}

export const ACTIVITY_LABELS = {
  [ACTIVITY_TYPES.POST_CREATED]: 'Created post',
  [ACTIVITY_TYPES.POST_EDITED]: 'Edited post',
  [ACTIVITY_TYPES.POST_DELETED]: 'Deleted post',
  [ACTIVITY_TYPES.POST_LIKED]: 'Liked post',
  [ACTIVITY_TYPES.COMMENT_ADDED]: 'Added comment',
  [ACTIVITY_TYPES.COMMENT_DELETED]: 'Deleted comment',
  [ACTIVITY_TYPES.POST_VIEWED]: 'Viewed post'
}

export const ACTIVITY_ICONS = {
  [ACTIVITY_TYPES.POST_CREATED]: '📝',
  [ACTIVITY_TYPES.POST_EDITED]: '✏️',
  [ACTIVITY_TYPES.POST_DELETED]: '🗑️',
  [ACTIVITY_TYPES.POST_LIKED]: '❤️',
  [ACTIVITY_TYPES.COMMENT_ADDED]: '💬',
  [ACTIVITY_TYPES.COMMENT_DELETED]: '🚫',
  [ACTIVITY_TYPES.POST_VIEWED]: '👁️'
}

// Track a new activity
export function trackActivity(type, data = {}) {
  try {
    const activities = getActivities()
    const newActivity = {
      id: Date.now(),
      type,
      timestamp: new Date().toISOString(),
      ...data
    }
    
    const updated = [newActivity, ...activities].slice(0, MAX_ACTIVITIES)
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated))
  } catch (e) {
    console.error('Failed to track activity', e)
  }
}

// Get all activities
export function getActivities() {
  try {
    const stored = localStorage.getItem(ACTIVITY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (e) {
    console.error('Failed to get activities', e)
    return []
  }
}

// Clear all activities
export function clearActivities() {
  localStorage.removeItem(ACTIVITY_KEY)
}

// Format activity timestamp
export function formatActivityTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
