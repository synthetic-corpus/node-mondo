const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
