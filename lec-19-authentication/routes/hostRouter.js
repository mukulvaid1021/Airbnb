// External module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const hostcontroller = require("../controllers/hostcontroller");

hostRouter.get("/add-Home",hostcontroller.getaddhome);
// array for store reg house

hostRouter.post("/add-Home",hostcontroller.postaddhome);

hostRouter.get("/host-home-list",hostcontroller.gethosthomes);

hostRouter.get("/edit-home/:homeid",hostcontroller.getedithome);

hostRouter.post("/edit-home",hostcontroller.postedithome);

hostRouter.post("/delete-home/:homeid",hostcontroller.postdeletehome);
module.exports = hostRouter;