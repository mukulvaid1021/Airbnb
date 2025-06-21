// core module
const path = require('path');
// External module
const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-Home",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','addhome.html'));
})
hostRouter.post("/add-Home",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','addedhome.html'));
  res.send
})


module.exports = hostRouter;