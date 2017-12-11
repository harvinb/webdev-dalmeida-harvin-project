var mongoose = require('mongoose');

var UserSchema = mongoose.Schema ({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  roles: [{type: String,
    default: 'USER',
    enum: ['ADMIN', 'USER']}],
  google: {
    id: String,
    token: String
  }
}, {collection: 'user'});

module.exports = UserSchema;
