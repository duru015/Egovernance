const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const {body,validationResult}= require("express-validator");
const {matchedData,sanitizebody}=require("express-validator");
const path = require("path");
const pdf = require("html-pdf");
var option = { format: "a4" };
const fs = require("fs");
var html = fs.readFileSync("views/lastpage.ejs", "utf8");
const Register = require("../models/register.model");
const { connection } = require("../dataconect/mongo");
const {
  saveNewUser,
  checkExistingUser,
} = require("../controller/user/register");
const fileStorageEngine = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./images');
  },
    filename: (req,file,cb)=>{
      cb(null,`${Date.now()}-${file.originalname}`);
    },
  
});
const upload = multer({storage: fileStorageEngine,  fileFilter: function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
  }
  callback(null, true)
},
});
const bodyParser = require("body-parser");
const Router = express.Router();
const urlencoded = bodyParser.urlencoded({extended:false});
Router.use(express.json());
//Router.use(express.urlencoded());
Router.use(bodyParser.urlencoded({extended:true}));
Router.get("/data", async (req, res, next) => {
  const user = await Register.find();
  if (!user) {
    throw new Error("user is not found");
  } else {
    res.status(200).json(user);
  }
});
Router.post("/download", (req, res) => {
  const { filename } = req.body;
  res.download(`${filename}`, `Birth-certificate.pdf`);
});
Router.post("/signup",upload.single("image"),urlencoded,body("firstname").isLength({min:4}).withMessage("Enter firstname"),body("lastname","Enter Lastname").isLength({min:4}),body("Dateofbirth","Dateofbirth is required").isDate(),body('PermanentAddress',"Enter Permanent Address").isLength({min:3}),body("Fathername","Enter your Fathername").isLength({min:3}),body("mothername","Enter your mothername").isLength({min:3}),body("Gender","Select your Gender").exists().isIn(['Male','Female']).withMessage("select your Gender"),body("BirthPlace","Enter your Birthplace").isLength({min:3}),body("Grandfather","Enter Grandfathername").isLength({min:3}),body("fathercitizenship","Enter Father citizenship number").notEmpty().isInt(),body("mothercitizenship","Enter Mother citizenship").not().isEmpty(), async (req, res, next) => {
 
  try {
    console.log(req.body);
    const user1 = matchedData(req); 
    const errors = validationResult(req);
    
    // console.log(errors);
    if(!errors.isEmpty()){
      const user1 = matchedData(req);
      // console.log(user1);
      return res.render('registpage1',{errors:errors.mapped(),users:user1});
    }
    const user = await checkExistingUser(req.body);
    
    if (!user) {
      const newUser = await saveNewUser({...req.body,image:req.file.filename});
      // console.log("successfully Created");
      res.render("registpage.ejs", { user: newUser});
    } else {
      console.log("Already used");
      res.status(401).json("already used");}
  
  } catch (err) {}
});
Router.post("/pdf", async function (req, res) {
  try {
    
    const { firstname } = req.body;
    const user = await Register.findOne({ firstname: firstname });
    let filename = `user-${user._id}`;
    res.render("lastpage.ejs", { user: user }, function (err, html) {
      if (!err) {
        pdf
          .create(html, option)
          .toFile(`./Public/${filename}.pdf`, function (err, resp) {
            if (err) {
              console.log(err);
            } else {
              filename = resp.filename;
              res.set({
                'Location': "https://google.com"
            });
             res.download(`${filename}`, `Birth-certificate.pdf`);
            
            }
            
          });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = Router;
