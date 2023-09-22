const mongoose = require("mongoose")

const UserDocumentSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Lc:{
        type:String
    }
})

module.exports=mongoose.model("UserDocument",UserDocumentSchema)