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

  db.collection('unreal').find({name: 'Marlqy'}).toArray().then((stuff) =>{
    console.log(stuff);
  }, (err) => {
    console.log('Everything blew up and nobody likes you', err);
  })
  db.close();
});
