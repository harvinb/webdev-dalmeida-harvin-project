module.exports = function(app) {
  // var db = require("./model/models.server");
  require("./services/user.service.server.js")(app);
};
