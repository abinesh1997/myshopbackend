
const express = require("express");
const { allBanners, createBanner, deleteBanner } = require("../controllers/bannerController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/banner", upload.single("image"), createBanner);
router.get("/banners", allBanners);


router.delete("/banner/:id",deleteBanner);

module.exports= router;