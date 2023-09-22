const mongoose = require("mongoose")

const UserProfileSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    profileImg:{
        type:String
    }
    // imgname:{
    //     type:String,
    //     required:true
    // },
    // image:{
    //     data:Buffer,
    //     contentType:String
    // }
})

module.exports=mongoose.model("UserProfile",UserProfileSchema)