const productModel = require("../models/ProductSchema");

// !!========get all product=======

const getProducts = (req, res) => {
  productModel.find()
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

// !!========Create Product=======

const createProduct =(req,res)=>{
const { name, description, price, category, images, stock, isFeatured } = req.body;
    const product=new productModel({ name, description, price, category, images, stock, isFeatured})

    product.save().then((product)=>{
res.status(201).json({
        success: true,
        message: `Article created`,
        product: product,
      });
    }).catch((err)=>{
   res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    })
}














module.exports = {
  getProducts,
  createProduct,
};