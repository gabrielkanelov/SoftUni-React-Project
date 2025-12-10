import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../../services/postService'
import { PostCard } from '../../components/PostCard'
import { ROUTES } from '../../config/constants'
import '../Catalog/Catalog.css'

// Saved Posts page - displays all saved/bookmarked topics
function SavedPosts() {
  const [posts, setPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSavedPosts() {
      try {
        setLoading(true)
        const allPosts = await getAllPosts()
        
        // Get saved post IDs from localStorage
        const saved = allPosts.filter((post) => {
          return localStorage.getItem(`saved_${post.id}`) === 'true'
        })
        
        setPosts(allPosts)
        setSavedPosts(saved)
      } catch (err) {
        console.error('Failed to load saved posts:', err)
      } finally {
        setLoading(false)
      }
    }

    loadSavedPosts()
  }, [])

  const handlePostUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    )
    setSavedPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    )
  }

  // Refresh saved posts when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = posts.filter((post) => {
        return localStorage.getItem(`saved_${post.id}`) === 'true'
      })
      setSavedPosts(saved)
    }

    window.addEventListener('storage', handleStorageChange)
    // Also listen for custom event when saving from same tab
    window.addEventListener('savedPostsChanged', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('savedPostsChanged', handleStorageChange)
    }
  }, [posts])

  if (loading) {
    return (
      <section className="forum-container">
        <h1>📑 Saved Topics</h1>
        <p>Loading saved topics...</p>
      </section>
    )
  }

  return (
    <section className="forum-container">
      <h1>📑 Saved Topics</h1>
      <p className="forum-subtitle">Your bookmarked gaming discussions</p>

      {savedPosts.length === 0 ? (
        <div className="no-topics">
          <p>No saved topics yet.</p>
          <p>Bookmark topics to find them here later!</p>
          <Link to={ROUTES.FORUM} className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Browse Topics
          </Link>
        </div>
      ) : (
        <div className="posts-list">
          {savedPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              onPostUpdated={handlePostUpdated}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export { SavedPosts }
