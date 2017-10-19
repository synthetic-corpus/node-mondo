const _ = require('lodash');
const validator = require('validator');

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');
const { ObjectID } = require('mongodb');
const { authenticate } = require('../middleware/authenticate');
const bcrypt = require('bcryptjs');

var app = express();

// Get the Heroku port or 3000 if not available.
const port = process.env.PORT || 3000;

// Not sure what this "middleware" does
app.use(bodyParser.json());

// These be the get routes
app.get('/todos', authenticate, (req, res) =>{
  Todo.find({
    _owner: req.user._id // user._id from the Middleware
  }).then((todos)=>{
    res.status(200).send({todos});
  }, (e) =>{
    res.status(400).send(e);
  })
});

app.get('/todo/:id', authenticate, (req, res) =>{
  var reqId = req.user._id;
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    return res.status(404).send("Bad id");
  }
  // If not return continue on.
  Todo.findOne({
    _id: id,
    _owner: reqId
  }).then((todo)=>{
    if (!todo){
      return res.status(404).send("Not found with that ID");
    }else{
      return res.status(200).send({todo});
    }
  })

});


// These be the routes
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _owner: req.user._id
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

// Login!

app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.status(200).header('x-auth', token).send(user);
    })
    // res.status(200).send("Good work!")
  }).catch((e) => {
    res.status(400).send("400 Error");
  });

});

// An Authenticated Route
app.get('/user/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
  // Remove Token to be written
  // console.log(req.user);
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

app.patch('/todo/:id', authenticate, (req,res) => {
  let reqId = req.user._id;
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
  // Newer Version
  Todo.findOneAndUpdate(
    {
      _id: id,
      _owner:reqId
    },
    {$set:body},
    {new:true}
  ).then((todo) => {
    if (!todo){
      res.status(404).send("Could not find that todo")
    }else{
      res.status(200).send({todo});
    }
  }).catch((e)=>{
    res.status(401).send();
  })
  /*
  Todo.findOne({
    _id: id,
    _owner: reqID
  }).then((todo) =>{
    if (todo){
      Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) =>{
        res.status(200).send({todo});
      })
    }else{
      res.status(401).send();
    }
  }).catch((e) => {
    res.status(400).send();;

  })
  */
});
// This be the listen
app.listen(port, ()=> {
  console.log(`I listen on port ${port}!`);
})

module.exports = {app};
