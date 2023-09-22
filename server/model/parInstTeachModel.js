const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const parInstTeachSchema = new mongoose.Schema({
    userType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usertype"
    },
    name:{
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
parInstTeachSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  parInstTeachSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports = mongoose.model("parInstTeach",parInstTeachSchema)