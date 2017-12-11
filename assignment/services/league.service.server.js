module.exports = function (app) {

  var leagueModel = require("../model/league/league.model.server");

  app.post("/api/user/:userId/league", createLeague);
  app.get("/api/user/:userId/league",findAllLeaguesForUser);
  app.get("/api/league/:leagueId", findLeagueById);
  app.put("/api/league/:leagueId", updateLeague);
  app.delete("/api/league/:leagueId", deleteLeague);
  app.get("/api/league",getAllLeagues);

  /*
  leagues = [
    {_id:'123', name: 'test League 1', owner_id: '123', users_id: ['123','234','456'] },
    {_id:'555', name: 'test League 3', owner_id: '234', users_id: ['123','234','456','345'] },
    {_id:'333', name: 'test League 2', owner_id: '345', users_id: ['345','234','456'] }
  ];
  */

  function createLeague(req,res) {
    const uId = req.params["userId"];
    let league=req.body;
    league.owner_id = uId;
    league.users_id = [uId];
    leagueModel.createLeagueForUser(league).
      then(function (newleague) {
        res.json(newleague);
    });
  }

  function getAllLeagues(req,res) {
    leagueModel.getAllLeagues().then(function (LeagueList) {
      res.json(LeagueList);
    });
  }

  function findAllLeaguesForUser(req,res) {
    var uId = req.params["userId"];
    leagueModel
      .findAllLeaguesForUser(uId)
      .then(function (leagues) {
        res.json(leagues);
      });
  }

  function findLeagueById(req,res) {
    var lId = req.params["leagueId"];
    leagueModel
      .findLeagueById(lId)
      .then(function (league) {
        res.json(league);
      });
  }

  function updateLeague(req,res){
    var league=req.body;
    var lId = req.params["leagueId"];
    leagueModel
      .updateLeague(lId,league)
      .then(function (status) {
        res.json(status);
      });
    //res.json(users);
  }

  function deleteLeague(req,res){
    var lId = req.params["leagueId"];
    leagueModel
      .deleteLeague(lId)
      .then(function (status) {
        res.json(status);
      });
  }
};
