const express = require('express');
const query = require('./queries');

var thing = query.getAllTodos();
console.log(thing);
