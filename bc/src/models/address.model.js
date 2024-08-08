"use strict"
const { mongoose } = require('../configs/dbConnection')

// Address Model:
const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    street: {
        type: String,
        trim: true,
        required: false
    },
    zipCode: {
        type: Number,
        required: true
    }, 
    homeNumber: {
        type: Number,
        required: false
      
    },
    city: {
        type: String,
        trim: true,
        required: false
    },
    country: {
        type: String,
        trim: true,
        required: false
    },
    doorbellName: {
        type: String,
        trim: true,
        required: false
    }
}, { collection: 'addresses', timestamps: true })

module.exports = mongoose.model('Address', AddressSchema)
