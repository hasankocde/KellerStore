"use strict";

const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow.controller');
const { isLogin } = require('../middlewares/permissions');

// Route to handle GET requests to list all follows or specific follows based on user permissions
router.get('/', isLogin, followController.list);

// Route to handle GET requests for follow status
router.get('/my-follow', isLogin, followController.myFollow);

// Route to handle POST requests to create a new follow
router.post('/', isLogin, followController.create);

// Route to handle GET requests for a specific follow by id
router.get('/:id', isLogin, followController.read);

// Route to handle PUT requests to update a specific follow by id
router.put('/:id', isLogin, followController.update);

// Route to handle DELETE requests to delete a specific follow by id
router.delete('/:id', isLogin, followController.delete);

// Route to get the count of follows for a specific user
router.get('/count/:followedUserId', isLogin, followController.followCount);

router.get('/findfollowers/:followedUserId', isLogin, followController.findFollowers);

module.exports = router;
