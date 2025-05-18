const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Créer un nouveau post
// @route   POST /api/posts
// @access  Privé
exports.createPost = async (req, res) => {
  try {
    const { content, category } = req.body;
    const user = await User.findById(req.user.id);
    
    const post = await Post.create({
      content,
      author: req.user.id,
      anonymousName: user.anonymousName,
      category: category || 'general'
    });
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Récupérer tous les posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};