// const UserProfileModel = require("../model/userProfileModel")
// const multer= require("multer")
// const fs=require("fs")
// //storage
// const Storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//       },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     },
// });

// const upload=multer({
//     storage:Storage
// }).single('testImage')

// module.exports.addUserProfile=function(req,res){
//     upload(req,res,(err)=>{
//         if (err) {
//             console.log(err);
//         }
//         else{
//             const newUserProfile= new UserProfileModel({
//                 user:req.body.user,
//                 imgname:req.body.imgname,
//                 image:{
//                     data:fs.readFileSync("uploads/" + req.file.filename),
//                     contentType:"image/png",
//                 },
//             });
//             newUserProfile.save().then(()=>res.send("Successfully uploaded Profile")).catch((err)=>console.log(err))
//         }
//     })
// }

// module.exports.getAllUserProfiles = function (req, res) {
//     UserProfileModel.find().populate("user").exec(function (err, data) {
//         if (err) {
//             res.json({
//                 status: -1,
//                 msg: "SME",
//                 data: err
//             })
//         } else {
//             res.json({
//                 status: 200,
//                 msg: "User Profile Reter....",
//                 data: data
//             })
//         }
//     })
// }

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
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
let User = require('../model/userProfileModel');
router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        user: req.body.user,
        profileImg: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                user: result.user,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    User.find().populate("user").then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});
module.exports = router;