var connectionString = 'mongodb://localhost:27017/cs5610'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds135364.mlab.com:35364/heroku_9rmt84hj'; // use yours
}



var mongoose = require("mongoose");
var db = mongoose.connect(connectionString, { useMongoClient: true});
module.exports = db;
