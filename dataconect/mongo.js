const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/project1";
const connection = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
connection.then((db)=>{
console.log("Database is connected successfully");
})
.catch((err)=>{
    console.log(err);
});
module.exports={connection};
