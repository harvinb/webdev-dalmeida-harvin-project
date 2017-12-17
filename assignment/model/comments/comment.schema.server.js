var mongoose = require('mongoose');

var commentSchema = mongoose.Schema ({
  teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'TeamModel'},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  cdata: String,
  date: {type: Date, default: Date.now},
}, {collection: 'comment'});

module.exports = commentSchema;
