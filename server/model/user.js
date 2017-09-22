const mongoose = require('mongoose');

const userModel = mongoose.model('userModel', {
  userName: {
    type: String,
    // Self explanatory
    required: true,
    minlength: 1,
    // Cuts off empty space at the beginning and end of explanatory
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  species: {
    type: String,
    default: "human",
    minlength: 1,
    trim: true
  }
});

module.exports = {
  userModel
}
