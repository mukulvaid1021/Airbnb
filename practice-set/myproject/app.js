const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded());

const userroutes = require("./routes/userroutes");
const hostroutes = require("./routes/hostroutes");

app.use(userroutes);
app.use("/",hostroutes);

const PORT = 3001;
app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
});