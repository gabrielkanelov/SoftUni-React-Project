const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Comment text is required'],
      minlength: [1, 'Comment cannot be empty'],
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    author: {
      type: String,
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  { timestamps: true }
)

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [10, 'Content must be at least 10 characters']
    },
    category: {
      type: Number,
      required: [true, 'Category is required'],
      enum: [1, 2, 3, 4, 5, 6] // PC Games, Console, Mobile, Gaming News, Events, Guides
    },
    author: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    },
    likedBy: {
      type: [String],
      default: []
    },
    comments: [commentSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

module.exports = {
  Post: mongoose.model('Post', postSchema),
  Comment: mongoose.model('Comment', commentSchema)
}
