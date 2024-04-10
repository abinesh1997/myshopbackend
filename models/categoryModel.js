const mongoose = require ("mongoose");

const categorySchema = new mongoose.Schema(
    {
    title: {
        type:String,
        trim: true,
        require:true,
    },
    slug: {
        type:String,
        trim: true,
        require:true,
    },
},
    {timestamps: true}
);
module.exports=mongoose.model("category",categorySchema);
