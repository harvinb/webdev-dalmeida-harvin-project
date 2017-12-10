var mongoose = require('mongoose');
var LeagueSchema = require("./league.schema.server");

var LeagueModel = mongoose.model("LeagueModel", LeagueSchema);

LeagueModel.createLeagueForUser = createLeagueForUser;
LeagueModel.findAllLeaguesForUser = findAllLeaguesForUser;
LeagueModel.getAllLeagues = getAllLeagues;
LeagueModel.findLeagueById = findLeagueById;
LeagueModel.updateLeague = updateLeague;
LeagueModel.deleteLeague = deleteLeague;
module.exports = LeagueModel;

function createLeagueForUser(league) {
  return LeagueModel.create(league);
}

function findAllLeaguesForUser(userId) {
  return LeagueModel.find({owner_id: userId})
    .populate('owner_id', 'username')
    .exec();
}

function getAllLeagues() {
  return LeagueModel.find()
    .populate('owner_id', 'username')
    .exec();
}

function findLeagueById(leagueId) {
  return LeagueModel.findById(leagueId);
}

function updateLeague(leagueId, league) {
  return LeagueModel.update({_id: leagueId},league);
}

function deleteLeague(leagueId) {
  return LeagueModel.remove({_id: leagueId});
}
