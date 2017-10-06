const _ = require('lodash');
const validator = require('validator');

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');
const { ObjectID } = require('mongodb');

var app = express();

// Get the Heroku port or 3000 if not available.
const port = process.env.PORT || 3000;

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
      return res.status(200).send({todo});
    }
  })

});


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
  let species = _.pick(req.body, ['email','password']);
  let toBeSaved = new User({
    email: species.email,
    password: species.email
  });

  toBeSaved.save().then((document)=>{
    res.status(200).send({reply: 'saved',data:document});
  })

});

app.patch('/todo/:id',(req,res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send("Bad id");
  };
  // Lodash Pick method takes two arguments
  // The body to be picked from.
  // The properties to pick.
  let body = _.pick(req.body, ['text', 'completed']);

  if (_.isBoolean(body.completed) && body.completed){
    body.completeAt = new Date().getTime();
  } else {
    // "Text" is set set by user.
    // Concievable that text could be an empty string.
    body.completed = false;
    body.completeAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) =>{
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})
// This be the listen
app.listen(port, ()=> {
  console.log(`I listen on port ${port}!`);
})

module.exports = {app};
