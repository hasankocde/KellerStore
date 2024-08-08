"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// app.use(authentication):

const jwt = require('jsonwebtoken')
const Token = require('../models/token.model')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

    // console.log('Received Authorization header:', req.headers.authorization); // Log the header
    // console.log('Received tokenKey:', tokenKey); // Log the token

    if (tokenKey) {

        if (tokenKey[0] == 'Token') { // SimpleToken

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : undefined
            // console.log('User ID:', req.user); // Log the user ID

        } else if (tokenKey[0] == 'Bearer') { // JWT
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid or expired token' });
                }
                req.user = userData;
                // console.log( req.user);
            });
        }
    }

    next()
}