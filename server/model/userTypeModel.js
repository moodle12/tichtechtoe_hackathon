const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema({
    userTypeName:{
        type:String
    }
})


module.exports = mongoose.model("Usertype",UserTypeSchema)