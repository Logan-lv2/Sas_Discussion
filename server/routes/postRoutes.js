const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middlewares/auth');

router.route('/')
  .get(postController.getPosts)
  .post(protect, postController.createPost);

module.exports = router;