//External module
const express = require('express');
const authRouters = express.Router();

// Local Module
const authcontroller = require("../controllers/authcontroller");

authRouters.get("/login", authcontroller.getLogin);
authRouters.post("/login", authcontroller.postLogin);
authRouters.post("/logout", authcontroller.postLogout);

module.exports = authRouters; 