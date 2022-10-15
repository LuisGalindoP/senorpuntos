const express = require("express");
const cors = require("cors");
const app = express();

//MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

require("./config/mongoose.config");
// require("./routes/game.routes");

app.listen(8000, () => console.log("Connected to port 8000 senor"));
