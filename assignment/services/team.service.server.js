module.exports = function (app) {

  app.post("/api/user/:userId/league/:leagueId/team", createTeam);
  app.get("/api/league/:leagueId/team",findAllTeamsForLeague);
  app.get("/api/team/:teamId", findTeamById);
  app.put("/api/team/:teamId", updateTeam);
  app.delete("/api/team/:teamId", deleteTeam);

  teams = [
    { _id: "321", name: "Team 1", leagueId: "123", userId: "123" },
    { _id: "432", name: "Team 2", leagueId: "333", userId: "345" },
    { _id: "543", name: "Team 3", leagueId: "123", userId: "456" },
    { _id: "666", name: "Team 4", leagueId: "333", userId: "456" }
  ];

  function createTeam(req,res) {
    var team=req.body;
    team._id = Math.random().toString();
    team.leagueId = req.params["leagueId"];
    team.userId = req.params["userId"];
    teams.push(team);
    res.json(teams);
  }

  function findAllTeamsForLeague(req,res) {
    var lId = req.params["leagueId"];
    var teamList = teams.filter(function (teamList) {
      return teamList.leagueId === lId;
    });
    res.json(teamList);
  }

  function findTeamById(req,res) {
    var tId = req.params["teamId"];
    var team=teams.find(function (team) {
      return team._id === tId;
    });
    res.json(team);
  }

  function updateTeam(req,res){
    var team=req.body;
    var tId = req.params["teamId"];
    if (tId) {
      teams[teams.findIndex(x => x._id === tId)]=team;
    }
    res.json(teams);
    //res.json(users);
  }

  function deleteTeam(req,res){
    var tId = req.params["teamId"];
    if (tId) {
      teams.splice(teams.findIndex(x => x._id === tId),1);
    }
    res.json(teams);
  }
};
