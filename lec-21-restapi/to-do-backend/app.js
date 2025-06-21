// core module
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const DB_PATH = "mongodb+srv://root:root@completecoding.b0hjldc.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";
const errorscontroller = require('./controllers/error');
const path = require('path');
// External module
const express = require('express');
const todoitem = require('./models/todoitem');
const todoitemsrouters = require('./routes/todoitemsrouters');
//Local Module

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo",todoitemsrouters);
app.use(errorscontroller.pagenotfound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('connected to Mongo');
  app.listen(PORT,() => {
console.log(`server is running on http://localhost:${PORT}`);
});
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
