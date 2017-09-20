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

  db.collection('unreal').findOneAndUpdate({
    // Filter Object. Select by this
    _id: new ObjectID("59c158db2cd8e2187f9a2053")
  },{
    // Property object. What to update
    $set: {
      comments: "I have been changed Agin!!"
    },
    $inc: {
      souls: 1
    }
  },{
    // Options
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  })

  db.close();
});
