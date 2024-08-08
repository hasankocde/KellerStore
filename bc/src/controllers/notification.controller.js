"use strict";
const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const sendMail = require('../helpers/sendMail');

module.exports = {
  // List notifications for a user, considering admin privileges for accessing all notifications
  list: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin ? {} : { userId: req.user._id };
      const data = await res.getModelList(Notification, filters, "userId");
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Notification, filters),
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  // Create a new notification and potentially send an email if it's critical
  create: async (req, res, next) => {
    try {
      req.body.userId = req.user._id;
      const data = await Notification.create(req.body);
      
      // If type is 'price-drop', send an email to the user
      if (req.body.type === 'price-drop') {
        const user = await User.findById(req.body.userId);
        sendMail(
          user.email,
          'Price Drop Alert!',
          'The price on an ad you favorited has dropped! Check it out now!'
        );
      }

      res.status(201).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  // Read a specific notification, handling user restrictions and admin privileges
  read: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const data = await Notification.findOne(filters).populate("userId");

      if (!data) {
        return res.status(404).send({
          error: true,
          message: "Notification not found"
        });
      }
      res.status(200).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  // Update notification details, maintaining user restriction checks
  update: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const updateResult = await Notification.updateOne(filters, req.body, {
        runValidators: true,
      });

      if (updateResult.matchedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Notification not found"
        });
      }

      const newData = await Notification.findOne(filters).populate("userId");
      res.status(202).send({
        error: false,
        data: newData,
      });
    } catch (err) {
      next(err);
    }
  },

  // Delete a notification, again considering user restrictions
  delete: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const data = await Notification.deleteOne(filters);

      if (data.deletedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Notification not found"
        });
      }
      res.status(204).send(); // No content to send back
    } catch (err) {
      next(err);
    }
  },
};
