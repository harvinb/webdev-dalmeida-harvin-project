var mongoose = require('mongoose');
// var widgetschema = require("../widget/widget.schema.server");
var pageSchema = mongoose.Schema ({
  _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
  name: String,
  title: String,
  description: String,
  dateCreated: Date,
  widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}]
}, {collection: 'page'});

module.exports = pageSchema;
