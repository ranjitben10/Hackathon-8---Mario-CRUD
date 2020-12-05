const mongoose = require('mongoose');

//  Your code goes here
const mario=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    }
})
const marioModel=mongoose.model("User",mario);


module.exports = marioModel;