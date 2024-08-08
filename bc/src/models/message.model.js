"use strict";
const mongoose = require('mongoose');

// Threaded Message Model:
const MessageSchema = new mongoose.Schema({
    participants: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true
    },
    messages: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        messageText: {
            type: String,
            trim: true,
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { collection: 'messages', timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
