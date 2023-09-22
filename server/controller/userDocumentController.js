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
let User = require('../model/userDocumentModel');
router.post('/user-document', upload.single('Lc'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        user: req.body.user,
        Lc: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "Document registered successfully!",
            userCreated: {
                user: result.user,
                Lc: result.Lc
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