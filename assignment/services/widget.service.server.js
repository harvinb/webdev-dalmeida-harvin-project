module.exports = function (app) {

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  widgets = [
    { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
    { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
      url: "http://lorempixel.com/400/200/"},
    { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
    { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
      url: "https://youtu.be/AM2Ivdi9c4E" },
    { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
  ];

  function createWidget(req,res) {
    var widget=req.body;
    widget._id = Math.random().toString();
    widget.pageId = req.params["pageId"];
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req,res) {
    var pId = req.params["pageId"];
    var widgetList = widgets.filter(function (widgetList) {
      return widgetList.pageId === pId;
    });
    res.json(widgetList);
  }

  function findWidgetById(req,res) {
    var wgId = req.params["widgetId"];
    var widget=widgets.find(function (widget) {
      return widget._id === wgId;
    });
    res.json(widget);
  }

  function updateWidget(req,res){
    var widget=req.body;
    var wgId = req.params["widgetId"];
    if (wgId) {
      widgets[widgets.findIndex(x => x._id === wgId)]=widget;
    }
    res.json(widgets);
    //res.json(users);
  }

  function deleteWidget(req,res){
    var wgId = req.params["widgetId"];
    if (wgId) {
      widgets.splice(widgets.findIndex(x => x._id === wgId),1);
    }
    res.json(widgets);
  }
};
