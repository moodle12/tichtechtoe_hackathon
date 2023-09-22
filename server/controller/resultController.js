const resultModel = require("../model/resultModel")
module.exports.addResult= function(req,res)
{
    let user = '633fc674d5514ba3a06ca077';
    let password = req.body.password;
    let result = new resultModel(
        {
            // "postId":postId,
            "user":user,
            "password":password
        }
    )
    result.save(function(err,sucess){
        if(err)
        {
            console.log(err);
                res.json({
                    "msg":"result not added",
                    status:-1,
                    data:"SWR"
                })   
        }
        else
        {
            res.json({
                "msg":"result Added Succesfully",
                status:200,
                data:sucess
            })
        }
        })

}// Adding result

module.exports.getAllResults = function (req,res)
{
    // let id= req.body.user;
    resultModel.find().populate("user").exec(function(err,succes){
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SwR",
                status:-1,
                data:err
            })
        }
        else
        {
            res.json({
                "msg":"results retrived",
                status:200,
                data:succes
            })
        }
    })
}// end of get all results

