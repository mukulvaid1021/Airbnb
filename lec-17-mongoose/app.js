// core module
const path = require('path');
// External module
const express = require('express');
//Local Module
const storeRouters = require("./routes/storeRouters")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorscontroller = require("./controllers/error");
const { default: mongoose } = require('mongoose');


const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded()); 

app.use(storeRouters);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,'public',)))

app.use(errorscontroller.pagenotfound);

const PORT = 3000;
const DB_PATH = "mongodb+srv://root:root@completecoding.b0hjldc.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";

mongoose.connect(DB_PATH).then(() => {
  console.log('connected to Mongo');
  app.listen(PORT,() => {
console.log(`server is running on http://localhost:${PORT}`);
});
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
