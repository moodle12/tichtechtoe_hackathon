const express = require("express");
const mongoose = require("mongoose");
const sessionController  = require("./controller/sessionController");
const leaveUserController = require("./controller/leaveUserController");
const userTypeController = require("./controller/userTypeController");
const resultController = require("./controller/resultController");
const marksController = require("./controller/marksController");
const imageController=require("./controller/imageController")
const userDocumentController=require("./controller/userDocumentController")
const parInstTeachController=require("./controller/parInstTeachController")
const auth= require("./middleware/auth")
const bodyParser= require("body-parser")
const api = require('./controller/userProfileController')
const multer=require("multer")
const app = express()
const cors = require("cors")
require("dotenv").config()
app.use(express.json())  //body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.urlencoded({extended:true}))
app.use(cors())
mongoose.connect("mongodb://localhost:27017/studentManagement",function (err) {

    if (err) {
        console.log("OH NO!! Something went wrong!");
        console.log(err);
    }
    else{
        console.log("db Connected Successfully...");
    }
    
})

//registration--api
app.post("/register",sessionController.registerUser)
app.get("/getallusers",sessionController.getAllUsers)
app.post("/login",sessionController.login)
app.post("/student/login",sessionController.StudentLogin)

//users
app.post("/user",sessionController.addUser)
app.get("/getuserbyid/:userid",sessionController.getuserByid)

//usertype--api
app.get('/userType',userTypeController.getAllUserTypes)
app.post('/userType',userTypeController.addUserType)
app.delete('/userType',userTypeController.deleteUserTypes)
app.put('/userType',userTypeController.updateUserTypes)

//leaveuser--api
app.get('/leaveUser',leaveUserController.getAllLeaves)
app.post('/leaveUser',leaveUserController.addleaveUser)
app.delete('/leaveUser',leaveUserController.deleteAdmission)
app.put('/leaveUser',leaveUserController.updateAdmission);

//result-api
app.get('/result',resultController.getAllResults);
app.post('/result',resultController.addResult);

//marks--api
app.get('/marks',marksController.getAllMarks);
app.post('/marks',marksController.addMarks);

//image--api
// app.post('/upload',imageController.addImage)
// app.get('/upload',imageController.getImage)
//parents||teacher||institution --api
app.post('/registerAll',parInstTeachController.registerParInstTeach)
app.get('/getAll',parInstTeachController.getAllParInstTeach)


//userprofile--api
// app.post('/userprofile',userProfileController.addUserProfile)
// app.get('/userprofile',userProfileController.getAllUserProfiles)

//multer
// const upload=multer({dest:"public/images"});
//file upload api
app.use('/public', express.static('public'));
app.use('/api', api)
app.use('/document',userDocumentController)
app.use('/i',imageController)
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
// app.post("/imageupload",upload.single("profile"),(req,res)=>{
//     res.json({"msg":"profile pic uploaded..."})
// })
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'uploads/')
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + "-" + Date.now() + ".png")
//         }
//     })
// }).single('file_name');

// app.post("/uploadimg", upload, (req, resp) => {
//     resp.send("file upload")
// });


app.listen(9109,function(err){
    if(err){
        console.log("Server not connected....");
    }else{
        console.log("server started....at 9109");
    }
});