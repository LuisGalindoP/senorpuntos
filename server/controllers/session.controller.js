const Session = require("../models/session.model");

module.exports = {
  //FIND ALL SESSIONS
  findAllSessions: (req, res) => {
    Session.find()
      .then((allSessions) => {
        console.log(allSessions);
        res.json(allSessions);
      })
      .catch((err) => {
        console.log("Error in findAllSessions");
        res.json({ message: "Something wrong in findAllSessions", error: err });
      });
  },

  //FIND A SESSION
  findSession: (req, res) => {
    Session.findOne({ _id: req.params.id })
      .then((oneSession) => {
        console.log(oneSession);
        res.json(oneSession);
      })
      .catch((err) => {
        console.log("Error in findSession controller");
        res.json({ message: "Error in findSession", error: err });
      });
  },

  //ADD A SESSION
  addNewSession: (req, res) => {
    Session.create(req.body)
      .then((newSession) => {
        console.log(newSession);
        res.json(newSession);
      })
      .catch((err) => {
        console.log("Error in addNewSession controller");
        res.status(400).json(err);
      });
  },

  //DELETE ONE SESSION
  removeSession: (req, res) => {
    Session.deleteOne({ _id: req.params.id })
      .then((removedSession) => {
        console.log(removedSession);
        res.json(removedSession);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          message: "Error deleting in removeSession controller",
          error: err,
        });
      });
  },
  //UPDATE PET INFO
  updateSession: (req, res) => {
    Session.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedSession) => {
        console.log(updatedSession);
        res.json(updatedSession);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};
