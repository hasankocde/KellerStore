"use strict";
const Favorite = require("../models/favorite.model");

module.exports = {
  myFavorite: async (req, res, next) => {
    try {
      const data = await Favorite.findOne({ userId: req.userId, adId: req.query.adId }).populate("userId adId");
      res.status(200).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  list: async (req, res) => {
    try {
      const filters = { userId: req.user._id };
      const data = await res.getModelList(Favorite, filters, "userId adId");
      const details = await res.getModelListDetails(Favorite, filters);
      res.status(200).send({
        error: false,
        details,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      req.body.userId = req.userId;
      const existingFavorite = await Favorite.findOne({ adId: req.body.adId, userId: req.userId });
      if (existingFavorite) {
        return res.status(400).send({
          error: true,
          message: 'Favorite already exists',
        });
      }
      const data = await Favorite.create(req.body);
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
      const filters = { _id: req.params.id, userId: req.userId };
      const data = await Favorite.findOne(filters).populate("userId adId");
      if (!data) {
        return res.status(404).send({
          error: true,
          message: 'Favorite not found',
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

  delete: async (req, res, next) => {
    try {
      const filters = { _id: req.params.id, userId: req.userId };
      const data = await Favorite.deleteOne(filters);
      if (data.deletedCount === 0) {
        return res.status(404).send({
          error: true,
          message: 'Favorite not found',
        });
      }
      res.status(204).send(); // No content to send back
    } catch (err) {
      next(err);
    }
  },

  favoriteCount: async (req, res, next) => {
    try {
      const count = await Favorite.countDocuments({ adId: req.params.adId });
      res.status(200).send({
        error: false,
        count,
      });
    } catch (err) {
      next(err);
    }
  }
};
