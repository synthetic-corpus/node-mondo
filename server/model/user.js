const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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

// .pre runs a function on 'save'.
// It runs this function before .save() runs.
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }
})

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

UserSchema.statics.findByCredentials = function (email, password) {
  // Takes the email password.
  // Returns either user object or triggers a reject.
  // Called by server, which expects a promise of either a user object or reject

  var user = this;

  return User.findOne({email}).then((user) =>{
    if(!user){
      return Promise.reject();
    }
    // Because bcrypt returns a promise, its code is wrapped in a promise
    // bcrypt will return true/false
    // wrapped promise will return userobject or reject.
    return new Promise ((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res){
          resolve(user);
        }else{
          reject();
        }
      })
    });
  })
}
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

UserSchema.methods.removeToken = function (token){
  var user = this;
  return user.update({
    $pull:{
      tokens: {
        token: token
      }
    }
  });
};

module.exports = {
  User
}
