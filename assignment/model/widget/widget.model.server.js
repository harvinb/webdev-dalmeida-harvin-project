var mongoose = require('mongoose');
var WidgetSchema = require("./widget.schema.server");
var pagemodel = require("../page/page.model.server");
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;
module.exports = WidgetModel;

function createWidget(pageId, widget) {
  return WidgetModel.create(widget)
    .then(function (newWidget) {
      pagemodel.findPageById(pageId)
        .then(function (page) {
          // console.log(newWidget);
          page.widgets.push(newWidget._id);
          // return page.save();
        });
      return newWidget;
    });
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId})
    .populate('_page', 'name')
    .exec();
}

function findWidgetById(widgetId) {
  return WidgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return WidgetModel.update({_id: widgetId},widget);
}

function deleteWidget(widgetId) {
  return WidgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
  return;
}
