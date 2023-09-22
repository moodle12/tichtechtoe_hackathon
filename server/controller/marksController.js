const marksModel = require("../model/marksModel")
module.exports.addMarks= function(req,res)
{
    let firstStd= 88;
    let secondStd= 95;
    let thirdStd= 83;
    let fourthStd= 70;
    let fifthStd= 68;
    let sixthStd= 90;
    let seventhStd= 78;
    let eightStd= 85;
    let ninthStd= 86;
    let tenthStd= 93;
    let eleventhStd= 59;
    let twelfthStd= 65;
    let marks = new marksModel(
        {
            // "postId":postId,
            "firstStd":firstStd,
            "secondStd":secondStd,
            "thirdStd":thirdStd,
            "fourthStd":fourthStd,
            "fifthStd":fifthStd,
            "sixthStd":sixthStd,
            "seventhStd":seventhStd,
            "eigthStd":eightStd,
            "ninthStd":ninthStd,
            "tenthStd":tenthStd,
            "eleventhStd":eleventhStd,
            "twelfthStd":twelfthStd
        }
    )
    marks.save(function(err,sucess){
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
                "msg":"Marks Added Succesfully",
                status:200,
                data:sucess
            })
        }
        })

}// Adding result

module.exports.getAllMarks = function (req,res)
{
    // let id= req.body.user;
    marksModel.find().exec(function(err,succes){
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
                "msg":"Marks retrived",
                status:200,
                data:succes
            })
        }
    })
}// end of get all results
