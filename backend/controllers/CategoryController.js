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

// !=====get Catagory ById====
const getCategoryById = (req, res) => {
  categoryModel.findById(req.params.id)
    .then((category) => {
      if (!category)
        return res.status(404).json({ message: "Category not found" });
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
// !=====update Catagory====

const updateCategory = (req, res) => {
  categoryModel.findById(req.params.id)
    .then((category) => {
      if (!category)
        return res.status(404).json({ message: "Category not found" });

      const { name, description, image } = req.body;
      category.name = name || category.name;
      category.description = description || category.description;
      category.image = image || category.image;

      return category.save();
    })
    .then((updatedCategory) => res.json(updatedCategory))
    .catch((error) => res.status(400).json({ message: error.message }));
};

// !=====delete Catagory====

const deleteCategory = (req, res) => {
  categoryModel.findById(req.params.id)
    .then((category) => {
      if (!category) return res.status(404).json({ message: "Category not found" });
      return category.deleteOne();
    })
    .then(() => res.json({ message: "Category removed" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,deleteCategory
};
