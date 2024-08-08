"use strict";
const Message = require("../models/message.model");
const Ad = require("../models/ad.model");
const User = require("../models/user.model");
const mongoose = require('mongoose');

module.exports = {
  list: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin ? {} : { 'participants._id': req.user._id };

      const thread = await Message.find(filters)
        .populate({
          path: 'adId',
          populate: {
            path: 'ownerId',
            select: 'firstName lastName email' // Select fields you want from the owner
          }
        })
        .populate('messages.senderId');

      res.status(200).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { adId, message, recipientId } = req.body;
      const ad = await Ad.findById(adId);
      if (!ad) {
        return res.status(404).send({
          error: true,
          message: "Ad not found."
        });
      }

      const senderId = req.user._id;

      let thread = await Message.findOne({
        adId: adId,
        participants: { $all: [{ _id: senderId }, { _id: recipientId }] }
      });

      // Check if the thread already exists and if the sender is the ad owner
      if (!thread && senderId.toString() === ad.ownerId.toString()) {
        // Prevent ad owner from starting a message thread on their own ad
        return res.status(400).send({
          error: true,
          message: "You cannot send a message to your own ad."
        });
      }

      if (!thread) {
        thread = await Message.create({
          participants: [{ _id: senderId }, { _id: recipientId }],
          adId: adId,
          messages: [{
            senderId: senderId,
            messageText: message
          }]
        });
      } else {
        thread.messages.push({ senderId: senderId, messageText: message });
        await thread.save();
      }

      res.status(201).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  read: async (req, res, next) => {
    try {
      const messageId = req.params.id;
      const thread = await Message.findById(messageId)
        .populate({
          path: 'participants._id',
          model: 'User',
          select: 'firstName lastName'
        })
        .populate('messages.senderId')
        .populate({
          path: 'adId',
          populate: {
            path: 'ownerId',
            select: 'firstName lastName email' // Select fields you want from the owner
          }
        });

      if (!thread) {
        return res.status(404).send({
          error: true,
          message: "Message thread not found."
        });
      }

      res.status(200).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const threadId = req.params.id;
      const { message } = req.body;

      const thread = await Message.findOne({ _id: threadId, 'participants._id': req.user._id });

      if (!thread) {
        return res.status(404).send({
          error: true,
          message: "Thread not found or you do not have permission to update."
        });
      }

      thread.messages.push({ senderId: req.user._id, messageText: message });
      await thread.save();

      res.status(202).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
        const threadId = req.params.id;

        // Check if the user is an admin
        const isAdmin = req.user.isAdmin;

        // Define the query based on the user's role
        const query = isAdmin ? { _id: threadId } : { _id: threadId, 'participants._id': req.user._id };

        const result = await Message.findOneAndDelete(query);

        if (!result) {
            return res.status(404).send({
                error: true,
                message: "No such message thread found, or you don't have permission to delete it."
            });
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
},


  updateReadStatus: async (req, res, next) => {
    try {
      const threadId = req.params.id;
  
      const thread = await Message.findOne({ _id: threadId, 'participants._id': req.user._id });
  
      if (!thread) {
        return res.status(404).send({
          error: true,
          message: "Thread not found or you do not have permission to update."
        });
      }
  
      thread.messages.forEach(message => {
        if (message.senderId.toString() !== req.user._id.toString()) {
          message.isRead = true;
        }
      });
  
      await thread.save();
  
      res.status(202).send({
        error: false,
        data: thread
      });
    } catch (err) {
      next(err);
    }
  },

  getUnreadMessageCount: async (req, res, next) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.user._id);
      const unreadCount = await Message.aggregate([
        { $match: { 'participants._id': userId } },
        { $unwind: '$messages' },
        { $match: { 'messages.isRead': false, 'messages.senderId': { $ne: userId } } },
        { $count: 'unreadCount' }
      ]);

      const count = unreadCount[0]?.unreadCount || 0;
      res.status(200).json({ count });
    } catch (error) {
      next(error);
    }
  }

  
};
