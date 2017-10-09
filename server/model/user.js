const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// Mongoose.Schema can have instance methods.
// Mongoos.model cannot.

var UserSchema = new mongoose.Schema({
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
})

// User Schema returns *too much* information.
// The Method below overides the default .toJson() method.
// In the Context of UserSchema only.

UserSchema.methods.toJSON = function () {
  let user = this;
  // Takes Mongoose Data, and turns it a JSON object
  let userObject = user.toObject();
  // instead of returning all data, returns only what's needed.
  // Excludes password, tokens, etc.
  return _.pick(userObject, ['_id','email']);
}

// Defines a  method for UserSchema
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = "auth";
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'The Secret Valu3').toString();

  // Add the Access setting and Token to the empty tokens array
  user.tokens.push({access,token});
  return user.save().then(()=> {
    // Token is returned to the object that calls
    // When this method is called.
    // Also saves the user instace after an update.
    return token;
  })
};

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    // In case there is a problem with the Token.
    decoded = jwt.verify(token, "The Secret Valu3")
  }catch(e){
    // Returns a rejection for server.js to deal with
    // .then won't run, but .catch will.
    return Promise.reject();
  }
  // Returns a promise, to be .then'ed in server.js
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access':'auth'
  });
};
const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
