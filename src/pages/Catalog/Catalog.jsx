import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllPosts, getPostsByCategory } from '../../services/postService'
import { PostCard } from '../../components/PostCard'
import { useAuth } from '../../contexts/AuthContext'
import { ROUTES, GAMING_CATEGORIES } from '../../config/constants'
import './Catalog.css'

// Gaming Forum - displays all topics with category filters
// Users can filter by PC Games, Console Games, Mobile Games, Gaming News
// Only logged-in users can create new topics
function Catalog() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { isAuthenticated } = useAuth()
  const cardRefs = useRef([])
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  // Fetch all topics when component mounts
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const allPosts = await getAllPosts()
        setPosts(allPosts)
        setFilteredPosts(allPosts)
        setError(null)
      } catch (err) {
        setError('Failed to load topics. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  // Apply search filter when search query changes
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      )
      setFilteredPosts(filtered)
      setSelectedCategory(null)
    } else if (selectedCategory) {
      handleCategoryFilter(selectedCategory)
    } else {
      setFilteredPosts(posts)
    }
  }, [searchQuery, posts])

  // Filter posts by selected category
  const handleCategoryFilter = async (categoryId) => {
    setSearchParams({})
    setSelectedCategory(categoryId)
    if (categoryId === null) {
      setFilteredPosts(posts)
    } else {
      const categoryPosts = await getPostsByCategory(categoryId)
      setFilteredPosts(categoryPosts)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    cardRefs.current = cardRefs.current.slice(0, filteredPosts.length)

    cardRefs.current.forEach((card) => {
      if (card) {
        card.classList.remove('visible')
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [filteredPosts])

  if (loading) {
    return (
      <section className="forum-container">
        <h1>🎮 Gaming Forum</h1>
        <p>Loading topics...</p>
      </section>
    )
  }

  return (
    <section className="forum-container">
      <div className="forum-header">
        <h1>🎮 Gaming Forum</h1>
        {isAuthenticated && (
          <Link to={ROUTES.CREATE} className="btn-primary">
            + New Topic
          </Link>
        )}
      </div>

      {searchQuery && (
        <div className="search-indicator">
          <span>Searching for: <strong>{searchQuery}</strong></span>
          <button
            onClick={() => setSearchParams({})}
            className="clear-search-btn"
          >
            ✕ Clear
          </button>
        </div>
      )}

      {/* Category Filter Buttons */}
      <div className="category-filter">
        <button
          className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => handleCategoryFilter(null)}
        >
          All Topics
        </button>
        {GAMING_CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(category.id)}
          >
            {category.emoji} {category.label}
          </button>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      {filteredPosts.length === 0 ? (
        <p className="no-topics">
          {searchQuery
            ? `No topics found for "${searchQuery}". Try a different search.`
            : 'No topics in this category. Be the first to create one!'}
        </p>
      ) : (
        <div className="posts-list">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              className="reveal"
              innerRef={(el) => (cardRefs.current[index] = el)}
              style={{ '--reveal-delay': `${index * 80}ms` }}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export { Catalog }
