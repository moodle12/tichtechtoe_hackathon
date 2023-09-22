const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    password:{
        type:String
    }
})


module.exports = mongoose.model("Result",resultSchema)