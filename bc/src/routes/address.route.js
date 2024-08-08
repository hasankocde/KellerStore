"use strict";

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const addressController = require('../controllers/address.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');
const Address = require('../models/address.model');

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

// Get address by userId extracted from JWT
router.get('/my-address', isLogin, extractUserId, async (req, res) => {
    try {
        const address = await Address.findOne({ userId: req.userId });
        if (!address) {
            return res.status(404).send('Address not found');
        }
        res.json(address);
    } catch (error) {
        console.error('Server error:', error.message); // Log the error for debugging
        res.status(500).send('Server error');
    }
});

// Other routes...
router.get('/', isLogin, addressController.list);
router.post('/', isLogin, addressController.create);
router.get('/:id', isLogin, addressController.read);
router.put('/:id', isLogin, addressController.update);
router.delete('/:id', isLogin, isAdmin, addressController.delete);

module.exports = router;
