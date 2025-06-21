//External module
const express = require('express');
const todoitemsrouters = express.Router();

// Local Module
const todoitemscontroller = require("../controllers/todoitemscontroller");


todoitemsrouters.post("/", todoitemscontroller.createtodoitem);

module.exports = todoitemsrouters; 