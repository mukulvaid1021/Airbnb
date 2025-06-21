//External module
const express = require('express');
const storeRouters = express.Router();

// Local Module
const homescontroller = require("../controllers/storecontroller");

storeRouters.get("/",homescontroller.getindex);
storeRouters.get("/homes",homescontroller.gethomes);
storeRouters.get("/bookings",homescontroller.getbookings);
storeRouters.get("/favourites",homescontroller.getfavouritelist);

module.exports = storeRouters; 