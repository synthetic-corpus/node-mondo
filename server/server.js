const mongoose = require('mongoose');

// Set promise for Mongoose. Is global. Needs only once.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Models used to store data?
const Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completeAt: {
    type: Number
  }
});

// Creates a new object. Note well, not all the parameters are required

var aTask = new Todo({
  text: "Drink Wine"
})

// Saves the Todo to the Database
aTask.save().then((document)=>{
  console.log('Saved this: ',document);
}, (e) => {
  console.log("Why did you break the interent?");
})
