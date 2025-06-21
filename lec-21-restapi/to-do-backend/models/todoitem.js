const mongoose = require('mongoose');

const todoitemSchema = mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  date: Date,
  completed: {
    type: Boolean,
    default: false
  },
},{
  timeatamps: true,}
);

module.exports = mongoose.model('todoitem',todoitemSchema);