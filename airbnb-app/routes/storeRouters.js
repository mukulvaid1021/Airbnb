//External module
const express = require('express');
const path = require('path');
const rootDir = require("../utils/pathUtil");
const storeRouters = express.Router();

// Local Module
const homescontroller = require("../controllers/storecontroller");

storeRouters.get("/",homescontroller.getindex);
storeRouters.get("/homes",homescontroller.gethomes);
storeRouters.get("/bookings",homescontroller.getbookings);
storeRouters.get("/favourites",homescontroller.getfavouritelist);

storeRouters.get("/homes/:homeid",homescontroller.gethomedetails);

storeRouters.post("/favourites",homescontroller.postAddToFavourite);

storeRouters.post("/favourites/delete/:homeid",homescontroller.postremoveFavourite);

module.exports = storeRouters; 