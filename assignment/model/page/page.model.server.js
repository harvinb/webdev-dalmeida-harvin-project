var mongoose = require('mongoose');
var pageSchema = require("./page.schema.server");

var PageModel = mongoose.model("PageModel", pageSchema);

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;
module.exports = PageModel;

function createPage(websiteId, page) {
  return PageModel.create(page);
}

function findAllPagesForWebsite(websiteId) {
  return PageModel.find({_website: websiteId})
    .populate('_website', 'name')
    .exec();
}

function findPageById(pageId) {
  return PageModel.findById(pageId);
}

function updatePage(pageId, page) {
  return PageModel.update({_id: pageId},page);
}

function deletePage(pageId) {
  return PageModel.remove({_id: pageId});
}
