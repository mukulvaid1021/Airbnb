// core module
const path = require('path');
// External module
const express = require('express');
//Local Module
const userRouter = require("./routes/userRouters")
const hostRouter = require("./routes/hostRouter")

const app = express();
// yeah url ko log krta hain
app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
})

app.use(express.urlencoded()); 

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host",hostRouter);

app.use((req,res,next)=>{
 res.sendFile(path.join(__dirname,'views','404.html'));
})

const PORT = 3000;
app.listen(PORT,()=>{
console.log(`server is running on http://localhost:${PORT}`);
});