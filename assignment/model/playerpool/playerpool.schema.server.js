var mongoose = require('mongoose');

var poolSchema = mongoose.Schema ({
  leagueId: {type: mongoose.Schema.Types.ObjectId, ref: 'LeagueModel'},
  playerPool: [String]
}, {collection: 'playerpool'});

module.exports = poolSchema;
