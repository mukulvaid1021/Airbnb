// core module
const path = require('path');
// External module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathutils");

hostRouter.get("/add-Home",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','addhome.html'));
})
hostRouter.post("/add-Home",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','addedhome.html'));
  res.send
})


module.exports = hostRouter;