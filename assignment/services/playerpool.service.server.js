module.exports = function (app) {

  var poolModel = require("../model/playerpool/playerpool.model.server");

  app.post("/api/user/:uid/league/:lId/pool", createPool);
  app.get("/api/league/:lId/pool",findPoolForLeague);
  app.get("/api/pool/:poolId", findPoolById);
  app.put("/api/pool/:poolId", updatePool);
  app.delete("/api/pool/:poolId", deletePool);

  function createPool(req,res) {
    var pool=req.body;
    pool.leagueId = req.params["lId"];
    pool.owner_id = req.params["uid"];
    poolModel.createPoolForUser(pool).
    then(function (newpool) {
      res.json(newpool);
    });
  }

  function findPoolForLeague(req,res) {
    var lId = req.params["lId"];
    poolModel
      .findAllPoolsForLeague(lId)
      .then(function (pools) {
        res.json(pools);
      });
  }

  function findPoolById(req,res) {
    var pId = req.params["poolId"];
    poolModel
      .findPoolById(pId)
      .then(function (pool) {
        res.json(pool);
      });
  }

  function updatePool(req,res){
    var pool=req.body;
    var pId = req.params["poolId"];
    poolModel
      .updatePool(pId,pool)
      .then(function (status) {
        res.json(status);
      });
  }

  function deletePool(req,res){
    var pId = req.params["poolId"];
    poolModel
      .deletePool(pId)
      .then(function (status) {
        res.json(status);
      });
  }
};
