const mongoose = require("mongoose")

const ImageSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Img:{
        type:String
    }
})

module.exports=mongoose.model("Image",ImageSchema)