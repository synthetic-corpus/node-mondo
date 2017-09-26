const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { userModel } = require('./../server/model/user');

function getUserByID(id){
  userModel.findById(id).then((user)=>{

    /// Console.log return expected value. Does not appear to return though.
    return user;
    /*
    if(!user){
      return null;
    }else{
      return user;
      console.log(user);
    }
  }).catch((error)=>{
    return error;*/
  })
};

function getTodoById(id){

};

function getAllUsers(){

};

function getAllTodos(){
  // return "THis Worked!"
}

module.exports = {
  getUserByID,
  getTodoById,
  getAllUsers,
  getAllTodos
}
