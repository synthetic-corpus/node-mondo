const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { userModel } = require('./model/user');
const { ObjectID } = require('mongodb');

var app = express();

// Not sure what this "middleware" does
app.use(bodyParser.json());

// These be the get routes
app.get('/todos', (req, res) =>{
  Todo.find().then((todos)=>{
    res.status(200).send({todos});
  }, (e) =>{
    res.status(400).send(e);
  })
});

app.get("/todos/:id", (req, res) =>{
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send("Bad id");
  }
  // If not return continue on.
  Todo.findById(id).then((todo)=>{
    if (!todo){
      return res.status(400).send("Not found with that ID");
    }else{
      return res.status(200).send(todo);
    }
  })

});
//});

// These be the routes
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((document)=>{
    res.status(200).send(document);
  }, (error)=>{
    res.status(400).send(error);
  });
});

app.post('/user', (req, res) => {
  var todo = new userModel({
    userName: req.body.userName,
    email: req.body.email
  });

  todo.save().then((document)=>{
    res.status(200).send(document);
  }, (error)=>{
    res.status(400).send(error);
  });
});

// This be the listen
app.listen(3000, ()=> {
  console.log('I listen on port 3000!');
})

module.exports = {app};
