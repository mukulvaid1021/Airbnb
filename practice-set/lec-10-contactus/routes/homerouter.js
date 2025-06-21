const express = require('express');

const path = require('path');
const homerouter = express.Router();

homerouter.get("/",(req,res,next)=>{
  console.log("It handle / ",req.url,req.method);
  res.sendFile(path.join(__dirname,'../','views','home.html'));
});

module.exports = homerouter;