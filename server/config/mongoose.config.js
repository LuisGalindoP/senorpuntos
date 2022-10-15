const mongoose = require("mongoose");
const dbName = "gameDb";

mongoose
  .connect(`mongodb://127.0.0.1/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to ${dbName}`);
  })
  .catch((error) => {
    console.log(`Error connecting to ${dbName}`);
  });
