// core module
const path = require('path');
// External module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-Home",(req,res,next)=>{
  res.render('addhome',{pageTitle : 'Add home to airbnb',currentPage: 'addhome'});
})
// array for store reg house

const registeredhomes = [];

hostRouter.post("/add-Home",(req,res,next)=>{
  console.log('Home registration successfully for:',req.body);
  registeredhomes.push(req.body);
  res.render('addedhome',{pageTitle : 'home added successfully',currentPage: 'addedhome'});
})

exports.hostRouter = hostRouter;
exports.registeredhomes = registeredhomes