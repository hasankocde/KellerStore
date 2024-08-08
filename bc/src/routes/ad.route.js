"use strict";

const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');
const upload = require('../middlewares/upload');
const jwt = require('jsonwebtoken');
const Ad = require('../models/ad.model');

const extractUserId = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.error('Token extraction error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// Route to handle GET requests for all ads
router.get('/', adController.list);

// New route for filtering by radius
router.get('/by-radius', adController.listByRadius); 

router.get('/latest', adController.getLatestAds);
router.get('/popular', adController.getPopularAds);
router.get('/most-viewed', adController.getMostViewedAds);

router.get('/search', adController.search);

// Route to handle GET requests for a specific ad by id
router.get('/:id', adController.read);

// Route to handle POST requests to create a new ad with image uploads, only logged-in users can create ads
router.post('/', isLogin, upload.array('images', 5), adController.create);

// Route to handle PUT requests to update a specific ad by id with image uploads, only the ad owner or admin can update the ad
router.put('/:id', isLogin, extractUserId, upload.array('images', 5), adController.update);

// Route to handle incrementing the visitor count
router.put('/:id/increment-visitor', isLogin, extractUserId, adController.incrementVisitorCount);


// Route to handle DELETE requests to delete a specific ad by id, only the ad owner or admin can delete the ad
router.delete('/:id', isLogin, adController.delete);



module.exports = router;
