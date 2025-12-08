import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getUserProfile, getUserPostsCount, getUserCommentsCount } from '../../services/profileService'
import { ROUTES } from '../../config/constants'
import './Profile.css'

// User Profile page - displays user information and statistics
// Shows user bio, join date, posts and comments count
// Accessible from anywhere by viewing another user's profile
function Profile() {
  const { userId } = useParams()
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

        const userEmail = userId || 'unknown'
        const profileData = await getUserProfile(userEmail)
        const posts = await getUserPostsCount(userEmail)
        const comments = await getUserCommentsCount(userEmail)

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
  }, [userId])

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
            <h1 className="profile-username">{profile?.username}</h1>
            <p className="profile-email">{profile?.email}</p>
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
              {profile?.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'N/A'}
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
