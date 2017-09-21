const mongoose = require('mongoose');

const todo = mongoose.model('Todo', {
  text: {
    type: String,
    // Self explanatory
    required: true,
    minlength: 1,
    // Cuts off empty space at the beginning and end of explanatory
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completeAt: {
    type: Number,
    default: null
  }
});

module.exports = {
  todo
}
