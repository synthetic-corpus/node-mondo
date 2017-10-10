const { User } = require('../server/model/user');

// Authenticate the Middle Ware!
let authenticate = (req, res, next) => {
  // Get the token from the Authentication request
  var token = req.header('x-auth');

  // Invoke FindByToken
  User.findByToken(token).then((user)=>{
    if (!user){
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();

  }).catch((e)=>{
    res.status(401).send();
    })
}

module.exports = {
  authenticate
}
