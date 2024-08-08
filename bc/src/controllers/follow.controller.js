"use strict";
const Follow = require("../models/follow.model");

module.exports = {
  list: async (req, res, next) => {
    try {
      const filters = { userId: req.user._id };
      const data = await res.getModelList(Follow, filters, "userId followedUserId");
      const details = await res.getModelListDetails(Follow, filters);
      res.status(200).send({
        error: false,
        details,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  myFollow: async (req, res, next) => {
    try {
      const data = await Follow.findOne({ userId: req.user._id, followedUserId: req.query.followedUserId }).populate("userId followedUserId");
      res.status(200).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      req.body.userId = req.user._id;
      const existingFollow = await Follow.findOne({ followedUserId: req.body.followedUserId, userId: req.user._id });
      if (existingFollow) {
        return res.status(400).send({
          error: true,
          message: 'Follow already exists',
        });
      }
      const data = await Follow.create(req.body);
      res.status(201).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  read: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const data = await Follow.findOne(filters).populate("userId followedUserId");
      if (!data) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found"
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

  update: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const updateResult = await Follow.updateOne(filters, req.body, { runValidators: true });
      if (updateResult.matchedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found"
        });
      }
      const newData = await Follow.findOne(filters).populate("userId followedUserId");
      res.status(202).send({
        error: false,
        data: newData,
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user._id };
      const data = await Follow.deleteOne(filters);
      if (data.deletedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Follow record not found"
        });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  followCount: async (req, res, next) => {
    try {
      const count = await Follow.countDocuments({ followedUserId: req.params.followedUserId });
      res.status(200).send({
        error: false,
        count,
      });
    } catch (err) {
      next(err);
    }
  },

  findFollowers: async (req, res, next) => {
    try {
      const followedUsers = await Follow.find({ followedUserId: req.params.followedUserId }).populate('userId').select('userId followedUserId');
      res.status(200).send({
        error: false,
        followedUsers,
      });
    } catch (err) {
      next(err);
    }
  }
  
  
};
