const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    sessionName: {
      type: String,
    },
    players: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
