module.exports = function(app) {
  // var db = require("./model/models.server");
  require("./services/user.service.server.js")(app);
  require("./services/league.service.server.js")(app);
  require("./services/team.service.server.js")(app);
  require("./services/playerpool.service.server")(app);
};
