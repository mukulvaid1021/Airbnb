const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    unique: true,
  },
   email: {
    type: String,
    required: true,
    unique: true, // To prevent duplicate emails
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  usertype: {
    type: String,
    enum: ['guest', 'host'],
    default: 'guest',
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
  }],
});

module.exports = mongoose.model('User',userSchema);