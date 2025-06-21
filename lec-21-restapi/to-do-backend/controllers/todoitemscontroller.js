const todoitem = require("../models/todoitem");

exports.createtodoitem = async (req, res, next) => {
 console.log("req.body");
 const { task, date } = req.body;
 const todoitem = new todoitem({
   task, date });
   await todoitem.save();
  res.status(201).json(todoitem);
}