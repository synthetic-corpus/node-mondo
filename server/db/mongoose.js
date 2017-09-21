const mongoose = require('mongoose');

// Set promise for Mongoose. Is global. Needs only once.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
