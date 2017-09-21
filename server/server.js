const mongoose = require('mongoose');

// Set promise for Mongoose. Is global. Needs only once.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Models used to store data?
const Todo = mongoose.model('Todo', {
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

// New Model that I am creating

const userForm = mongoose.model('userData', {
  username: {
    type: String,
    require: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 4
  },
  species: {
    type: String,
    default: "human"
  }
})

// Creates a new object. Note well, not all the parameters are required

var aTask = new userForm({
  username: "   This is my name ",
  email: "fred@zerohedge.net"
})

// Saves the Todo to the Database
aTask.save().then((document)=>{
  console.log('Saved this: ',document);
}, (e) => {
  console.log("Why did you break the interent?");
  console.log(e.errors);
})
