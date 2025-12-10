import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getActivities, clearActivities, ACTIVITY_LABELS, ACTIVITY_ICONS, formatActivityTime } from '../../utils/activityTracker'
import { ROUTES } from '../../config/constants'
import './Activity.css'

// Activity page - shows user's recent activity history
// Displays all tracked actions: posts created/edited/deleted, likes, comments
function Activity() {
  const [activities, setActivities] = useState([])

  // Load activities on mount
  useEffect(() => {
    setActivities(getActivities())
  }, [])

  const handleClearAll = () => {
    if (window.confirm('Clear all activity history?')) {
      clearActivities()
      setActivities([])
    }
  }

  return (
    <section className="activity-container">
      <div className="activity-header-section">
        <h1>📊 Your Activity</h1>
        <p className="activity-subtitle">Track your recent actions and interactions</p>
      </div>

      {activities.length > 0 ? (
        <>
          <div className="activity-actions">
            <button onClick={handleClearAll} className="btn-clear-activity">
              🗑️ Clear History
            </button>
          </div>

          <div className="activity-timeline">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <div className="activity-card-icon">
                  {ACTIVITY_ICONS[activity.type] || '📌'}
                </div>
                <div className="activity-card-content">
                  <div className="activity-card-title">
                    {ACTIVITY_LABELS[activity.type] || 'Activity'}
                  </div>
                  {activity.postTitle && (
                    <div className="activity-card-detail">
                      {activity.postTitle}
                    </div>
                  )}
                  <div className="activity-card-time">
                    {formatActivityTime(activity.timestamp)}
                  </div>
                </div>
                {activity.postId && (
                  <Link
                    to={`${ROUTES.TOPIC_DETAILS}/${activity.postId}`}
                    className="activity-card-link"
                  >
                    View →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="activity-empty">
          <div className="activity-empty-icon">📭</div>
          <h2>No Activity Yet</h2>
          <p>Start interacting with posts to see your activity here!</p>
          <Link to={ROUTES.FORUM} className="btn-goto-forum">
            Browse Topics
          </Link>
        </div>
      )}
    </section>
  )
}

export { Activity }
