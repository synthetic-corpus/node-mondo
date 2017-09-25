const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { userModel } = require('./../server/model/user');

function getUserByID(id){

};

function getTodoById(id){

};

function getAllUsers(){

};

function getAllTodos(){
  return "THis Worked!"
}

module.exports = {
  getUserByID,
  getTodoById,
  getAllUsers,
  getAllTodos
}
