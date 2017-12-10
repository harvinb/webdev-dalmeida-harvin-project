var mongoose = require('mongoose');
var PoolSchema = require("./playerpool.schema.server");

var PoolModel = mongoose.model("PoolModel", PoolSchema);

PoolModel.createPoolForUser = createPoolForLeague;
PoolModel.findAllPoolsForLeague = findAllPoolsForLeague;
PoolModel.getAllPools = getAllPools;
PoolModel.findPoolById = findPoolById;
PoolModel.updatePool = updatePool;
PoolModel.deletePool = deletePool;
module.exports = PoolModel;

function createPoolForLeague(pool) {
  return PoolModel.create(pool);
}

function findAllPoolsForLeague(leagueId) {
  return PoolModel.find({leagueId: leagueId});
}

function getAllPools() {
  return PoolModel.find();
}

function findPoolById(poolId) {
  return PoolModel.findById(poolId);
}

function updatePool(poolId, pool) {
  return PoolModel.update({_id: poolId},pool);
}

function deletePool(poolId) {
  return PoolModel.remove({_id: poolId});
}
