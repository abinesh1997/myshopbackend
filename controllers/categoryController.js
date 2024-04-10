const Category = require("../models/categoryModel");
var slugify = require("slugify");

module.exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    const checkCategory = await Category.findOne({ title });
    if (checkCategory) {
      res.status(400).json({ message: "this Category has already taken" });
    } else {
      const category = await new Category({
        title,
        slug: slugify(title),
      }).save();
      res.status(200).json({
        sucess: true,
        message: "Category create sucessfully",
        category,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Category create failed" });
  }
};

module.exports.list = async (req, res) => {
  let categories = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.status(200).json(categories);
};

module.exports.read = async (req, res) => {
  console.log(req.params.slug);
  try {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
  }
};

module.exports.update = async (req, res) => {
  const { title } = req.body;
  try {
    const updatedCaterygory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { title: title, slug: slugify(title) },
      { new: true }
    );
    res.status(200).json(updatedCaterygory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Category update failed" });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.status(200).json({ message: "Category delete sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Category delete failed" });
  }
};
