// SHA256 is a property from crypto js
// It turns things tino hashes.

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id:10
};

// Sign takes the 'salt' as the second arguments
let token = jwt.sign(data, 'Ronald Reagen');
console.log(token);
