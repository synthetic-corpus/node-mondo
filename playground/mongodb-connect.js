// const MongoClient = require('mongodb').MongoClient;
/*

Syntax below uses Object Deconstruction.
Is equivalent to:

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

*/
const {MongoClient, ObjectID} = require('mongodb');

// It is possible to call ObjectID() to make new Mondo IDs
var obj = new ObjectID();
console.log(obj);
console.log(obj);

// For Object Destructuring - takes an object and makes it into variables?

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  /*
  db.collection('unreal').insertOne({
    name: 'Marly',
    website:'www.weird.com',
    comments:"This is only a test."
  }, (err, result) =>{
    if (err){
      console.log("everything went boom");
    }else{
      // console.log(JSON.stringify(result.ops));// Gets the object
      // console.log(JSON.stringify(result.ops[0]._id)); // Gets the ID only.
      // Mongo's Automatically generated IDs alo contain a time stamp.
      // This timestamp is accessed thusly.
      console.log(result.ops[0]._id.getTimestamp());
    }
  });
  */
  /*
  db.collection('Users').insertOne({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(result.ops);
  });
  */
  db.close();
});
