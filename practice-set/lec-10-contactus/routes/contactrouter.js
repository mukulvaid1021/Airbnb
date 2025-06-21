const express = require('express');
const path = require('path');
const contactrouter = express.Router();

 contactrouter.get("/contact-us",(req,res,next)=>{
      res.sendFile(path.join(__dirname,'../','views','contactus.html'));
 })

 contactrouter.post("/contact-us",(req,res,next)=>{
  console.log(req.body);
      res.sendFile(path.join(__dirname,'../','views','contact-success.html'));
 })

 module.exports = contactrouter;