const Banner = require("../models/bannerModel");

exports.createBanner = async (req, res )=>{
    try{
        const banner = await new Banner();
        if(req.file){
            banner.image = req.file.path;
        }
        banner.save();
        res.status(200).json({
            success: true,
            message: "Banner created sucessfully",
            banner,
        });
    } catch (error) {
        res.status(400).json({
            message: "Banner created failed"
        })
    }
};

exports.allBanners = async(req,res)=>{
    try{
        const banners = await Banner.find({}).sort([["creadedAt", "desc"]])
        res.status(200).json(banners);
           

    } catch (error){
        res.status(400).json({
            message: "Server failed"})
    }
};

exports.deleteBanner = async (req, res) => {
    try {
      const deleted = await Banner.findOneAndDelete(
        { _id: req.params.id });
      
      res.status(200).json({message: "Banner deleted sucessfully."});
    } catch (error) {
    
      res.status(400).json({ message: " Banner delete faild." });
    }
  };