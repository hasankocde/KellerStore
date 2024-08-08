"use strict"
const { mongoose } = require('../configs/dbConnection')

// Notification Model:
const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Follow',
        required: false  // Bu alan opsiyonel olabilir, her bildirim bir takip işlemiyle ilişkili olmayabilir.
    },
    favoriteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite',
        required: false  // Bu alan opsiyonel olabilir, her bildirim bir favori işlemiyle ilişkili olmayabilir.
    },
    notificationType: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: 'notifications' });

module.exports = mongoose.model('Notification', NotificationSchema);