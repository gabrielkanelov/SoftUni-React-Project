import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserProfile, getUserPostsCount, getUserCommentsCount } from '../../services/profileService'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES } from '../../config/constants'
import './Profile.css'

// User Profile page - displays user information and statistics
// Shows user bio, join date, posts and comments count
// Accessible from anywhere by viewing another user's profile
function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [postsCount, setPostsCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true)
        setError('')

        if (!user?.email || !user?.token) {
          setError('Missing user session')
          return
        }

        const profileData = await getUserProfile(user.email, user.token)
        const posts = await getUserPostsCount(user.email)
        const comments = await getUserCommentsCount(user.email)

        setProfile(profileData)
        setPostsCount(posts)
        setCommentsCount(comments)
      } catch (err) {
        setError('Failed to load profile')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user])

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">{profile?.avatar || '👤'}</div>
          <div className="profile-info">
            <h1 className="profile-username">{profile?.name || profile?.email || 'Member'}</h1>
            <p className="profile-email">{profile?.email || user?.email}</p>
          </div>
        </div>

        {/* Profile Bio */}
        <div className="profile-bio">
          <p>{profile?.bio || 'No bio added yet'}</p>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-label">Posts</span>
            <span className="stat-value">{postsCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Comments</span>
            <span className="stat-value">{commentsCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Member Since</span>
            <span className="stat-value">
              {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="profile-actions">
          <Link to={ROUTES.CATALOG} className="btn-primary">
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export { Profile }
