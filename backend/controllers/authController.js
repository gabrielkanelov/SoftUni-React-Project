const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Generate JWT token
const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register user
exports.register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body

    // Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }

    // Check if user exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    user = new User({ email, password })
    await user.save()

    const token = generateToken(email)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        email: user.email,
        name: user.name
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user and check password
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isPasswordMatch = await user.matchPassword(password)
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(email)
    res.json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        name: user.name
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
