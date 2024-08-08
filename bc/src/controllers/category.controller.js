"use strict";

const { Category, Subcategory } = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    const categories = await Category.find().populate('subcategories');
    res.status(200).send({
      error: false,
      data: categories
    });
  },

  create: async (req, res) => {
    const categoriesData = req.body; // Expecting an array of category objects

    if (!Array.isArray(categoriesData) || categoriesData.length === 0) {
      return res.status(400).send({
        error: true,
        message: "Invalid input, array of categories expected"
      });
    }

    const createdCategories = [];

    for (const categoryData of categoriesData) {
      const { categoryName, subcategories } = categoryData;

      const existingCategory = await Category.findOne({ categoryName });

      if (!categoryName || categoryName.trim() === '') {
        return res.status(400).send({
          error: true,
          message: "Category name is required"
        });
      }

      if (subcategories && subcategories.some(subcategory => !subcategory.name)) {
        return res.status(400).send({
          error: true,
          message: "Each subcategory must have a name"
        });
      }

      if (existingCategory) {
        return res.status(400).send({
          error: true,
          message: `Category with name ${categoryName} already exists`
        });
      }

      const newCategory = new Category({ categoryName });
      await newCategory.save();

      const subcategoryIds = [];
      for (const subcategory of subcategories) {
        const newSubcategory = new Subcategory({ name: subcategory.name, parentCategory: newCategory._id });
        await newSubcategory.save();
        subcategoryIds.push(newSubcategory._id);
      }

      newCategory.subcategories = subcategoryIds;
      await newCategory.save();

      createdCategories.push(newCategory);
    }

    res.status(201).send({
      error: false,
      data: createdCategories
    });
  },

  read: async (req, res) => {
    const category = await Category.findById(req.params.id).populate('subcategories');
    if (!category) {
      return res.status(404).send({
        error: true,
        message: "Category not found"
      });
    }
    res.status(200).send({
      error: false,
      data: category
    });
  },

  update: async (req, res) => {
    const { categoryName, subcategories } = req.body;

    if (!categoryName) {
      return res.status(400).send({
        error: true,
        message: "Category name is required"
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { categoryName, subcategories: [] },
      { new: true }
    );

    const subcategoryIds = [];
    for (const subcategory of subcategories) {
      const newSubcategory = new Subcategory({ name: subcategory.name, parentCategory: updatedCategory._id });
      await newSubcategory.save();
      subcategoryIds.push(newSubcategory._id);
    }

    updatedCategory.subcategories = subcategoryIds;
    await updatedCategory.save();

    res.status(200).send({
      error: false,
      data: updatedCategory
    });
  },

  delete: async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).send({
        error: true,
        message: "Category not found"
      });
    }
    res.status(204).send();
  },

  enhancedSearch: async (req, res) => {
    const { searchText } = req.query;

    const categories = await Category.find({
      $or: [
        { categoryName: new RegExp(searchText, 'i') },
        { subcategories: { $elemMatch: { name: new RegExp(searchText, 'i') } } }
      ]
    }).populate('subcategories');

    const subcategories = await Subcategory.find({
      name: new RegExp(searchText, 'i')
    }).populate('parentCategory');

    res.status(200).send({ categories, subcategories });
  }
};
