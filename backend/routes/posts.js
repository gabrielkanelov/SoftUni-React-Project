const express = require('express')
const postController = require('../controllers/postController')
const auth = require('../middleware/auth')

const router = express.Router()

// Public routes
router.get('/', postController.getAllPosts)
router.get('/category/:categoryId', postController.getPostsByCategory)
router.get('/:id', postController.getPost)

// Protected routes
router.post('/', auth, postController.createPost)
router.put('/:id', auth, postController.updatePost)
router.delete('/:id', auth, postController.deletePost)
router.post('/:id/like', auth, postController.likePost)
router.post('/:id/comments', auth, postController.addComment)
router.delete('/:postId/comments/:commentId', auth, postController.deleteComment)

module.exports = router
