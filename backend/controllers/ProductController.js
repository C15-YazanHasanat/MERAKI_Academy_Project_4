const productModel = require("../models/ProductSchema");

// !!========get all product=======

const getProducts = (req, res) => {
  productModel
    .find()
    .then((product) => {
      res.status(200).json({
        success: true,
        message: `All the articles`,
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// !!========get  product ById=======

const getProductById = (req, res) => {
  productModel.findById(req.params.id)
    .populate("category", "name")
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.json(product);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};
// !!========Create Product=======

const createProduct = (req, res) => {
  const { name, description, price, category, images, stock, isFeatured } =
    req.body;
  const product = new productModel({
    name,
    description,
    price,
    category,
    images,
    stock,
    isFeatured,
  });

  product
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: `Article created`,
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// !!========update Product=======

const updateProduct = (req, res) => {
  productModel.findById(req.params.id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const { name, description, price, category, images, stock, isFeatured } =
        req.body;

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price ?? product.price;
      product.category = category || product.category;
      product.images = images || product.images;
      product.stock = stock ?? product.stock;
      product.isFeatured = isFeatured ?? product.isFeatured;

      return product.save();
    })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((error) => res.status(400).json({ message: error.message }));
};

// !!========delete Product=======

const deleteProduct = (req, res) => {
  productModel.findById(req.params.id)
    .then((product) => {
      if (!product) return res.status(404).json({ message: "Product not found" });
      return product.deleteOne();
    })
    .then(() => res.json({ message: "Product removed" }))
    .catch((error) => res.status(500).json({ message: error.message }));
};



module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,deleteProduct
};
