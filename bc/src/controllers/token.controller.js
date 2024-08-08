"use strict";
const Token = require("../models/token.model");

module.exports = {
  list: async (req, res) => {
    const filters = req.user?.isAdmin ? {} : { userId: req.user._id };
    const data = await res.getModelList(Token, filters);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token, filters),
      data,
    });
  },

  create: async (req, res) => {
    req.body.userId = req.user._id;
    const data = await Token.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user._id };
    const data = await Token.findOne(filters);
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user._id };
    const data = await Token.updateOne(filters, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Token.findOne(filters),
    });
  },

  delete: async (req, res) => {
    const filters = req.user?.isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user._id };
    const data = await Token.deleteOne(filters);
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
