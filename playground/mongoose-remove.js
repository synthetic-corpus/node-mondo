const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { userModel } = require('./../server/model/user');


// For routes
const express = require('express');
let app = express();

// Get the Heroku port or 3000 if not available.
const port = process.env.PORT || 3000;

// How to delete records.

// Todo.remove({})
// Must not be an empty object. Rather if it is? It removes everything.
/*
Todo.remove({}).then((result)=>{
  console.log(result);
});
*/
// Todo.findOneAndRemove({});

// Todo.findByIdAndRemove({});
app.delete('/todos/:id', (req,res) => {
  // get ID
  var id = req.params.id;
  // validate ID
  if (!ObjectID.isValid(id)){
    return res.status(404).send("Bad ID")
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if (todo){
      // Found something with this ID.
      // Return the Todo
      res.status(200).send(todo);
    } else {
      res.status(400).send({"error":"found nothing with that ID"});
    }
  })
})

app.listen(port, ()=> {
  console.log(`I listen on port ${port}!`);
})
