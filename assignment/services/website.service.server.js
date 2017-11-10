module.exports = function (app) {

  var websiteModel = require("../model/website/website.model.server");

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website",findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);
/*
  websites = [
    { _id: "123", name: "Facebook",    _user: "456", description: "Lorem", dateCreated: "9/1/2017"},
    { _id: "234", name: "Tweeter",     _user: "456", description: "Lorem", dateCreated: "8/15/2017"},
    { _id: "456", name: "Gizmodo",     _user: "456", description: "Lorem", dateCreated: "6/10/2017" },
    { _id: "890", name: "Go",          _user: "123", description: "Lorem", dateCreated: "9/5/2017" },
    { _id: "567", name: "Tic Tac Toe", _user: "123", description: "Lorem", dateCreated: "10/1/2017" },
    { _id: "678", name: "Checkers",    _user: "123", description: "Lorem", dateCreated: "8/20/2017" },
    { _id: "789", name: "Chess",       _user: "234", description: "Lorem", dateCreated: "6/6/2017" }
  ];
*/
  function createWebsite(req,res) {
    const uId = req.params["userId"];
    let website=req.body;
    website._user = uId;

    websiteModel
      .createWebsiteForUser(uId,website)
      .then(function (website) {
        res.json(website);
      });
  }

  function findAllWebsitesForUser(req,res) {
    var uId = req.params["userId"];
    websiteModel
      .findAllWebsitesForUser(uId)
      .then(function (websites) {
        res.json(websites);
      });
  }

  function findWebsiteById(req,res) {
    var wId = req.params["websiteId"];
    websiteModel
      .findWebsiteById(wId)
      .then(function (website) {
        res.json(website);
      });
  }

  function updateWebsite(req,res){
    var website=req.body;
    var wId = req.params["websiteId"];
    websiteModel
      .updateWebsite(wId,website)
      .then(function (status) {
        res.json(status);
      });
    //res.json(users);
  }

  function deleteWebsite(req,res){
    var wId = req.params["websiteId"];
    websiteModel
      .deleteWebsite(wId)
      .then(function (status) {
        res.json(status);
      });
  }
};
