module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  app.post("/api/user", createUser);
  app.get("/api/user/:userId",findUserById);
  app.get("/api/user", findUsers);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

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

  function findUsers(req,res) {
    var username = req.query["username"];
    var password = req.query["password"];

/*
    if(username) {
      user = users.find(function (user) {
        return user.username === username;
      });

      if (user) {
        if(password && user.password !== password) {
          res.json({});
        }
        res.json(user);
      } else {
        res.json({});
      }
      return;
    }
   */
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
