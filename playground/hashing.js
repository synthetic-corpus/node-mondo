// SHA256 is a property from crypto js
// It turns things tino hashes.

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "Ronald?Reagen80";
var newHash ='$2a$10$UGjwrNhhq0UId1U/CPmAce9g1O/2/MAgIQ2pGnq2NXmn1WomMt88q';

// Generates a salt and outputs a hash.
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
    return newHash = hash;
  });
});
console.log(newHash);
bcrypt.compare(password, newHash, (err, res) => {
  // Res is a Boolean
  console.log(res);
})
/*
let data = {
  id:10
};

// Sign takes the 'salt' as the second arguments
let token = jwt.sign(data, 'Ronald Reagen');
console.log(token);
*/
