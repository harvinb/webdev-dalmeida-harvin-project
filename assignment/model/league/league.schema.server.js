var mongoose = require('mongoose');

var leagueSchema = mongoose.Schema ({
  name: String,
  owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  users_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
}, {collection: 'league'});

module.exports = leagueSchema;
