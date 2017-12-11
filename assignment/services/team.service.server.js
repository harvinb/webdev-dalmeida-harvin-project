module.exports = function (app) {

  var teamModel = require("../model/team/team.model.server");

  app.post("/api/user/:userId/league/:leagueId/team", createTeam);
  app.get("/api/league/:leagueId/team",findAllTeamsForLeague);
  app.get("/api/team/:teamId", findTeamById);
  app.put("/api/team/:teamId", updateTeam);
  app.delete("/api/team/:teamId", deleteTeam);

  /*
  teams = [
    { _id: "321", name: "Team 1", leagueId: "123", userId: "123" ,
      ppList: ["105248644", "82262664", "111620041", "113457795", "87276347"]},
    { _id: "432", name: "Team 2", leagueId: "333", userId: "345" ,
      ppList: ["101356886", "149486894", "86727555", "113457795", "87276347"]},
    { _id: "543", name: "Team 3", leagueId: "123", userId: "456" ,
      ppList: ["82262664", "149486894", "86727555", "101356886", "105248644"]},
    { _id: "666", name: "Team 4", leagueId: "333", userId: "456" ,
      ppList: ["70388657", "94155156", "26771994", "101356886", "82262664"]}
  ];
  */

  function createTeam(req,res) {
    var team=req.body;
    team.leagueId = req.params["leagueId"];
    team.userId = req.params["userId"];
    teamModel.createTeamForUser(team).
    then(function (newteam) {
      res.json(newteam);
    });
  }

  function findAllTeamsForLeague(req,res) {
    var lId = req.params["leagueId"];
    teamModel
      .findAllTeamsForLeague(lId)
      .then(function (teams) {
        res.json(teams);
      });
  }

  function findTeamById(req,res) {
    var tId = req.params["teamId"];
    teamModel
      .findTeamById(tId)
      .then(function (team) {
        res.json(team);
      });
  }

  function updateTeam(req,res){
    var team=req.body;
    var tId = req.params["teamId"];
    teamModel
      .updateTeam(tId,team)
      .then(function (status) {
        res.json(status);
      });
  }

  function deleteTeam(req,res){
    var tId = req.params["teamId"];
    teamModel
      .deleteTeam(tId)
      .then(function (status) {
        res.json(status);
      });
  }
};
