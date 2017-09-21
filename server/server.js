const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const { todo } = require('./model/todo');
const { userModel } = require('./model/user')

var app = express();

// Not sure what this "middleware" does
app.use(bodyParser.json());

// These be the routes
app.post('/todos', (req, res) => {
  console.log(req.body);
});

// This be the listen
app.listen(3000, ()=> {
  console.log('I listen on port 3000!');
})
