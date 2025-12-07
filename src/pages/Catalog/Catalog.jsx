import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../../services/postService'
import { PostCard } from '../../components/PostCard'
import { useAuth } from '../../contexts/AuthContext'
import './Catalog.css'

// Catalog page - displays all posts in a list
// Users can click on any post to view details
// Only logged-in users can create new posts
function Catalog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth()

  // Fetch posts when component mounts
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const allPosts = await getAllPosts()
        setPosts(allPosts)
        setError(null)
      } catch (err) {
        setError('Failed to load posts. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <section>
        <h1>Catalog</h1>
        <p>Loading posts...</p>
      </section>
    )
  }

  return (
    <section>
      <div className="catalog-header">
        <h1>Catalog</h1>
        {isAuthenticated && (
          <Link to="/create" className="btn-primary">
            + New Post
          </Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

export { Catalog }
