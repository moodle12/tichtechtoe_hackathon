const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    userType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usertype"
    },
    InstituteName:{
        type:String
    },
    aadharCard:{
        type:String
    },
    firstName: {
      type: String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    phoneNum:{
        type:Number
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    }
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports = mongoose.model("User",UserSchema)