const mongoose = require('mongoose');
const validator = require('validator');
/*
  What a user Object should look like:
  {
  email: address@website.net,
  password: A hash of the password,
  tokens: [{
    access: auth,
    token: A hash of the Token
  }]
}
*/
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {
  User
}
