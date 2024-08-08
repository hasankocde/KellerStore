// user.route.js

"use strict";

const router = require('express').Router();
const { isAdmin, isLogin } = require('../middlewares/permissions');
const user = require('../controllers/user.controller');
const upload = require('../middlewares/upload'); // Upload middleware'i ekleyin
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const extractUserId = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_KEY);
      req.userId = decoded._id; // Ensure you use _id from your token
      next();
  } catch (error) {
      console.error('Token extraction error:', error.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get user by userId extracted from JWT
router.get('/my-user', isLogin, extractUserId, async (req, res) => {
  try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json(user);
  } catch (error) {
      console.error('Server error:', error.message); // Log the error for debugging
      res.status(500).send('Server error');
  }
});



// URL: /users
router.route('/')
  .get(isLogin, isAdmin, user.list)
  .post(upload.single('avatar'), user.create); // Avatar yükleme desteği ekleyin

router.route('/:id')
  .get(isLogin, user.read)
  .put(isLogin, upload.single('avatar'), user.update) // Avatar yükleme desteği ekleyin
  .delete(isLogin, isAdmin, user.delete);

module.exports = router;
