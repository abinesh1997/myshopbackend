const express = require("express");
const {
  createProduct,
  getAllproduct,
  getSingleproduct,
  updateproduct,
  updateImage,
  deleteProduct,
  getproductDetails,
  listRelatedProduct,
  getProductsByCategory,
  handleQuery,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const { protect, checkAdmin } = require("../middleware/protect");

const router = express.Router();

router.post("/product", upload.single("image"), protect, checkAdmin, createProduct);
router.get("/products", getAllproduct);
router.get("/product/:id", getSingleproduct);
router.put("/product/:id", updateproduct);
router.put("/product-image/:id", upload.single("image"), protect, checkAdmin, updateImage);
router.delete("/product/:id",  protect, checkAdmin, deleteProduct);
router.get("/related/product/:productId", listRelatedProduct);
router.get("/product/:slug/:id", getproductDetails);
router.get("/products/:slug", getProductsByCategory);
router.post ("/search", handleQuery);
module.exports = router;
