//const http = require('http');

//external module

const express = require('express');

//local module

const requesthandler = require('./users');

const app = express();
//first middle ware
app.get("/",(req,res,next)=>{
  console.log("Came in first middleware ",req.url,req.method);
  //res.send("<p>Came from another middleware</p>");
  next();
});
//second middle ware
app.use("/submit-details",(req,res,next)=>{
  console.log("Came in second middleware ",req.url,req.method);
  res.send("<p>Welcome to jj colony</p>");
});

//Another middleware
app.post("/",(req,res,next)=>{
  console.log("Came in another middleware ",req.url,req.method);
  res.send("<p>Welcome to another colony</p>");
});

//const server = http.createServer(app);

const PORT = 3001;
//server.listen
app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
});