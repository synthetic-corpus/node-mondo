const express = require('express');
const query = require('./queries');

let testID = "59c5584ca3cea9e8a0342ac7";

var thing = query.getUserByID(testID);
console.log(thing);
