// core module
const path = require('path');
//External module
const express = require('express');
const userRouter = express.Router();

const rootDir = require("../utils/pathutils");

userRouter.get("/",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','home.html'));
});

module.exports = userRouter; 