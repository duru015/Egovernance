const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const registration = new Schema({
    firstname:{
        type:String,
        required:true
    },
    middlename:{
        type:String
        
    },
    lastname:{
        type:String,
        required:true
    },
    Dateofbirth:{
        type:String,
        required:true
    },
    Fathername:{
        type:String,
        required:true
    },
    mothername:{
        type:String,
        required:true
    },
    PermanentAddress:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    BirthPlace:{
        type:String,
        required:true
    },
    Grandfather:{
        type:String,
        required:true
    },
    fathercitizenship:{
        type:Number,
        required:true
    },
    mothercitizenship:{
    type:Number
    },
    image:{
      type:String,
      required:false  
    },
},{timestamps:true});
const Register = mongoose.model("Register",registration);
module.exports=Register;