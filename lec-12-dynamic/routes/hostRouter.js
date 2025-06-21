// core module
const path = require('path');
// External module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-Home",(req,res,next)=>{
  res.render('addhome',{pageTitle : 'Add home to airbnb'});
})
// array for store reg house

const registeredhomes = [];

hostRouter.post("/add-Home",(req,res,next)=>{
  console.log('Home registration successfully for:',req.body,req.body.housename);
  registeredhomes.push({housename : req.body.housename});
  res.render('addedhome',{pageTitle : 'home added successfully'});
})

exports.hostRouter = hostRouter;
exports.registeredhomes = registeredhomes