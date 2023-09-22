const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marksSchema = new mongoose.Schema({
    firstStd: {
      type: String,
    },
    secondStd:{
        type:String
    },
    thirdStd:{
        type:String
    },
    fourthStd:{
        type:String
    },
    fifthStd:{
        type:String
    },
    sixthStd:{
        type:String
    },
    seventhStd:{
        type:String
    },
    eightStd:{
        type:String
    },
    ninthStd:{
        type:String
    },
    tenthStd:{
        type:String
    },
    eleventhStd:{
        type:String
    },
    twelfthStd:{
        type:String
    }
    // ,role:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Role"
    // }
});
 

module.exports = mongoose.model("Mark",marksSchema)