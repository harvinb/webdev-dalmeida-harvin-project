module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require("bcrypt-nodejs");

  passport.serializeUser(serializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  passport.deserializeUser(deserializeUser);

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function(user) {
          if(user.username === username && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  passport.use(new LocalStrategy(localStrategy));

  app.post("/api/user", createUser);
  app.get("/api/user/:userId",findUserById);
  app.get("/api/user", findUsers);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.post  ('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post ('/api/register', register);

  /*
  users = [
    {_id:'123', username: 'alice', password: 'alice',firstName: 'Alice',lastName:'Wonder'},
    {_id:'234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];
*/

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function createUser(req,res) {
    var user=req.body;
    // user._id = Math.random().toString();
    //user.username = req.body.username;
    //user.password = req.body.password;
    // users.push(user);
    userModel
      .createUser(user)
      .then(function (user) {
        res.json(user);
      });
  }

  function findUserById(req,res) {
    var uId = req.params["userId"];
    userModel
      .findUserById(uId)
      .then(function (user) {
        res.json(user);
      });
  }

  function getUserbyId(uId) {
    return users.find(function (user) {
      return user._id === uId;
    });
  }

  function findUsers(req,res) {
    var username = req.query["username"];
    var password = req.query["password"];

    if(username && password) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function (result) {
        // console.log(result);
        res.json(result);
      });
      return;
    } else if(username) {
      userModel
        .findUserByUsername(username)
        .then(function (user) {
          res.json(user);
        });
      return;
    } else {
      res.json({});
    }
  }

  function updateUser(req,res){
    var user=req.body;
    userModel
      .updateUser(user._id,user)
      .then(function (status) {
        res.json(status);
      });
    //res.json(users);
  }

  function deleteUser(req,res){
    var uId = req.params["userId"];
    userModel
      .updateUser(user._id,user)
      .then(function (status) {
        res.json(status);
      });
  }
};
