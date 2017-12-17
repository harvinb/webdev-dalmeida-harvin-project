module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var bcrypt = require("bcrypt-nodejs");
  var GoogleStrategy = require('passport-google-oauth20').Strategy;

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
  app.get ('/google/login', passport.authenticate('google', { scope : 'email' }));

  app.get('/oauth2callback', function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      //console.log(req);
      //console.log(res);
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/profile');
      });
    })(req, res, next);
  });

  var googleConfig;

  if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    googleConfig = {
      clientID     : process.env.FACEBOOK_CLIENT_ID,
      clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
  } else {
    googleConfig = {
      clientID     : "357395234526-ja6krp5fo3brsj04ieqjjoc81d825ea0.apps.googleusercontent.com",
      clientSecret : "6wjUcDOcH2nPVhYXBZkjafVu",
      callbackURL  : "https://localhost:3100/oauth2callback"
    };
  }

  passport.use(new GoogleStrategy(googleConfig, googleStrategy));

  function googleStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByGoogleId(profile.id)
      .then(
        function(user) {
          if(user) {
            return done(null, user);
          } else {
            //console.log(profile);
            var names = profile.displayName.split(" ");
            var newGoogleUser = {
              username: names[0],
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value:"",
              google: {
                id:    profile.id,
                token: token
              }
            };
            return userModel.createUser(newGoogleUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      )
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }

  app.get('/api/admin/user', findAllUsers);
  function findAllUsers(req, res) {
    userModel
      .findAllUsers()
      .then(function (users) {
        res.json(users);
      });
  }

  app.get('/api/admin/isAdmin', isAdmin);
  function isAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') !== -1) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }



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
    user.password = bcrypt.hashSync(user.password);
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
      .deleteUser(uId)
      .then(function (status) {
        res.json(status);
      });
  }
};
