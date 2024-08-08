"use strict";
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user && user.password === passwordEncrypt(password)) {
        if (user.isActive) {
          let tokenData = await Token.findOne({ userId: user._id });
          if (!tokenData) {
            tokenData = await Token.create({
              userId: user._id,
              token: passwordEncrypt(user._id + Date.now()),
            });
          }
          // JWT:
          const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: "300m" });
          const refreshToken = jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: "300d" });
          res.send({
            error: false,
            token: tokenData.token,
            bearer: { accessToken, refreshToken },
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter email and password.");
    }
  },

  refresh: async (req, res) => {
    const refreshToken = req.body?.bearer?.refreshToken;
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {
        if (err) {
          res.errorStatusCode = 401;
          throw err;
        } else {
          const { _id, password } = userData;
          if (_id && password) {
            const user = await User.findOne({ _id });
            if (user && user.password === password) {
              if (user.isActive) {
                // JWT:
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: "300m" });
                res.send({
                  error: false,
                  bearer: { accessToken },
                });
              } else {
                res.errorStatusCode = 401;
                throw new Error("This account is not active.");
              }
            } else {
              res.errorStatusCode = 401;
              throw new Error("Wrong id or password.");
            }
          } else {
            res.errorStatusCode = 401;
            throw new Error("Please enter id and password.");
          }
        }
      });
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter token.refresh");
    }
  },

  logout: async (req, res) => {
    const auth = req.headers?.authorization || null; // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']
    let message = null, result = {};
    if (tokenKey) {
      if (tokenKey[0] === "Token") {
        // SimpleToken
        result = await Token.deleteOne({ token: tokenKey[1] });
        message = "Token deleted. Logout was OK.";
      } else {
        // JWT
        message = "No need any process for logout. You must delete JWT tokens.";
      }
    }
    res.send({
      error: false,
      message,
      result,
    });
  },

  // validateToken: async (req, res) => {
  //   const auth = req.headers?.authorization || null; // Token ...tokenKey... // Bearer ...accessToken...
  //   const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']
  
  //   console.log('Received Authorization header:', req.headers.authorization); // Log the header
  //   console.log('Received tokenKey:', tokenKey); // Log the token


  //   if (tokenKey) {
  //     if (tokenKey[0] === "Token") {
  //       // SimpleToken
  //       const tokenData = await Token.findOne({ token: tokenKey[1] }).populate("userId");
  //       req.user = tokenData ? tokenData.userId : undefined;
        
  //       console.log('User ID:', req.user); // Log the user ID
  //       if (tokenData && tokenData.userId) {
          
  //         res.send({
  //           error: false,
  //           isValid: true,
  //           user: tokenData.userId,
           
  //         });
  //       } else {
  //         res.errorStatusCode = 401;
  //         res.send({
  //           error: true,
  //           isValid: false,
  //           message: "Invalid token",
  //         });
  //       }
  //     } else if (tokenKey[0] === "Bearer") {
  //       // JWT
  //       jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => {
  //         if (err) {
  //           res.errorStatusCode = 401;
  //           res.send({
  //             error: true,
  //             isValid: false,
  //             message: "Invalid token",
  //           });
  //         } else {
  //           res.send({
  //             error: false,
  //             isValid: true,
  //             user: userData,
  //           });
  //         }
  //       });
  //     } else {
  //       res.errorStatusCode = 401;
  //       res.send({
  //         error: true,
  //         isValid: false,
  //         message: "Invalid token format",
  //       });
  //     }
  //   } else {
  //     res.errorStatusCode = 401;
  //     res.send({
  //       error: true,
  //       isValid: false,
  //       message: "No token provided",
  //     });
  //   }
  // }

}



