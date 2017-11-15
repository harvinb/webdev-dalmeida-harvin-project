module.exports = function (app) {

  app.post("/api/user/:userId/league", createLeague);
  app.get("/api/user/:userId/league",findAllLeaguesForUser);
  app.get("/api/league/:leagueId", findLeagueById);
  app.put("/api/league/:leagueId", updateLeague);
  app.delete("/api/league/:leagueId", deleteLeague);

  leagues = [
    {_id:'123', name: 'test League 1', owner_id: '123', users_id: ['123','234','456'] },
    {_id:'333', name: 'test League 2', owner_id: '345', users_id: ['345','234','456'] }
  ];

  function createLeague(req,res) {
    const uId = req.params["userId"];
    let league=req.body;
    league._id = Math.random().toString();
    league.owner_id = uId;
    leagues.push(league);
    res.json(leagues.filter(function (league) {
      return league.owner_id === uId;
    }));
  }

  function findAllLeaguesForUser(req,res) {
    var uId = req.params["userId"];
    var leagueList = leagues.filter(function (league) {
      return league.owner_id === uId;
    });
    res.json(leagueList);
  }

  function findLeagueById(req,res) {
    var lId = req.params["leagueId"];
    var league=leagues.find(function (league) {
      return league._id === lId;
    });
    res.json(league);
  }

  function updateLeague(req,res){
    var league=req.body;
    var lId = req.params["leagueId"];
    if (lId) {
      leagues[leagues.findIndex(x => x._id === lId)]=league;
    }
    res.json(leagues);
    //res.json(users);
  }

  function deleteLeague(req,res){
    var lId = req.params["leagueId"];
    if (lId) {
      leagues.splice(leagues.findIndex(x => x._id === lId),1);
    }
    res.json(leagues);
  }
};
