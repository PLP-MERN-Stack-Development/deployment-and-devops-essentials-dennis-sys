import Category from "../models/Category.js";

export const getCategories = async (req, res, next) => {
  try {
    res.json(await Category.find());
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    next(err);
  }
};
