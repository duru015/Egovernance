const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const bodyParser = require("body-parser");
const {connection}= require("./dataconect/mongo");
const Register = require("./models/register.model");
const Router = require("./router/router");
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use("/sheetal",express.static('./Public/image'));
app.use("/janakpur",express.static('./Public/image'));
app.use("/everest",express.static('./Public/image'));
app.use("/lumbini",express.static('./Public/image'));
app.use("/nav",express.static('./Public/image'));
app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname, 'views/index1.html'));
});
app.set("view engine","ejs");
app.get("/registration",(req,res)=>{
    res.render("registpage1.ejs");
});
app.use("/register",Router);

app.listen(8000,()=>{
    console.log("server is running successfully");
})