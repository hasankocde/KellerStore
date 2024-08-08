"use strict";

const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { isLogin } = require('../middlewares/permissions');
const jwt = require('jsonwebtoken');

// Middleware to extract userId from JWT
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

// Route to handle GET requests for all favorites of a logged-in user
router.get('/my-favorite', isLogin, extractUserId, favoriteController.myFavorite);

// Route to handle POST requests to create a new favorite for a logged-in user
router.post('/', isLogin, extractUserId, favoriteController.create);

// Route to handle GET requests for a specific favorite by id for a logged-in user
router.get('/:id', isLogin, extractUserId, favoriteController.read);

// Route to handle DELETE requests to delete a specific favorite by id for a logged-in user
router.delete('/:id', isLogin, extractUserId, favoriteController.delete);

// Route to get the count of ffavoriteControllerfavoriteControlleravorites for a specific ad
router.get('/count/:adId', favoriteController.favoriteCount);


router.get('/', isLogin, favoriteController.list);

module.exports = router;
