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

var token =  {
  data,
  hash: SHA256(JSON.stringify(data) + "A salt").toString()
}
