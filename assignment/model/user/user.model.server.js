var mongoose = require('mongoose');
var UserSchema = require("./user.schema.server");

var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUsername = findUserByUsername;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.findUserByGoogleId = findUserByGoogleId;

module.exports = UserModel;

function findUserByCredentials(username, password) {
  return UserModel.findOne({username: username, password: password});
}

function createUser(user) {
  user.roles = ['USER'];
  console.log(user.username);
  if (user.username.toString().trim() === 'ADMIN') {
    user.roles = ['ADMIN'];
  }
  return UserModel.create(user);
}

function findUserByGoogleId(googleId) {
  return UserModel.findOne({'google.id': googleId});
}

function findAllUsers() {
  return UserModel.find();
}

function findUserById(userId) {
  return UserModel.findById(userId);
}

function findUserByUsername(username) {
  return UserModel.findOne({username: username});
}

function updateUser(userId,user) {
  return UserModel.update({_id: userId},user);
}

function deleteUser(userId) {
  return UserModel.remove({_id: userId});
}
