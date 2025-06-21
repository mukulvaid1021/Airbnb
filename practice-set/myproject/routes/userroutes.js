const express = require('express');
const path = require('path');

const userroutes = express.Router();

// Route: Home page
userroutes.get("/",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','home.html'));
});

// Route: login page
userroutes.get("/login",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','login.html'));
});

// Route: loginsuccess page
userroutes.post("/loginsuccessfully",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','loginsuccessfully.html'));
});



module.exports = userroutes;