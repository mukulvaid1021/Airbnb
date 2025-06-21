// core module
const path = require('path');
//External module
const express = require('express');
const userRouter = express.Router();


// Local Module
const rootDir = require("../utils/pathUtil");
const { registeredhomes } = require('./hostRouter');

userRouter.get("/",(req,res,next)=>{
  console.log(registeredhomes);
  res.render('home',{registeredhomes : registeredhomes,pageTitle: 'home-airbnb',currentPage: 'HOME'});
});

module.exports = userRouter; 