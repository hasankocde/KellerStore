"use strict"

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require('../helpers/passwordEncrypt');

// User Model:
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: false
    },
    lastName: {
        type: String,
        trim: true,
        required: false
    },
    username: {
        type: String,
        trim: true,
        unique: false,
        required: false
    },
    
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        trim: true,
        required: false
    },
    tel: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true,
    },   
    isPremium: {
        type: Boolean,
        default: false,
    },   
    isStaff: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,        
    },
   
    dateOfBirth: {
        type: Date,
        required: false
    },
    
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    future: {
        type: String,
    }
}, { collection: 'users', timestamps: true });

// UserSchema.index({ 'company.taxNr': 1 }, { unique: true, partialFilterExpression: { 'company.isCompany': true } });

// --> company: {
//     companyName: {
//         type: String,
//         trim: true
//     },
//     taxNr: {
//         type: Number,
//         unique: true,
//         sparse: true
//     },
//     isCompany: {
//         type: Boolean,
//         default: false
//     }
// },

/* Email and Password Validation */
UserSchema.pre('save', async function (next) {
    const user = this;

    // if (!user.isAgeOver18) {
    //     return next(new Error('User must confirm being at least 18 years old to create an account.'));
    // }

    // -->  isAgeOver18: {
    //     type: Boolean,
    //     required: false,
    //     default: false, 
    // },

    // Validate email
    const isEmailValidated = user.email
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
        : false;

    if (!isEmailValidated) {
        return next(new Error('Email not validated.'));
    }

    // Validate password
    if (user.password) {
        const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(user.password);
        if (isPasswordValidated) {
            user.password = passwordEncrypt(user.password);
        } else {
            return next(new Error('Password not validated.'));
        }
    }

    next();
});

module.exports = mongoose.model('User', UserSchema);
