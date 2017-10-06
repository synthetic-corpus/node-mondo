// SHA256 is a property from crypto js
// It turns things tino hashes.

const {SHA256} = require ('crypto-js');

let message = "I want Pizza";
let hash = SHA256(message).toString();

console.log(message);
console.log(hash);

// Data to perhaps be sent back to the user.
var data = {
  id: 4
};

// "a salt" is added to the data.
// A user cannot make their own hash, and return it to the machine
// without the salt.
var token =  {
  data,
  hash: SHA256(JSON.stringify(data) + "A salt").toString()
};

token.data = {
  id:5,
  status: "Give me admin credentials!"
}
// This takes the data from the token, return by the user?
var resultHash = SHA256(JSON.stringify(token.data)+ "A salt").toString();

if (resultHash === token.hash){
  console.log("Data was not changed");
}else{
  console.log("Data is definitely trustworthy. I swear. I promise. C'mon!");
}
