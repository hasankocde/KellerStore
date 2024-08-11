"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | ---
------------------------------------------------------- */
// sync():

const fs = require('fs');
const path = require('path');

module.exports = async function () {
    const User = require('../models/user.model');


    // Clear collections
    await User.deleteMany();


    // Create admin user
    await User.create({
        email: "admin1@example.com",
        password: "Secure*1234",
        isAdmin: true
    });



    console.log('* Synchronized.');
}
