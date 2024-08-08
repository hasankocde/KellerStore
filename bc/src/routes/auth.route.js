"use strict";

const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');


// POST /auth/login - Route for login functionality
router.post('/login', auth.login);

// POST /auth/refresh - Route for refreshing access tokens
router.post('/refresh', auth.refresh);

// GET /auth/logout - Route for logging out (likely deletes simple tokens)
router.get('/logout', auth.logout);



module.exports = router;
