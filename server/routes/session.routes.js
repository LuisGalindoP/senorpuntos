const SessionController = require("../controllers/session.controller");

module.exports = (app) => {
  app.get("/sessions", SessionController.findAllSessions);
  app.post("/session/new", SessionController.addNewSession);
  app.get("/session/:id", SessionController.findSession);
  app.put("/session/:id/edit", SessionController.updateSession);
  app.post("/session/:id", SessionController.removeSession);
};
