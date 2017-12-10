module.exports = function (app) {

  app.post("/api/league/:lId/pool", createPool);
  app.get("/api/league/:lId/pool",findPoolForLeague);
  app.get("/api/pool/:poolId", findPoolById);
  app.put("/api/pool/:poolId", updatePool);
  app.delete("/api/pool/:poolId", deletePool);

  pools = [
    { _id: "1451", leagueId: "123",
      playerPool: ["105248644", "82262664", "111620041", "113457795", "87276347",
                   "149486894", "86727555", "101356886"]},
    { _id: "6543", leagueId: "333",
      playerPool: ["101356886", "149486894", "86727555", "113457795", "87276347",
                   "70388657", "94155156", "26771994", "82262664"]},
  ];

  function createPool(req,res) {
    var pool=req.body;
    pool._id = Math.random().toString();
    pool.leagueId = req.params["lId"];
    pools.push(pool);
    res.json(pools);
  }

  function findPoolForLeague(req,res) {
    var lId = req.params["lId"];
    var poolList = pools.filter(function (poolList) {
      return poolList.leagueId === lId;
    });
    res.json(poolList);
  }

  function findPoolById(req,res) {
    var tId = req.params["poolId"];
    var pool=pools.find(function (pool) {
      return pool._id === tId;
    });
    res.json(pool);
  }

  function updatePool(req,res){
    var pool=req.body;
    var tId = req.params["poolId"];
    if (tId) {
      pools[pools.findIndex(x => x._id === tId)]=pool;
    }
    res.json(pools);
    //res.json(users);
  }

  function deletePool(req,res){
    var tId = req.params["poolId"];
    if (tId) {
      pools.splice(pools.findIndex(x => x._id === tId),1);
    }
    res.json(pools);
  }
};
