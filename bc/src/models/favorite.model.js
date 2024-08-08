"use strict"
const { mongoose } = require('../configs/dbConnection')

// Favorite Model:

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true
    }
}, { timestamps: true, collection: 'favorites' });

module.exports = mongoose.model('Favorite', FavoriteSchema);

