"use strict";

const fs = require('fs'); // Dosya sistemi modülü
const User = require("../models/user.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const sendMail = require('../helpers/sendMail');

module.exports = {
    list: async (req, res, next) => {
        try {
            const filters = req.user?.isAdmin ? {} : { _id: req.user._id };
            const data = await res.getModelList(User, filters);
            res.status(200).send({
                error: false,
                details: await res.getModelListDetails(User, filters),
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            if (req.file) {
                req.body.avatar = req.file.path;
            }
           
            const data = await User.create(req.body);
            const tokenData = await Token.create({
                userId: data._id,
                token: passwordEncrypt(data._id + Date.now()),
            });

            if (data.email) {
                sendMail(
                    data.email,
                    'Welcome',
                    `<h1>Welcome to system</h1><p><b>${data.firstName}</b>, have a nice day!</p>`
                );
            }
    
            res.status(201).send({
                error: false,
                token: tokenData.token,
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    read: async (req, res, next) => {
        try {
            const filters = req.user?.isAdmin
                ? { _id: req.params.id }
                : { _id: req.user._id };
            const data = await User.findOne(filters);
            if (!data) {
                return res.status(404).send({
                    error: true,
                    message: "User not found"
                });
            }
            res.status(200).send({
                error: false,
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const filters = req.user?.isAdmin ? { _id: userId } : { _id: req.user._id };
    
            const user = await User.findOne(filters);
            if (!user) {
                return res.status(404).send({
                    error: true,
                    message: 'User not found or you do not have permission to modify this user.'
                });
            }
    
            if (req.file) {
                if (user.avatar) {
                    // Delete the old avatar file
                    fs.unlink(user.avatar, (err) => {
                        if (err) console.log(`Failed to delete old avatar: ${err}`);
                    });
                }
                req.body.avatar = req.file.path;
            }
    
            req.body.isAdmin = req.user?.isAdmin ? req.body.isAdmin : false;
    
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true,
                runValidators: true,
            });
    
            res.status(202).send({
                error: false,
                data: updatedUser
            });
        } catch (error) {
            next(error);
        }
    },
    

    delete: async (req, res, next) => {
        try {
            const filters = req.user?.isAdmin
                ? { _id: req.params.id }
                : { _id: req.user._id };
            const user = await User.findOne(filters);
            if (user && user.avatar) {
                // Kullanıcı silinirken avatar dosyasını sil
                fs.unlink(user.avatar, (err) => {
                    if (err) console.log(`Failed to delete avatar: ${err}`);
                });
            }
            const data = await User.deleteOne(filters);
            if (data.deletedCount === 0) {
                return res.status(404).send({
                    error: true,
                    message: "User not found or already deleted"
                });
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};
