const express = require('express');
const path = require('path');

const hostroutes = express.Router();

hostroutes.get("/men", (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'mens.html'));
})

hostroutes.get("/women", (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'women.html'));
})

hostroutes.get("/kids", (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'kids.html'));
})

hostroutes.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
})

module.exports = hostroutes;