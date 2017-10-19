var env = process.env.NODE_ENV || 'development';

// The config file always runs regardless of testing, development, or deployment.
// It will load a json object with many secret variables.
// This file will be *ignored* by git. This allows it stay secret.
// Hence, passwords, secret keys etc, can be preserved without being public.

if (env === 'development' || env === 'test'){
  var settings = require('./config.json');
  var envConfig = settings[env];
  // Loops over the keys.
  // Does something with each one.
  Object.keys(envConfig).forEach((key)=>{
    process.env[key] = envConfig[key];
  })
}

/* Code below will eventually be deleted.
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
*/
