var mongoose = require('mongoose');
var TeamSchema = require("./team.schema.server");

var TeamModel = mongoose.model("TeamModel", TeamSchema);

TeamModel.createTeamForUser = createTeamForUser;
TeamModel.findAllTeamsForLeague = findAllTeamsForLeague;
TeamModel.getAllTeams = getAllTeams;
TeamModel.findTeamById = findTeamById;
TeamModel.updateTeam = updateTeam;
TeamModel.deleteTeam = deleteTeam;
module.exports = TeamModel;

function createTeamForUser(team) {
  return TeamModel.create(team);
}

function findAllTeamsForLeague(leagueId) {
  return TeamModel.find({leagueId: leagueId})
    .populate('userId', 'username')
    .exec();
}

function getAllTeams() {
  return TeamModel.find()
    .populate('userId', 'username')
    .exec();
}

function findTeamById(teamId) {
  return TeamModel.findById(teamId);
}

function updateTeam(teamId, team) {
  return TeamModel.update({_id: teamId},team);
}

function deleteTeam(teamId) {
  return TeamModel.remove({_id: teamId});
}
