"use strict";

const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');

// Route to handle GET requests for all categories, only logged-in users can access this
// router.get('/', isLogin, category.list);
router.get('/', category.list);

// Route to handle POST requests to create a new category, only admins can create categories
router.post('/', isLogin, isAdmin, category.create);

// Route to handle GET requests for a specific category by id, only logged-in users can access this
// router.get('/:id', isLogin, category.read);
router.get('/:id', category.read);

// Route to handle PUT requests to update a specific category by id, only admins can update categories
router.put('/:id', isLogin, isAdmin, category.update);

// Route to handle DELETE requests to delete a specific category by id, only admins can delete categories
router.delete('/:id', isLogin, isAdmin, category.delete);

router.get('/search', category.enhancedSearch);

module.exports = router;
