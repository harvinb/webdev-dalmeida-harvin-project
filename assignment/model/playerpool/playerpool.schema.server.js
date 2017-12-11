var mongoose = require('mongoose');

var poolSchema = mongoose.Schema ({
  leagueId: {type: mongoose.Schema.Types.ObjectId, ref: 'LeagueModel'},
  owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  playerPool: [{
    ppname: String,
    ppid: String,
  }],
}, {collection: 'playerpool'});

module.exports = poolSchema;
