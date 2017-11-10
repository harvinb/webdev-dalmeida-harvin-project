module.exports = function (app) {

  var PageModel = require("../model/page/page.model.server");

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);
/*
  pages = [
    { _id: "321", name: "Post 1", _website: "456", description: "Lorem", dateCreated: "9/1/2017" },
    { _id: "432", name: "Post 2", _website: "456", description: "Lorem", dateCreated: "8/15/2017" },
    { _id: "543", name: "Post 3", _website: "456", description: "Lorem", dateCreated: "6/10/2017" },
    { _id: "666", name: "Post 4", _website: "890", description: "Lorem", dateCreated: "9/5/2017" },
    { _id: "555", name: "Post 5", _website: "567", description: "Lorem", dateCreated: "8/20/2017" },
    { _id: "444", name: "Post 6", _website: "890", description: "Lorem", dateCreated: "6/6/2017" }
  ];
*/
  function createPage(req,res) {
    let page=req.body;
    // page._id = Math.random().toString();
    let wid = req.params["websiteId"];
    page._website = wid;
    PageModel.createPage(wid,page)
      .then(function (page) {
        res.json(page);
      });
  }

  function findAllPagesForWebsite(req,res) {
    var wId = req.params["websiteId"];
    PageModel
      .findAllPagesForWebsite(wId)
      .then(function (pages) {
        res.json(pages);
      });
  }

  function findPageById(req,res) {
    var pId = req.params["pageId"];
    PageModel
      .findPageById(pId)
      .then(function (page) {
        res.json(page);
      });
  }

  function updatePage(req,res){
    var page=req.body;
    var pId = req.params["pageId"];
    PageModel
      .updatePage(pId,page)
      .then(function (status) {
        res.json(status);
      });
    //res.json(users);
  }

  function deletePage(req,res){
    var pId = req.params["pageId"];
    PageModel
      .deletePage(pId)
      .then(function (status) {
        res.json(status);
      });
  }
};
