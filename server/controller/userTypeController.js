const UserTypeModel = require("../model/userTypeModel")

module.exports.addUserType = function (req, res) {
    // let  userTypeID = parseInt(Math.random()*1000000)
    let userTypeName = req.body.userTypeName

    let userType = new UserTypeModel(
        { 
            "userTypeName": userTypeName
        }
    )

    userType.save(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                msg: "User Type not added",
                status: -1,
                data: "Something went wrong!!"
            })
        } else {
            res.json({
                msg: "User Type added",
                status: 200,
                data: data
            })
        }
    })
}//addUserType

//getAllUserTypes
module.exports.getAllUserTypes = function(req,res){
    UserTypeModel.find(function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: err
            })
        }else{
            res.json({
                msg: "User Types ret...",
                status: 200,
                data: data
            })
        }
    })
}//getAllUserTypes


//deleteUserTypes
module.exports.deleteUserTypes = function(req,res){

    let UserTypeId = req.body.UserTypeId 
    UserTypeModel.deleteOne({_id:UserTypeId},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: UserTypeId
            })
        }else{
            res.json({
                msg: "User Type removed...",
                status: 200,
                data: data
            })
        }
    })


}//deleteUserTypes

//updateUserTypes
module.exports.updateUserTypes = function(req,res){
    let userTypeId = req.body.userTypeId
    let userTypeName  = req.body.userTypeName

    UserTypeModel.updateOne({_id:userTypeId},{userTypeName:userTypeName},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: userTypeId
            })
        }else{
            res.json({
                msg: "User Types updated...",
                status: 200,
                data: data
            })
        }
    })

}//updateUserTypes

