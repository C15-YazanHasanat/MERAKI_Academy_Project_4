const categoryModel = require("../models/categorySchema");

// !=====get Catagory====

const getCategories = (req, res) => {
  categoryModel
    .find()
    .then((category) => {
      res.json(category);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};
// !=====Create Catagory====

const createCategory = (req, res) => {
  const { name, description, image } = req.body;
  const category = new categoryModel({ name, description, image });
  category
    .save()
    .then((createdCategory) => res.status(201).json(createdCategory))
    .catch((error) => res.status(400).json({ message: error.message }));
};

module.exports = {
  getCategories,
  createCategory,
};
