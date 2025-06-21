// core module
const path = require('path');
// External module
const express = require('express');
//Local Module
const userRouter = require("./routes/userRouters")
const {hostRouter}= require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded()); 

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,'public',)))

app.use((req, res, next) => {
  res.status(404).render('404',{pageTitle: '404 Page is not found in Airbnb'});});

const PORT = 3000;
app.listen(PORT,()=>{
console.log(`server is running on http://localhost:${PORT}`);
});