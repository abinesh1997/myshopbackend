const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
var slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    const { title, price, size, category, description, quantity, shipping } =
      req.body;
    
    const product = await new Product({
      title,
      slug: slugify(title),
      price,
      size,
      category,
      description,
      quantity,
      shipping,
    });

    if (req.file) {
      product.image = req.file.path;
    }
    product.save();
    res.status(200).json({
      sucess: true,
      message: "Product create sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Product create Failed" });
  }
};

exports.getAllproduct = async (req, res) => {
  try {
    let products = await Product.find({})
      .sort([["createdAt", "desc"]])
      .populate("category")
      .exec();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: " Server error on Product." });
  }
};

exports.getSingleproduct = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: " Server error on Product." });
  }
};

exports.updateproduct = async (req, res) => {
  try {
    const { title, price, size, category, description, quantity, shipping } =
      req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { title, price, size, category, description, quantity, shipping },
      { new: true }
    ).exec();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: " Product update faild." });
  }
};

exports.updateImage = async (req, res) => {
    try {
      const product = await Product.findOne(
        { _id: req.params.id });
        if (req.file) {
            product.image = req.file.path;
          }
          product.save();
          res.status(200).json({
            sucess: true,
            message: "Product image updated sucessfully",
          });

    } catch (error) {
      console.log(error);
      res.status(400).json({ message: " Product image update faild." });
    }
  };

  
exports.deleteProduct = async (req, res) => {
    try {
      const deleted = await Product.findOneAndDelete(
        { _id: req.params.id });
      
      res.status(200).json({message: "product deleted sucessfully."});
    } catch (error) {
    
      res.status(400).json({ message: " Product delete faild." });
    }
  };

  exports.getproductDetails = async (req, res) => {
    try {
      console.log(req.params.id, req.params.slug);
      let product = await Product.findOne({ _id: req.params.id })
        .populate("category")
        .exec();
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: " Server error on Product." });
    }
  };


  exports.listRelatedProduct = async(req,res)=>{
    try{
      const product = await Product.findById(req.params.productId).exec();
      const relatedProduct = await Product.find({
        _id: {$ne: product.category,}
      })
      .limit(4)
      .populate("category", "_id name")
      .exec();
      res.status(200).json(relatedProduct);


    }catch (error) {
      console.log(error);
      res.status(400).json({ message: " Server error on Product." });
    }
  }

  exports.getProductsByCategory = async (req, res) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
  
      if (category) {
        const products = await Product.find({ category }).populate(
          "category",
          "_id title"
        );
        res.status(200).json(products);
      } else {
        const products = await Product.find().populate("category", "_id title");
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(400).json({ message: "Server error on  product." });
    }
  };

  exports.handleQuery = async (req, res) => {
    try {
      const { query } = req.body;
  
      const products = await Product.find({ $text: { $search: query } })
        .populate("category", "_id name")
        .exec();
      res.json(products);
    } catch (err) {
      // console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };