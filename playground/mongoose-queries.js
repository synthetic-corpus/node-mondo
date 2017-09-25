const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { userModel } = require('./../server/model/user');
/*
userModel.findOne({
  userName: "BilboBaggins"
}).then((user)=>{

  if (!user){
    console.log("Empty and void");
    console.log(user);
    // Used to break the function only.
    return null;
  }
  console.log("Found this!");
  console.log(user);
}).catch((error)=>{
  console.log('we had an error');
  console.log(error);
});
*/
userModel.findById("09c5584ca3cea9e8a0342ac7").then((user)=>{

  if (!user){
    console.log("Empty and void");
    console.log(user);
    // Used to break the function only.
    return null;
  }
  console.log("Found this!");
  console.log(user);
}).catch((error)=>{
  console.log('we had an error');
  // console.log(error);
});
/*

Todo.find({
  // Nota Bene: here you can pass on an ID as a string.
  _id: id,
}).then((todos)=> {
  console.log("Called Find");
  console.log('Todos..',todos);
}, (error) => {
  console.log("why did you break the database?");
  console.log(error);
});

Todo.findOne({
  completed: true
}).then((todo)=>{
  console.log("Called Find One");
  console.log("Got this.. ",todo);
});
*/
