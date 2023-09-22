const leaveUserModel = require("../model/leaveUserModel");

module.exports.addleaveUser= function (req, res) {
   
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let mobileNo = req.body.mobileNo
    let currentInstitute=req.body.currentInstitute
    let reasonLeaving=req.body.reasonLeaving
    let user=req.body.user

    let leave = new leaveUserModel(
        { 
            
            "firstName": firstName,
            "lastName":lastName,
            "email":email,
            "mobileNo":mobileNo,
            "currentInstitute":currentInstitute,
            "reasonLeaving":reasonLeaving,
            "user":user
        }
    )

    leave.save(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                msg: "Leave not accepted",
                status: -1,
                data: "Something went wrong!!"
            })
        } else {
            res.json({
                msg: "Leave Successful",
                status: 200,
                data: data
            })
        }
    })
}//addadmission

//getAllAdmissions
module.exports.getAllLeaves = function(req,res){
    leaveUserModel.find().populate("user").exec(function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: err
            })
        }else{
            res.json({
                msg: "Applications ret...",
                status: 200,
                data: data
            })
        }
    })
}//getAllUser


//deleteUser
module.exports.deleteAdmission = function(req,res){

    let admissionID = req.body.admissionID 
    leaveUserModel.deleteOne({_id:admissionID},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: admissionID
            })
        }else{
            res.json({
                msg: "Admission removed...",
                status: 200,
                data: data
            })
        }
    })


}//deleteUser

//updateUser
module.exports.updateAdmission = function(req,res){
    let admissionID = req.body.admissionID
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let mobileNo = req.body.mobileNo
    let address = req.body.address
    let gender = req.body.gender
    let dob = req.body.dob
    let password = req.body.password
    let falseAttempts = req.body.falseAttempts
    let isApproved = req.body.isApproved

    leaveUserModel.updateOne({_id:admissionID},{firstName: firstName, lastName:lastName, email:email, mobileNo:mobileNo, address:address, gender:gender, dob:dob, password:password,falseAttempts:falseAttempts,
    isApproved:isApproved},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: admissionID
            })
        }else{
            res.json({
                msg: "Admission updated...",
                status: 200,
                data: data
            })
        }
    })

}