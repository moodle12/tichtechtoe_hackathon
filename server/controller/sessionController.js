const UserModel = require("../model/userModel");
const parInstTeachModel=require("../model/parInstTeachModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const userModel = require("../model/userModel");
let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf allowed!'));
        }
    }
});
//addUser
module.exports.addUser = function (req, res) {
  let userType = req.body.userType;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phoneNum = req.body.phoneNum;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  let user = new UserModel({
    // "userID": userID,
    userType: userType,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNum: phoneNum,
    password: password,
    confirmPassword: confirmPassword,
  });

  user.save(function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        msg: "User not added",
        status: -1,
        data: "Something went wrong!!",
      });
    } else {
      res.json({
        msg: "User added",
        status: 200,
        data: data,
      });
    }
  });
}; //addUser

module.exports.registerUser = async (req, res) => {
    // router.post('/user-document', upload.single('License'), (req, res, next) => {
    //     const url = req.protocol + '://' + req.get('host')
    //     const user = new User({
    //         user: req.body.user,
    //         License: url + '/public/' + req.file.filename
    //     });
    //     user.save().then(result => {
    //         res.status(201).json({
    //             message: "Document registered successfully!",
    //             userCreated: {
    //                 user: result.user,
    //                 License: result.License
    //             }
    //         })
    //     }).catch(err => {
    //         console.log(err),
    //             res.status(500).json({
    //                 error: err
    //             });
    //     })
    // })
  const {firstName, lastName,InstituteName, email, password, phoneNum, confirmPassword} =
    req.body;
    // const url = req.protocol + '://' + req.get('host')
    // const aadharCard=url + '/public/' + req.file.filename
    const userType="63b1d1332ff131c0ff65b0f9"
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
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = UserModel.create({
    userType,
    firstName,
    lastName,
    email,
    password,
    phoneNum,
    confirmPassword,
    InstituteName
  });

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNum: user.phoneNum,
      confirmPassword: user.confirmPassword,
      userType:"63b1d1332ff131c0ff65b0f9",
      InstituteName:user.InstituteName,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred while creating user!");
  }
};

module.exports.login = async (req, res) => {
  //logic
  let email = req.body.email;
  let password = req.body.password;
  let userType = req.body.userType;
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }

  const user = await parInstTeachModel.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
      userType: user.userType,
      status:200
    });
  }
}
module.exports.StudentLogin = async (req, res) => {
    //logic
    let Sid = req.body.Sid;
    let password = req.body.password;
    if (!(Sid && password)) {
      res.status(400).send("All input is required");
    }
  
    const user = await userModel.findOne({ _id: Sid });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        Sid: user.Sid,
        token: generateToken(user._id),
        userType: user.userType,
        status:200
      });
    }
  }
  // UserModel.findOne({
  //     $and: [
  //         { "email": email },
  //         { "password": password }
  //     ]
  // }).exec(function (err, data) {
  //     if (data == "" || data == undefined) {
  //         res.json({
  //             status: -1,
  //             msg: "Invalid Credentails",
  //             data: req.body
  //         })
  //     } else {
  //         res.json({
  //             status: 200,
  //             msg: "Login done...",
  //             data: data
  //         })
  //     }
  // });
//
//adduserends
// module.exports.signup = async(req, res)=> {
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     let email = req.body.email;
//     let phoneNum= req.body.phoneNum;
//     let password = req.body.password;
//     let confirmPassword=req.body.confirmPassword;
//     // let role = req.body.role
//     if (!(email && password && firstName && lastName && phoneNum && password && confirmPassword)) {
//         res.status(400).send("All input is required");
//       }
//     console.log(req.body);
//     let u = {
//         "firstName": firstName,
//         "lastName": lastName,
//         "email": email,
//         "phoneNum":phoneNum,
//         "password": password,
//         "confirmPassword":confirmPassword
//     }

//     let user = new UserModel(u)
//     const oldUser = await UserModel.findOne({email:email });
//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }
//     encryptedPassword = await bcrypt.hash(password, 10);
//     user.save(function (err, success) {
//         if (err) {
//             res.json({
//                 status: -1,
//                 msg: "SME",
//                 data: err
//             })
//         } else {
//             res.json({
//                 status: 200,
//                 msg: "user added",
//                 data: success
//             })
//         }
//     })
// }

module.exports.getAllUsers = function (req, res) {
  UserModel.find().populate("userType").exec(function (err, data) {
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

module.exports.getuserByid = function (req, res) {
  let userid = req.params.userid;
  UserModel.findOne({ _id: userid }, function (err, data) {
    if (err) {
      res.json({
        status: -1,
        msg: "SME",
        data: err,
      });
    } else {
      res.json({
        status: 200,
        msg: "user reterieved..",
        data: data,
      });
    }
  });
};

