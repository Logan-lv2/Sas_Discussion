const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

router.get('/me', protect, userController.getMe);
router.put('/theme', protect, userController.changeTheme);
router.put('/password', protect, userController.changePassword);

module.exports = router;