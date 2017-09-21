const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { userModel } = require('./model/user')

var app = express();

// Not sure what this "middleware" does
app.use(bodyParser.json());

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

// This be the listen
app.listen(3000, ()=> {
  console.log('I listen on port 3000!');
})