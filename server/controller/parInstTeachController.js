const parInstTeachModel = require("../model/parInstTeachModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

module.exports.registerParInstTeach= async (req, res) => {
    const {name,userType, email, password, phoneNum, confirmPassword} =
      req.body;
  //   if (
  //     !( email &&
  //       password &&
  //       firstName &&
  //       lastName &&
  //       phoneNum &&
  //       password &&
  //       confirmPassword
  //     )
  //   ) {
  //     res.status(400).send("All input is required");
  //   }
    const userExists = await parInstTeachModel.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }
  
    const user = parInstTeachModel.create({
      userType,
      name,
      email,
      password,
      phoneNum,
      confirmPassword,
    });
  
    if (user) {
      res.json({
        _id: user._id,
        name:user.name,
        email: user.email,
        password: user.password,
        phoneNum: user.phoneNum,
        confirmPassword: user.confirmPassword,
        userType:user.userType,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Error Occurred while creating user!");
    }
  };

  module.exports.getAllParInstTeach = function (req, res) {
    parInstTeachModel.find().populate("userType").exec(function (err, data) {
        if (err) {
          res.json({
            status: -1,
            msg: "SME",
            data: err,
          });
        } else {
          res.json({
            status: 200,
            msg: "User Reter....",
            data: data,
          });
        }
      });
  };