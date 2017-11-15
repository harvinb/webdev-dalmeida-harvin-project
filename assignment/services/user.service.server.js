module.exports = function (app) {

  app.post("/api/user", createUser);
  app.get("/api/user/:userId",findUserById);
  app.get("/api/user", findUsers);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  users = [
    {_id:'123', username: 'alice', password: 'alice',firstName: 'Alice',lastName:'Wonder'},
    {_id:'234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  function createUser(req,res) {
    var user=req.body;
    user._id = Math.random().toString();
    //user.username = req.body.username;
    //user.password = req.body.password;
    users.push(user);
    res.json(getUserbyId(user._id));
  }

  function findUserById(req,res) {
    var uId = req.params["userId"];
    var user = getUserbyId(uId);
    res.json(user);
  }

  function getUserbyId(uId) {
    return users.find(function (user) {
      return user._id === uId;
    });
  }

  function findUsers(req,res) {
    var username = req.query["username"];
    var password = req.query["password"];
    var user = null;

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
    res.json(users);
  }

  function updateUser(req,res){
    var user=req.body;
    if (user._id) {
      users[users.findIndex(x => x._id === user._id)]=user;
    }
    res.json(getUserbyId(user._id));
    //res.json(users);
  }

  function deleteUser(req,res){
    var uId = req.params["userId"];
    if (uId) {
      users.splice(users.findIndex(x => x._id === uId),1);
    }
    res.json(users);
  }
};
