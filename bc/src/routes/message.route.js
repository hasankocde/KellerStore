"use strict";

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const messageController = require('../controllers/message.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');
const Message = require('../models/message.model');

// Middleware to extract user ID from JWT
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

// Route to get the unread message count
router.get('/unread-count', isLogin, messageController.getUnreadMessageCount);

// Route to handle GET requests for all messages, access control depends on user role
router.get('/', isLogin, messageController.list);

// Route to handle POST requests to create a new message, only logged-in users can create messages
router.post('/', isLogin, messageController.create);

// Route to handle GET requests for a specific message by id, access control depends on user role
router.get('/:id', isLogin, messageController.read);

// Route to handle PUT requests to update a specific message by id, only the message sender or admin can update the message
router.put('/:id', isLogin, messageController.update);

// Route to handle DELETE requests to delete a specific message by id, only the message sender or admin can delete the message
router.delete('/:id', isLogin, messageController.delete);

// Route to handle PUT requests to update read status of all messages in a conversation
router.put('/:id/read-status', isLogin, messageController.updateReadStatus);

// Get messages by userId extracted from JWT
router.get('/my-message', isLogin, extractUserId, async (req, res) => {
    try {
        const messages = await Message.find({ 'participants._id': req.userId });
        if (!messages || messages.length === 0) {
            return res.status(404).send('Messages not found');
        }
        res.json(messages);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
