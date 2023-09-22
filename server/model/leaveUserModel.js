const mongoose = require("mongoose");

const LeaveUserSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
    },
    mobileNo:{
        type:Number
    },
    currentInstitute:{
        type:String
    },
    reasonLeaving:{
        type:String
    }
});

module.exports=mongoose.model("LeaveUser",LeaveUserSchema)