module.exports = function (app) {

  var commentModel = require("../model/comments/comment.model.server");

  app.post("/api/user/:userId/team/:teamId/comment", createComment);
  app.get("/api/comment/team/:teamId",findAllCommentsForTeam);
  app.get("/api/comment/:commentId", findCommentById);
  app.put("/api/comment/:commentId", updateComment);
  app.delete("/api/comment/:commentId", deleteComment);

  function createComment(req,res) {
    var comment=req.body;
    comment.teamId = req.params["teamId"];
    comment.userId = req.params["userId"];
    commentModel.createCommentForTeam(comment).
      then(function (newcomment) {
        res.json(newcomment);
      });
  }

  function findAllCommentsForTeam(req,res) {
    var tId = req.params["teamId"];
    commentModel
      .findAllCommentsForTeam(tId)
      .then(function (comments) {
        res.json(comments);
      });
  }

  function findCommentById(req,res) {
    var cId = req.params["commentId"];
    commentModel
      .findCommentById(cId)
      .then(function (comment) {
        res.json(comment);
      });
  }

  function updateComment(req,res){
    var comment=req.body;
    var cId = req.params["commentId"];
    commentModel
      .updateComment(cId,comment)
      .then(function (status) {
        res.json(status);
      });
  }

  function deleteComment(req,res){
    var cId = req.params["commentId"];
    commentModel
      .deleteComment(cId)
      .then(function (status) {
        res.json(status);
      });
  }
};
