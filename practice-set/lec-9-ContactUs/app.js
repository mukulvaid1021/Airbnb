const express = require('express');

const app = express();

//first middleware
app.use((req,res,next)=>{
  console.log("came in first middleware ",req.url,req.method);
  next();
});
//second middleware
app.use((req,res,next)=>{
  console.log("came in second middleware ",req.url,req.method);
  next();
});
//third middleware
//app.use((req,res,next)=>{
  //console.log("came in third middleware ",req.url,req.method);
  //res.send("<p>Welcome to Ghaziabad</p>");
//});
//handle path(/)
app.get("/",(req,res,next)=>{
  console.log("It handle / ",req.url,req.method);
  res.send("<p>Go to home</p>");
});
//handle path(/contactus)
app.get("/contact-us",(req,res,next)=>{
  console.log("It handle /contact-us ",req.url,req.method);
  res.send(
    `<p>Pls give your Details</p>
    <form action="/contact-us" method="POST">
    <input type="text" name="name" placeholder="Enter your name"/>
     <input type="email" name="emai" placeholder="Enter your email"/>
     <input type="Submit" />
     </form>
    `);
}); 
 // handle dontact-us for post
 app.post("/contact-us",(req,res,next)=>{
      console.log("handling /contact-us for POST ",req.url,req.method);
      res.send(`<h1>We will Contacct you</h1>`);
 })

const PORT = 3001;
app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
});