module.exports = function (app) {

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  pages = [
    { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem", dateCreated: "9/1/2017" },
    { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem", dateCreated: "8/15/2017" },
    { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem", dateCreated: "6/10/2017" },
    { _id: "666", name: "Post 4", websiteId: "890", description: "Lorem", dateCreated: "9/5/2017" },
    { _id: "555", name: "Post 5", websiteId: "567", description: "Lorem", dateCreated: "8/20/2017" },
    { _id: "444", name: "Post 6", websiteId: "890", description: "Lorem", dateCreated: "6/6/2017" }
  ];

  function createPage(req,res) {
    var page=req.body;
    page._id = Math.random().toString();
    page.websiteId = req.params["websiteId"];
    pages.push(page);
    res.json(pages);
  }

  function findAllPagesForWebsite(req,res) {
    var wId = req.params["websiteId"];
    var pageList = pages.filter(function (pageList) {
      return pageList.websiteId === wId;
    });
    res.json(pageList);
  }

  function findPageById(req,res) {
    var pId = req.params["pageId"];
    var page=pages.find(function (page) {
      return page._id === pId;
    });
    res.json(page);
  }

  function updatePage(req,res){
    var page=req.body;
    var pId = req.params["pageId"];
    if (pId) {
      pages[pages.findIndex(x => x._id === pId)]=page;
    }
    res.json(pages);
    //res.json(users);
  }

  function deletePage(req,res){
    var pId = req.params["pageId"];
    if (pId) {
      pages.splice(pages.findIndex(x => x._id === pId),1);
    }
    res.json(pages);
  }
};
