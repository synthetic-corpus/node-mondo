const { mongoose } = require('.././db/mongoose');
const { Todo } = require('.././model/todo');
const { userModel } = require('.././model/user');

var id = "59c94a98bb021110af7cc73d";

Todo.find({
  // Nota Bene: here you can pass on an ID as a string.
  _id: id,
}).then((todos)=> {
  console.log("Called Find");
  console.log('Todos..',todos);
});

Todo.findOne({
  completed: true
}).then((todo)=>{
  console.log("Called Find One");
  console.log("Got this.. ",todo);
})
