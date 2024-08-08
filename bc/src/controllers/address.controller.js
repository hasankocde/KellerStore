"use strict";
const Address = require("../models/address.model");

module.exports = {
  list: async (req, res, next) => {
    try {
      const filters = req.user?.isAdmin ? {} : { userId: req.user._id };
      const data = await res.getModelList(Address, filters);
      const details = await res.getModelListDetails(Address, filters);
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
      req.body.userId = req.user._id;
      const data = await Address.create(req.body);
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
      const data = await Address.findOne(filters);
      if (!data) {
        return res.status(404).send({
          error: true,
          message: "Address not found",
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
      const updateResult = await Address.updateOne(filters, req.body, {
        runValidators: true,
      });
      if (updateResult.matchedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Address not found or user not authorized to update",
        });
      }
      const newData = await Address.findOne(filters);
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
      const deleteResult = await Address.deleteOne(filters);
      if (deleteResult.deletedCount === 0) {
        return res.status(404).send({
          error: true,
          message: "Address not found or user not authorized to delete",
        });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
