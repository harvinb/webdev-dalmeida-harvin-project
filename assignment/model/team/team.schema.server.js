var mongoose = require('mongoose');

var teamSchema = mongoose.Schema ({
  name: String,
  leagueId: {type: mongoose.Schema.Types.ObjectId, ref: 'LeagueModel'},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  ppList: [{type: mongoose.Schema.Types.ObjectId, ref: 'PlayerPoolModel'}],
}, {collection: 'team'});

module.exports = teamSchema;
