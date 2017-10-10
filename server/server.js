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
  var species = _.pick(req.body, ['email','password']);
  var toBeSaved = new User(species);

  toBeSaved.save().then((toBeSaved)=>{
    return toBeSaved.generateAuthToken();
    // res.status(200).send({reply: 'saved',data:document});
  }).then((token) => {
    // x-auth creates a customer header.
    res.header('x-auth', token).send(toBeSaved);
  }).catch((e)=>{
    res.status(400).send({reply:"internal Server Error",data:e});
  })

});
// Authenticate the Middle Ware!
let authenticate = (req, res, next) => {
  // Get the token from the Authentication request
  var token = req.header('x-auth');

  // Invoke FindByToken
  User.findByToken(token).then((user)=>{
    if (!user){
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();

  }).catch((e)=>{
    res.status(401).send();
    })
}
// An Authenticated Route
app.get('/user/me', authenticate, (req, res) => {
  res.send(req.user);
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
