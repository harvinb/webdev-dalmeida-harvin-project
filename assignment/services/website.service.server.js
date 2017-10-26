module.exports = function (app) {

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website",findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  websites = [
    { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem", dateCreated: "9/1/2017"},
    { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem", dateCreated: "8/15/2017"},
    { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem", dateCreated: "6/10/2017" },
    { _id: "890", name: "Go",          developerId: "123", description: "Lorem", dateCreated: "9/5/2017" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem", dateCreated: "10/1/2017" },
    { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem", dateCreated: "8/20/2017" },
    { _id: "789", name: "Chess",       developerId: "234", description: "Lorem", dateCreated: "6/6/2017" }
  ];

  function createWebsite(req,res) {
    const uId = req.params["userId"];
    let website=req.body;
    website._id = Math.random().toString();
    website.developerId = uId;
    websites.push(website);
    res.json(websites.filter(function (website) {
      return website.developerId === uId;
    }));
  }

  function findAllWebsitesForUser(req,res) {
    var uId = req.params["userId"];
    var websiteList = websites.filter(function (website) {
      return website.developerId === uId;
    });
    res.json(websiteList);
  }

  function findWebsiteById(req,res) {
    var wId = req.params["websiteId"];
    var website=websites.find(function (website) {
      return website._id === wId;
    });
    res.json(website);
  }

  function updateWebsite(req,res){
    var website=req.body;
    var wId = req.params["websiteId"];
    if (wId) {
      websites[websites.findIndex(x => x._id === wId)]=website;
    }
    res.json(websites);
    //res.json(users);
  }

  function deleteWebsite(req,res){
    var wId = req.params["websiteId"];
    if (wId) {
      websites.splice(websites.findIndex(x => x._id === wId),1);
    }
    res.json(websites);
  }
};
