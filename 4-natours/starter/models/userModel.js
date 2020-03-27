const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'User must have a first name'],
    unique: false
  },
  last_name: {
    type: String,
    required: [true, 'User must have a last name'],
    unique: false
  },
  email: {
    type: String,
    required: [true, 'User must have an email']
  },
  tours: {
    type: Array,
    default: []
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
