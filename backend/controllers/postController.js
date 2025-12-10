const { Post, Comment } = require('../models/Post')

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get posts by category
exports.getPostsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const posts = await Post.find({ category: categoryId }).sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get single post
exports.getPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body
    const author = req.user.email

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' })
    }

    const post = new Post({
      title,
      content,
      category,
      author
    })

    await post.save()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, category } = req.body
    const author = req.user.email

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.author !== author) {
      return res.status(403).json({ message: 'Not authorized to update this post' })
    }

    post.title = title || post.title
    post.content = content || post.content
    post.category = category || post.category

    await post.save()
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const author = req.user.email

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.author !== author) {
      return res.status(403).json({ message: 'Not authorized to delete this post' })
    }

    await Post.findByIdAndDelete(id)
    res.json({ message: 'Post deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Like post
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params
    const userEmail = req.user.email

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.likedBy.includes(userEmail)) {
      // Unlike
      post.likes = Math.max(0, post.likes - 1)
      post.likedBy = post.likedBy.filter(email => email !== userEmail)
    } else {
      // Like
      post.likes += 1
      post.likedBy.push(userEmail)
    }

    await post.save()
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params
    const { text } = req.body
    const author = req.user.email

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' })
    }

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const comment = new Comment({ text, author, postId: id })
    post.comments.push(comment)
    await post.save()

    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params
    const author = req.user.email

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const comment = post.comments.id(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    if (comment.author !== author) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' })
    }

    post.comments.id(commentId).deleteOne()
    await post.save()

    res.json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
