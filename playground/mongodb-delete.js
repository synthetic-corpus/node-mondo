// const MongoClient = require('mongodb').MongoClient;
/*

Syntax below uses Object Deconstruction.
Is equivalent to:

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

*/
const {MongoClient, ObjectID} = require('mongodb');

// For Object Destructuring - takes an object and makes it into variables?

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
/*
  // deleteMany
  db.collection('unreal').deleteMany({name:'Marly'}).then((result) => {
    // Return a weird big object.
    console.log(result);
  }, (err) =>{
    // Returns this weird big object.
    console.log("failed because... ",err);
  });
  // deleteOne

  // findOneAndDelete
*/
  db.collection('unreal').findOneAndDelete({website:"www.nothing.com"}).then((result) => {
    // Returns a copy of what was just deleted.
    console.log(JSON.stringify(result));
  })

  db.close();
});
