const mongoose = require('mongoose');

// Set promise for Mongoose. Is global. Needs only once.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Models used to store data?
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completeAt: {
    type: Number;
  }
});
