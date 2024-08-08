"use strict";
const router = require('express').Router();

//const authController = require('../controllers/auth.controller');


// Auth routes
router.use('/auth', require('./auth.route'));

// User routes
router.use('/users', require('./user.route'));

// Token routes
router.use('/tokens', require('./token.route'));

// Category routes
router.use('/categories', require('./category.route'));

// Ad routes
router.use('/ads', require('./ad.route'));

// Favorite routes
router.use('/favorites', require('./favorite.route'));

// Follow routes
router.use('/follows', require('./follow.route'));

// Message routes
router.use('/messages', require('./message.route'));

// Notification routes
router.use('/notifications', require('./notification.route'));

router.use('/addresses', require('./address.route'));

module.exports = router;
