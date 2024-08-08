"use strict"
const { mongoose } = require('../configs/dbConnection')

// Follow Model:

const FollowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true, collection: 'follows' });

module.exports = mongoose.model('Follow', FollowSchema);
