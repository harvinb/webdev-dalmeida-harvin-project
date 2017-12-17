var mongoose = require('mongoose');
var CommentSchema = require("./comment.schema.server");

var CommentModel = mongoose.model("CommentModel", CommentSchema);

CommentModel.createCommentForTeam = createCommentForTeam;
CommentModel.findAllCommentsForTeam = findAllCommentsForTeam;
CommentModel.getAllComments = getAllComments;
CommentModel.findCommentById = findCommentById;
CommentModel.updateComment = updateComment;
CommentModel.deleteComment = deleteComment;
module.exports = CommentModel;

function createCommentForTeam(comment) {
  return CommentModel.create(comment);
}

function findAllCommentsForTeam(teamId) {
  return CommentModel.find({teamId: teamId})
    .populate('userId', 'username')
    .exec();
}

function getAllComments() {
  return CommentModel.find()
    .populate('userId', 'username')
    .exec();
}

function findCommentById(cId) {
  return CommentModel.findById(cId)
    .populate('userId', 'username')
    .exec();
}

function updateComment(cId, comment) {
  return CommentModel.update({_id: cId},comment);
}

function deleteComment(cId) {
  return CommentModel.remove({_id: cId});
}
